const hdkey = require('hdkey');
const bitcore = require('bitcore-lib');
const secp256k1 = require('secp256k1');

function sign(privateKey, message) {
    const hash = Buffer.from(bitcore.crypto.Hash.sha256(Buffer.from(message)));
    const signature = secp256k1.ecdsaSign(hash, privateKey);

    return Buffer.from(signature.signature).toString('hex');
}

function generate(mySeed) {
    const bitcoinPath = `m/44'/0'/0'/0/0` // m/BIP44/coinIndex'/account'/chain/index

    const {
        publicKey,
        privateKey
    } = hdkey.fromMasterSeed(Buffer.from(mySeed, 'hex')).derive(bitcoinPath);
    const nonce = Date.now();
    const publicKeyHex = publicKey.toString('hex');

    const message = `${publicKeyHex}${nonce}`;

    const signature = sign(privateKey, message);

    return {
        publicKey: publicKey.toString('hex'),
        privateKey: privateKey.toString('hex'),
        signature,
        nonce
    }
}

module.exports = generate;
