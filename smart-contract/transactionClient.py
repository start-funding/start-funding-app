from pyteal import Balance, Global
from crowfunding import Crowfunding
from beaker.client import ApplicationClient, LogicException
from beaker import sandbox
from algosdk import account
from algosdk.future import transaction
from algosdk.atomic_transaction_composer import *
from beaker import (
    consts
)
from algosdk.v2client import algod


# Testnet Purestake
# algod_address = "https://testnet-algorand.api.purestake.io/ps1"
# algod_token = "eS30dDuWI3451FsNsPJ6f6KrfpCtK9yHXh1bGhy6"
# purestake_header = {'X-Api-key': algod_token}
# algod_client = algod.AlgodClient(algod_token, algod_address, headers=purestake_header)

# Sandbox
algod_address = "http://localhost:4001"
algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
algod_client = algod.AlgodClient(algod_token, algod_address)

def get_account_balance(my_address):    
    account_info = algod_client.account_info(my_address)
    print("- Account balance: {} Algos".format(account_info.get('amount') / 1e6) + "\n")

def make_donation(account, sp, app_addr, amount, app_client):
    print(f"($) Sended: {amount}")

    txn = TransactionWithSigner(
            txn=transaction.PaymentTxn(account.address, sp, app_addr, amount * consts.algo),
            signer=account.signer,    
            )
            
    return app_client.call(Crowfunding.donate, donation=txn)

def demo():
    # Sandbox
    algod_address = "http://localhost:4001"
    algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

    client = sandbox.get_algod_client(algod_address, algod_token)
    
    accounts = sandbox.get_accounts(wallet_name="MyWallet")
    print(accounts)
    account = accounts.pop()
    
    get_account_balance(account.address)
    print(f"- Account address: {account.address}")
    
    app_client = ApplicationClient(
        client, 
        Crowfunding(), 
        signer=account.signer)
      
    app_id, app_addr, txid = app_client.create(
        db_id="ciao",
        end_date=1674601223,
        target=8,
        receiver= account.address)
    print(f"- Created App with id: {app_id} and address addr: {app_addr} in tx: {txid}")
    
    # result = app_client.call(Crowfunding.set_db_id, db_id="ciao")
    
    # result = app_client.call(Crowfunding.get_db_id)
    # print(f"- Currrent db_id value: {result.return_value}")

    # result = app_client.call(Crowfunding.set_end_date, end_date=1674601223)
    # print(f"- Currrent end_date value: {result.return_value}")

    # result = app_client.call(Crowfunding.set_target, target=8 * consts.algo)
    # print(f"- Currrent target value: {result.return_value}")
    
    get_account_balance(account.address)
    
    # app_client.opt_in()
    # print("- Opted in!")

    # sp = app_client.client.suggested_params()
    
    # result = make_donation(account, sp, app_addr, 2, app_client)
    # get_account_balance(account.address)

    # result = make_donation(account, sp, app_addr, 4, app_client)
    # get_account_balance(account.address)
    
    # result = app_client.call(Crowfunding.get_collected)
    # print(f"- Smart Contract Balance: {result.return_value}")
    # get_account_balance(account.address)
    
    # # result = app_client.call(Crowfunding.claim)
    # # print("# Claimed!" + "\n")
    
    # # result = app_client.call(Crowfunding.get_collected)
    # # print(f"- Smart Contract Balance: {result.return_value}")
    # # get_account_balance(account.address)
    
            
    # new_account = accounts.pop()
    
    # print("----------------")
    
    # print(f"- new_account: {new_account.address}")
    # get_account_balance(new_account.address)
    
    # result = app_client.call(Crowfunding.refund, account=new_account.address, amount=2 * consts.algo)
    # print("# Refund requested of amount: 2")
    
    # get_account_balance(new_account.address)
    
    # result = app_client.call(Crowfunding.get_collected)
    # print(f"- Smart Contract Balance: {result.return_value}")
    
    # result = app_client.call(Crowfunding.refund, account=new_account.address, amount=4 * consts.algo)
    # print("# Refund 2 requested of amount: 4")
    
    # get_account_balance(new_account.address)
    
    # result = app_client.call(Crowfunding.get_collected)
    # print(f"- Smart Contract Balance: {result.return_value}")


if __name__ == "__main__":
    # import json

    # crow = Crowfunding()
    # print(crow.approval_program)
    # print(crow.clear_program)
    
    # with open('abi.json', 'w') as f:
    #     json.dump(crow.contract.dictify(), f)
    # abi = json.dumps(crow.contract.dictify())
    demo()