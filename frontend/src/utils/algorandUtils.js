// https://github.com/barnjamin/algorand-session-wallet/blob/main/src/index.ts#L104-L112

const customSigner = async(transactions, indexToSign) => {
    let base64Transactions = [];

    transactions.forEach(transaction => {
        let base64Tx = window.AlgoSigner.encoding.msgpackToBase64(transaction.toByte());
        base64Transactions.push({
            txn: base64Tx
        })
    })

    let signedTxs = await window.AlgoSigner.signTxn(base64Transactions);
    console.log("Trans firmate")
    console.log(signedTxs)

    return signedTxs.map((tx) => {
        console.log(tx.blob)
        console.log(window.AlgoSigner.encoding.base64ToMsgpack(tx.blob))
        return window.AlgoSigner.encoding.base64ToMsgpack(tx.blob);
    })
}

const customSignerBackend = async(transactions, indexesToSign) => {
    return Promise.resolve(this.signTxn(transactions)).then((txns) => {
        return txns.map((tx) => {
          return tx.blob;
        }).filter((_, index) => indexesToSign.includes(index));
      });
}

module.exports.customSigner = customSigner;
