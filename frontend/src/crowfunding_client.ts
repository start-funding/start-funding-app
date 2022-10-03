import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Crowfunding extends bkr.ApplicationClient {
    desc: string = "";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "claim", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "donate", desc: "", args: [{ type: "pay", name: "donation", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_collected", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_db_id", desc: "", args: [], returns: { type: "string", desc: "" } }),
        new algosdk.ABIMethod({ name: "refund", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "uint64", name: "amount", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_db_id", desc: "", args: [{ type: "string", name: "db_id", desc: "" }], returns: { type: "string", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_end_date", desc: "", args: [{ type: "uint64", name: "end_date", desc: "" }], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "set_target", desc: "", args: [{ type: "uint64", name: "target", desc: "" }], returns: { type: "uint64", desc: "" } })
    ];
    async claim(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.claim(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async donate(args: {
        donation: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.donate({ donation: args.donation }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async get_collected(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.get_collected(txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async get_db_id(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.execute(await this.compose.get_db_id(txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    async refund(args: {
        account: string;
        amount: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.refund({ account: args.account, amount: args.amount }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async set_db_id(args: {
        db_id: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.execute(await this.compose.set_db_id({ db_id: args.db_id }, txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    async set_end_date(args: {
        end_date: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.set_end_date({ end_date: args.end_date }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    async set_target(args: {
        target: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<bigint>> {
        const result = await this.execute(await this.compose.set_target({ target: args.target }, txnParams));
        return new bkr.ABIResult<bigint>(result, result.returnValue as bigint);
    }
    compose = {
        claim: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "claim"), {}, txnParams, atc);
        },
        donate: async (args: {
            donation: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "donate"), { donation: args.donation }, txnParams, atc);
        },
        get_collected: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_collected"), {}, txnParams, atc);
        },
        get_db_id: async (txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "get_db_id"), {}, txnParams, atc);
        },
        refund: async (args: {
            account: string;
            amount: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "refund"), { account: args.account, amount: args.amount }, txnParams, atc);
        },
        set_db_id: async (args: {
            db_id: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_db_id"), { db_id: args.db_id }, txnParams, atc);
        },
        set_end_date: async (args: {
            end_date: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_end_date"), { end_date: args.end_date }, txnParams, atc);
        },
        set_target: async (args: {
            target: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "set_target"), { target: args.target }, txnParams, atc);
        }
    };
}
