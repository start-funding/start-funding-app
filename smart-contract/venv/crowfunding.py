from typing import Final

from pyteal import *
from beaker import *

from beaker import (
    consts
)

class Crowfunding(Application):
    collected: Final[ApplicationStateValue] = ApplicationStateValue(
        stack_type=TealType.uint64,
        descr="collected funds",
        default=Int(0)
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

    @create
    def create(self):
        return self.initialize_application_state()
    
    @external(authorize=Authorize.only(Global.creator_address()))
    def set_end_date(self, end_date: abi.Uint64, *, output: abi.Uint64):       
        """set the end date (UNIX timestamp)"""
        return Seq(
            self.end_date.set(end_date.get()),
            output.set(self.end_date),
        )
    
    @external(authorize=Authorize.only(Global.creator_address()))
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

    @external
    def donate(self, donation: abi.PaymentTransaction, *, output: abi.Uint64):
        """fund a campaign"""
        return Seq(
            Assert(
                And(
                    # end_date not yet passed
                    Global.latest_timestamp() <= self.end_date,
                    
                    # incoming amount can be collected
                    # (self.collected + donation.get().amount()) <= self.target,
                    
                    # Security checks
                    donation.get().type_enum() == TxnType.Payment,
                    donation.get().receiver() == Global.current_application_address(),
                    donation.get().close_remainder_to() == Global.zero_address(),
                    donation.get().fee() <= Int(1000),
                    donation.get().rekey_to() == Global.zero_address(),
                )
            ),
            
            # updating collected value
            # self.collected.set(self.collected + donation.get().amount()),
            # output.set(Balance(self.address) / Int(1000000)),
            
            Approve()
        )
        
    @external(authorize=Authorize.only(Global.creator_address()))
    def claim(self):       
        """claim funds"""
        return Seq(
            # ensure target has been achieved
            Assert(Balance(self.address) >= self.target),
            
            InnerTxnBuilder.Execute(
                {
                    TxnField.type_enum: TxnType.Payment,
                    TxnField.receiver: Global.creator_address(),
                    TxnField.amount: Int(0),
                    TxnField.close_remainder_to: Global.creator_address()
                }
            ),
        )