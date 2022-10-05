from typing import Final

from pyteal import *
from beaker import *

from beaker import (
    consts
)

class Crowfunding(Application):
    db_id: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes,
        descr="related firebase campaign id",
        static=True
    )
        
    is_closed: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        descr="smart contract status, 0 -> open / 1+ -> closed",
        default=Int(0),
    )
    
    # static -> It can be defined only one time
    target: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        descr="target to reach",
        static=True
    )
    
    end_date: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        descr="ending date (UNIX timestamp)",
        static=True
    )
    
    receiver: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.bytes, 
        key=Bytes("receiver"), 
        default=Global.creator_address()
    )
    
    # save the total donated for each account
    # deposit_amount: AccountStateValue = AccountStateValue(
    #     stack_type=TealType.uint64,
    #     default=Int(0)
    #     )
    
    @external(authorize=Authorize.only(Global.creator_address()))
    def createContract(self,db_id: abi.String, end_date: abi.Uint64,target: abi.Uint64,receiver: abi.String):
        return Seq(
            self.initialize_application_state(),
            self.db_id.set(db_id.get()),
            self.end_date.set(end_date.get()),
            self.target.set(target.get()),
            self.receiver.set(receiver.get())
        )

    @create
    def create(self,db_id: abi.String, end_date: abi.Uint64,target: abi.Uint64,receiver: abi.String):
        return Seq(
            self.initialize_application_state(),
            self.db_id.set(db_id.get()),
            self.end_date.set(end_date.get()),
            self.target.set(target.get()),
            self.receiver.set(receiver.get())
        )
    
    # initialize "deposit_amount" related AccountStateValue
    # @opt_in
    # def opt_in(self):
    #     return self.initialize_account_state()
    
    # @external(authorize=Authorize.only(Global.creator_address()))
    def set_db_id(self, db_id: abi.String, *, output: abi.String):       
        """set related firebase campaign id"""
        return Seq(
            self.db_id.set(db_id.get()),
            output.set(self.db_id),
        )
    
    # @external(authorize=Authorize.only(Global.creator_address()))
    def set_end_date(self, end_date: abi.Uint64, *, output: abi.Uint64):       
        """set the end date (UNIX timestamp)"""
        return Seq(
            self.end_date.set(end_date.get()),
            output.set(self.end_date),
        )
    
    # @external(authorize=Authorize.only(Global.creator_address()))
    def set_target(self, target: abi.Uint64, *, output: abi.Uint64):       
        """set the target"""
        return Seq(
            self.target.set(target.get()),
            output.set(self.target),
        )
        
    @external
    def get_collected(self, *, output: abi.Uint64):       
        """return collected funds"""
        return output.set(Balance(self.address) / Int(1000000))
    
    
    @external(authorize=Authorize.only(Global.creator_address()))
    def get_db_id(self, *, output: abi.String):       
        """return collected funds"""
        return output.set(self.db_id)
    
    
    # @external(authorize=Authorize.only(Global.creator_address()))
    def set_receiver(self, receiver: abi.String, *, output: abi.String):       
        """set related firebase campaign id"""
        return Seq(
            self.receiver.set(receiver.get()),
            output.set(self.receiver),
        )

    @external
    def donate(self, donation: abi.PaymentTransaction, *, output: abi.String):
        """fund a campaign"""
        return Seq(
            Assert(
                And(
                    # checking if smart contract is open
                    self.is_closed.is_default(),
                    
                    # end_date not yet passed
                    Global.latest_timestamp() <= self.end_date,
                    
                    # security checks
                    donation.get().type_enum() == TxnType.Payment,
                    donation.get().receiver() == Global.current_application_address(),
                    donation.get().close_remainder_to() == Global.zero_address(),
                    donation.get().fee() <= Int(1000),
                    donation.get().rekey_to() == Global.zero_address(),
                )
            ),
            
            # incrementing the total donated for each account 
            # self.deposit_amount[Txn.sender()].increment(donation.get().amount()),

            # for debug
            # output.set(Balance(self.address) / Int(1000000)),

            output.set("200"),

            # Approve()
        )
        
    @external(authorize=Authorize.only(receiver))
    def claim(self, *, output: abi.String):       
        """claim funds"""
        return Seq(
            # ensure target has been achieved
            Assert(Balance(self.address) >= self.target),
            
            # smart contract is now closed
            self.is_closed.increment(),
            
            InnerTxnBuilder.Execute(
                {
                    TxnField.type_enum: TxnType.Payment,
                    TxnField.receiver: Global.creator_address(),
                    TxnField.amount: Int(0),
                    TxnField.close_remainder_to: Global.creator_address()
                }
            ),
            
            output.set("200"),
        )
        
    @external(authorize=Authorize.only(Global.creator_address()))
    def refund(self, account: abi.Account, amount: abi.Uint64, *, output: abi.String):    
        """refund funds"""
        return Seq(
            Assert(
                And(
                    # checking if smart contract is open
                    self.is_closed.is_default(),
                    
                    # ensure target has not been achieved
                    Balance(self.address) < self.target,
                    
                    # end_date not yet passed - DISABLED FOR TESTING
                    # Global.latest_timestamp() >= self.end_date,
                    )
            ),
            
            # sending refund
            InnerTxnBuilder.Execute(
                {
                    TxnField.type_enum: TxnType.Payment,
                    TxnField.receiver: account.address(),
                    TxnField.amount: amount.get() - Global.min_balance() - Txn.fee(),
                }
            ),
            
            output.set("200"),
            # Approve()
        )