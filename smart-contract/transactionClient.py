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

    result = app_client.call(Crowfunding.set_end_date, end_date=1664601223)
    print(f"- Currrent end_date value: {result.return_value}")

    result = app_client.call(Crowfunding.set_target, target=2 * consts.algo)
    print(f"- Currrent target value: {result.return_value}")
    
    get_account_balance(account.address)

    sp = app_client.client.suggested_params()
    
    amount = 1
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, amount * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    # print(f"- 1) Collected: {result.return_value}")
    print(f"- 1) Sended: {amount}")
    get_account_balance(account.address)
    
    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, amount * consts.algo),
            signer=account.signer,    
            )
            
    result = app_client.call(Crowfunding.donate, donation=txn)
    # print(f"- 2) Collected: {result.return_value}")
    print(f"- 2) Sended: {amount}")
    get_account_balance(account.address)
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)
    
    result = app_client.call(Crowfunding.claim)
    print("# Claimed!" + "\n")
    
    result = app_client.call(Crowfunding.get_collected)
    print(f"- Smart Contract Balance: {result.return_value}")
    get_account_balance(account.address)


if __name__ == "__main__":
    demo()