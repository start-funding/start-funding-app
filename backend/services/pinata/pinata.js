const pinataSDK = require('@pinata/sdk');
const pinataConf = require('../../conf/pinataConf.js').pinataConf;
const pinata = pinataSDK(pinataConf.PINATA_API_KEY, pinataConf.PINATA_API_SECRET);

async function pinFileToIPFS(file, campaignId, campaignOwner) {
    const options = {
        pinataMetadata: {
            name: `${campaignId}_image`,
            keyvalues: {
                owner: campaignOwner,
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };

    return pinata.pinFileToIPFS(file, options)
    .then((result) => {
        //handle results here
        return result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
        return err;
    });
}

module.exports.pinFileToIPFS = pinFileToIPFS;