import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class Crowfunding extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { db_id: { type: bkr.AVMType.bytes, key: "db_id", desc: "", static: false }, end_date: { type: bkr.AVMType.uint64, key: "end_date", desc: "", static: false }, is_closed: { type: bkr.AVMType.uint64, key: "is_closed", desc: "", static: false }, receiver: { type: bkr.AVMType.bytes, key: "receiver", desc: "", static: false }, target: { type: bkr.AVMType.uint64, key: "target", desc: "", static: false } }, dynamic: {} };
    override acctSchema: bkr.Schema = { declared: {}, dynamic: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4Njk3MzVmNjM2YzZmNzM2NTY0IDB4MTUxZjdjNzUgMHg3MjY1NjM2NTY5NzY2NTcyIDB4NzQ2MTcyNjc2NTc0IDB4NjU2ZTY0NWY2NDYxNzQ2NSAweDY0NjI1ZjY5NjQgMHgwMDAzMzIzMDMwCnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2wxNAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGYxNTc3NzI2IC8vICJjbGFpbSgpdm9pZCIKPT0KYm56IG1haW5fbDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4MDgxYzAyMTMgLy8gImRvbmF0ZShwYXkpc3RyaW5nIgo9PQpibnogbWFpbl9sMTIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg5YjNmNzlkNCAvLyAiZ2V0X2NvbGxlY3RlZCgpdWludDY0Igo9PQpibnogbWFpbl9sMTEKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHg5OGIyN2JmNSAvLyAiZ2V0X2RiX2lkKClzdHJpbmciCj09CmJueiBtYWluX2wxMAp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweGJkZTU0MzA2IC8vICJyZWZ1bmQoYWNjb3VudCx1aW50NjQpc3RyaW5nIgo9PQpibnogbWFpbl9sOQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDJlMTc3OGE3IC8vICJzZXRBbGwoc3RyaW5nLHVpbnQ2NCx1aW50NjQsYWRkcmVzcyl2b2lkIgo9PQpibnogbWFpbl9sOAplcnIKbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpzdG9yZSAxMQp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmJ0b2kKc3RvcmUgMTIKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwpidG9pCnN0b3JlIDEzCnR4bmEgQXBwbGljYXRpb25BcmdzIDQKc3RvcmUgMTQKbG9hZCAxMQpsb2FkIDEyCmxvYWQgMTMKbG9hZCAxNApjYWxsc3ViIHNldEFsbF8xMAppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sOToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCnN0b3JlIDYKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgpidG9pCnN0b3JlIDcKbG9hZCA2CmxvYWQgNwpjYWxsc3ViIHJlZnVuZF85CnN0b3JlIDgKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgOApjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRkYmlkXzgKc3RvcmUgNApieXRlY18xIC8vIDB4MTUxZjdjNzUKbG9hZCA0CmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDExOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGdldGNvbGxlY3RlZF83CnN0b3JlIDMKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgMwppdG9iCmNvbmNhdApsb2cKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDEyOgp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydAp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCnN0b3JlIDAKbG9hZCAwCmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KYXNzZXJ0CmxvYWQgMApjYWxsc3ViIGRvbmF0ZV82CnN0b3JlIDEKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmxvYWQgMQpjb25jYXQKbG9nCmludGNfMSAvLyAxCnJldHVybgptYWluX2wxMzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBjbGFpbV81CmludGNfMSAvLyAxCnJldHVybgptYWluX2wxNDoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sMTYKZXJyCm1haW5fbDE2Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAo9PQphc3NlcnQKY2FsbHN1YiBjcmVhdGVfMQppbnRjXzEgLy8gMQpyZXR1cm4KCi8vIGF1dGhfb25seQphdXRob25seV8wOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBjcmVhdGUKY3JlYXRlXzE6CmJ5dGVjXzAgLy8gImlzX2Nsb3NlZCIKaW50Y18wIC8vIDAKYXBwX2dsb2JhbF9wdXQKYnl0ZWNfMiAvLyAicmVjZWl2ZXIiCmdsb2JhbCBDcmVhdG9yQWRkcmVzcwphcHBfZ2xvYmFsX3B1dApyZXRzdWIKCi8vIGF1dGhfb25seQphdXRob25seV8yOgpnbG9iYWwgQ3JlYXRvckFkZHJlc3MKPT0KcmV0c3ViCgovLyBhdXRoX29ubHkKYXV0aG9ubHlfMzoKYnl0ZWNfMiAvLyAicmVjZWl2ZXIiCmFwcF9nbG9iYWxfZ2V0Cj09CnJldHN1YgoKLy8gYXV0aF9vbmx5CmF1dGhvbmx5XzQ6Cmdsb2JhbCBDcmVhdG9yQWRkcmVzcwo9PQpyZXRzdWIKCi8vIGNsYWltCmNsYWltXzU6CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8zCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKYmFsYW5jZQpieXRlY18zIC8vICJ0YXJnZXQiCmFwcF9nbG9iYWxfZ2V0Cj49CmFzc2VydApieXRlY18wIC8vICJpc19jbG9zZWQiCmJ5dGVjXzAgLy8gImlzX2Nsb3NlZCIKYXBwX2dsb2JhbF9nZXQKaW50Y18xIC8vIDEKKwphcHBfZ2xvYmFsX3B1dAppdHhuX2JlZ2luCmludGNfMSAvLyBwYXkKaXR4bl9maWVsZCBUeXBlRW51bQppbnRjXzAgLy8gMAppdHhuX2ZpZWxkIEFtb3VudApieXRlY18yIC8vICJyZWNlaXZlciIKYXBwX2dsb2JhbF9nZXQKaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCml0eG5fc3VibWl0CnJldHN1YgoKLy8gZG9uYXRlCmRvbmF0ZV82OgpzdG9yZSAyCmJ5dGVjXzAgLy8gImlzX2Nsb3NlZCIKYXBwX2dsb2JhbF9nZXQKaW50Y18wIC8vIDAKPT0KZ2xvYmFsIExhdGVzdFRpbWVzdGFtcApieXRlYyA0IC8vICJlbmRfZGF0ZSIKYXBwX2dsb2JhbF9nZXQKPD0KJiYKbG9hZCAyCmd0eG5zIFR5cGVFbnVtCmludGNfMSAvLyBwYXkKPT0KJiYKbG9hZCAyCmd0eG5zIFJlY2VpdmVyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCj09CiYmCmxvYWQgMgpndHhucyBDbG9zZVJlbWFpbmRlclRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQomJgpsb2FkIDIKZ3R4bnMgRmVlCnB1c2hpbnQgMTAwMCAvLyAxMDAwCjw9CiYmCmxvYWQgMgpndHhucyBSZWtleVRvCmdsb2JhbCBaZXJvQWRkcmVzcwo9PQomJgphc3NlcnQKYnl0ZWMgNiAvLyAweDAwMDMzMjMwMzAKcmV0c3ViCgovLyBnZXRfY29sbGVjdGVkCmdldGNvbGxlY3RlZF83OgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpiYWxhbmNlCnB1c2hpbnQgMTAwMDAwMCAvLyAxMDAwMDAwCi8KcmV0c3ViCgovLyBnZXRfZGJfaWQKZ2V0ZGJpZF84Ogp0eG4gU2VuZGVyCmNhbGxzdWIgYXV0aG9ubHlfMgovLyB1bmF1dGhvcml6ZWQKYXNzZXJ0CmJ5dGVjIDUgLy8gImRiX2lkIgphcHBfZ2xvYmFsX2dldApzdG9yZSA1CmxvYWQgNQpsZW4KaXRvYgpleHRyYWN0IDYgMApsb2FkIDUKY29uY2F0CnN0b3JlIDUKbG9hZCA1CnJldHN1YgoKLy8gcmVmdW5kCnJlZnVuZF85OgpzdG9yZSAxMApzdG9yZSA5CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV80Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKYnl0ZWNfMCAvLyAiaXNfY2xvc2VkIgphcHBfZ2xvYmFsX2dldAppbnRjXzAgLy8gMAo9PQpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwpiYWxhbmNlCmJ5dGVjXzMgLy8gInRhcmdldCIKYXBwX2dsb2JhbF9nZXQKPAomJgphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzEgLy8gcGF5Cml0eG5fZmllbGQgVHlwZUVudW0KbG9hZCA5CnR4bmFzIEFjY291bnRzCml0eG5fZmllbGQgUmVjZWl2ZXIKbG9hZCAxMApnbG9iYWwgTWluQmFsYW5jZQotCnR4biBGZWUKLQppdHhuX2ZpZWxkIEFtb3VudAppdHhuX3N1Ym1pdApieXRlYyA2IC8vIDB4MDAwMzMyMzAzMApyZXRzdWIKCi8vIHNldEFsbApzZXRBbGxfMTA6CnN0b3JlIDE4CnN0b3JlIDE3CnN0b3JlIDE2CnN0b3JlIDE1CnR4biBTZW5kZXIKY2FsbHN1YiBhdXRob25seV8wCi8vIHVuYXV0aG9yaXplZAphc3NlcnQKaW50Y18wIC8vIDAKYnl0ZWMgNSAvLyAiZGJfaWQiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDIwCnN0b3JlIDE5CmxvYWQgMjAKIQphc3NlcnQKYnl0ZWMgNSAvLyAiZGJfaWQiCmxvYWQgMTUKZXh0cmFjdCAyIDAKYXBwX2dsb2JhbF9wdXQKaW50Y18wIC8vIDAKYnl0ZWMgNCAvLyAiZW5kX2RhdGUiCmFwcF9nbG9iYWxfZ2V0X2V4CnN0b3JlIDIyCnN0b3JlIDIxCmxvYWQgMjIKIQphc3NlcnQKYnl0ZWMgNCAvLyAiZW5kX2RhdGUiCmxvYWQgMTYKYXBwX2dsb2JhbF9wdXQKaW50Y18wIC8vIDAKYnl0ZWNfMyAvLyAidGFyZ2V0IgphcHBfZ2xvYmFsX2dldF9leApzdG9yZSAyNApzdG9yZSAyMwpsb2FkIDI0CiEKYXNzZXJ0CmJ5dGVjXzMgLy8gInRhcmdldCIKbG9hZCAxNwphcHBfZ2xvYmFsX3B1dApieXRlY18yIC8vICJyZWNlaXZlciIKbG9hZCAxOAphcHBfZ2xvYmFsX3B1dApyZXRzdWI=";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDcKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "claim", desc: "", args: [], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "donate", desc: "", args: [{ type: "pay", name: "donation", desc: "" }], returns: { type: "string", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_collected", desc: "", args: [], returns: { type: "uint64", desc: "" } }),
        new algosdk.ABIMethod({ name: "get_db_id", desc: "", args: [], returns: { type: "string", desc: "" } }),
        new algosdk.ABIMethod({ name: "refund", desc: "", args: [{ type: "account", name: "account", desc: "" }, { type: "uint64", name: "amount", desc: "" }], returns: { type: "string", desc: "" } }),
        new algosdk.ABIMethod({ name: "setAll", desc: "", args: [{ type: "string", name: "db_id", desc: "" }, { type: "uint64", name: "end_date", desc: "" }, { type: "uint64", name: "target", desc: "" }, { type: "address", name: "receiver", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async claim(txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.claim(txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async donate(args: {
        donation: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.execute(await this.compose.donate({ donation: args.donation }, txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
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
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this.execute(await this.compose.refund({ account: args.account, amount: args.amount }, txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    async setAll(args: {
        db_id: string;
        end_date: bigint;
        target: bigint;
        receiver: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setAll({ db_id: args.db_id, end_date: args.end_date, target: args.target, receiver: args.receiver }, txnParams));
        return new bkr.ABIResult<void>(result);
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
        setAll: async (args: {
            db_id: string;
            end_date: bigint;
            target: bigint;
            receiver: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setAll"), { db_id: args.db_id, end_date: args.end_date, target: args.target, receiver: args.receiver }, txnParams, atc);
        }
    };
}
