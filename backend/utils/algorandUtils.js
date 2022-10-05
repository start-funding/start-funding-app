// https://github.com/barnjamin/algorand-session-wallet/blob/main/src/index.ts#L104-L112

const customSignerBackend = async(transactions, indexesToSign) => {
    return Promise.resolve(this.signTxn(transactions)).then((txns) => {
        return txns.map((tx) => {
            return tx.blob;
        }).filter((_, index) => indexesToSign.includes(index));
    });
}

module.exports = { customSignerBackend }