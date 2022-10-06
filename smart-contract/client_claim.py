from multiprocessing.spawn import prepare
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
    
    app_client = ApplicationClient(client, Crowfunding(), signer=account.signer)
      
    app_id, app_addr, txid = app_client.create()
    print(f"- Created App with id: {app_id} and address addr: {app_addr}")
    
    new_account = accounts.pop()
    new_app_client = app_client.prepare(signer=new_account.signer)
    
    result = app_client.call(Crowfunding.setAll, 
        db_id="hello",
        end_date=1674601223,
        target=8,
        receiver= new_account.address)
    
    print(f"- Setted all values")
    
    
    get_account_balance(account.address)

    sp = app_client.client.suggested_params()
    
    amount = 2
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, amount * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    print(f"- 1) Sended: {amount}")
    get_account_balance(account.address)
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, 4 * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    print("- 2) Sended: 4")
    get_account_balance(account.address)
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)
    
    result = new_app_client.call(Crowfunding.claim)
    print("# Claimed!" + "\n")
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)


if __name__ == "__main__":
    demo()