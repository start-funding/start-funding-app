# from counter import CounterApp
from pyteal import Log
from crowfunding import Crowfunding
from beaker.client import ApplicationClient, LogicException
from beaker import sandbox

def demo():
    client = sandbox.get_algod_client()

    accts = sandbox.get_accounts()
    acct = accts.pop()
    
    # To interact with an already created contract pass the app_id param and not
    # call the create() method 
    app_client = ApplicationClient(client, Crowfunding(), app_id=60, signer=acct.signer)

    # Create an Application client containing both an algod client and my app
    app_client = ApplicationClient(client, Crowfunding(), signer=acct.signer)

    # Create the application on chain, set the app id for the app client
    app_id, app_addr, txid = app_client.create()
    print(f"Created App with id: {app_id} and address addr: {app_addr} in tx: {txid}")
    
    result = app_client.call(Crowfunding.set_end_date, end_date=1664491223)
    print(f"Currrent end_date value: {result.return_value}")

    result = app_client.call(Crowfunding.set_target, target=100)
    print(f"Currrent target value: {result.return_value}")
    
    # print("Calling set_target() again")
    # app_client.call(Crowfunding.set_target, target=1)

    # app_client.call(Crowfunding.donate, amount=4)    
    result = app_client.call(Crowfunding.donate, amount=8)
    print(f"Currrent collected value: {result.return_value}")

    # try:
    #     # Try to call the increment method with a different signer, it should fail
    #     # since we have the auth check
    #     other_acct = accts.pop()
    #     other_client = app_client.prepare(signer=other_acct.signer)
    #     other_client.call(CounterApp.increment)
    # except LogicException as e:
    #     print("App call failed as expected.")
    #     print(e)


if __name__ == "__main__":
    demo()