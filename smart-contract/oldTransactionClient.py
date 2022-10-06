from pyteal import Balance, Global
from crowfunding import Crowfunding
from beaker.client import ApplicationClient, LogicException
from beaker import sandbox
from algosdk.future import transaction
from algosdk.atomic_transaction_composer import *
from beaker import (
    consts
)
from algosdk.v2client import algod

algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
algod_client = algod.AlgodClient(algod_token, algod_address)


def get_account_balance(my_address):    
    account_info = algod_client.account_info(my_address)
    print("- Account balance: {} Algos".format(account_info.get('amount') / 1e6) + "\n")

def demo():
    client = sandbox.get_algod_client()
    accounts = sandbox.get_accounts()
    account = accounts.pop()
    
    print(f"- Account address: {account.address}")
    # print(f"- Account signature: {account.signer}")
    
    app_client = ApplicationClient(client, Crowfunding(), signer=account.signer)
      
    app_id, app_addr, txid = app_client.create()
    print(f"- Created App with id: {app_id} and address addr: {app_addr} in tx: {txid}")
    
    result = app_client.call(Crowfunding.set_db_id, db_id="ciao")
    
    result = app_client.call(Crowfunding.get_db_id)
    print(f"- Currrent db_id value: {result.return_value}")

    result = app_client.call(Crowfunding.set_end_date, end_date=1674601223)
    print(f"- Currrent end_date value: {result.return_value}")

    result = app_client.call(Crowfunding.set_target, target=8 * consts.algo)
    print(f"- Currrent target value: {result.return_value}")
    
    get_account_balance(account.address)
    
    # app_client.opt_in()
    # print("- Opted in!")

    sp = app_client.client.suggested_params()
    
    amount = 2
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, amount * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    # print(vars(result))
    # print(f"- 1) Collected: {result.return_value}")
    print(f"- 1) Sended: {amount}")
    get_account_balance(account.address)
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, 4 * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    # print(f"- 2) Collected: {result.return_value}")
    # print(f"- 2) Sended: {amount}")
    print("- 2) Sended: 4")
    get_account_balance(account.address)
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)
    
    # result = app_client.call(Crowfunding.claim)
    # print("# Claimed!" + "\n")
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)
    
    # txn = TransactionWithSigner(
    #         txn=transaction.PaymentTxn(account.address, sp, app_addr, 8 * consts.algo),
    #         signer=account.signer,    
    #         )
            
    new_account = accounts.pop()
    
    print("----------------")
    
    print(f"- new_account: {new_account.address}")
    get_account_balance(new_account.address)
    
    result = app_client.call(Crowfunding.refund, account=new_account.address, amount=2 * consts.algo)
    print("# Refund requested of amount: 2")
    
    get_account_balance(new_account.address)
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    
    result = app_client.call(Crowfunding.refund, account=new_account.address, amount=4 * consts.algo)
    print("# Refund 2 requested of amount: 4")
    
    get_account_balance(new_account.address)
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")


if __name__ == "__main__":
    import json

    crow = Crowfunding()
    print(vars(crow))
    # print(crow.approval_program)
    # print(crow.clear_program)
    
    # with open('abiOld.json', 'w') as f:
        # json.dump(crow.contract.dictify(), f)
    crow.dump()
        
    # demo()