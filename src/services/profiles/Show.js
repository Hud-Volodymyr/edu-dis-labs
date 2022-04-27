const Base = require('../Base');
const bitcore   = require('bitcore-lib');
const secp256k1 = require('secp256k1');
const { expireTime } = require('../../configs/config');
const {
    maskProfile
} = require('../utils');
const {
    Profile
} = require('../../models');
const Exception = require('../../utils/Exception');


class ShowProfile extends Base {
    static validationRules = {
        publicKey : [ 'required', 'string' ],
        signature : [ 'required', 'string' ],
        nonce : [ 'required', 'integer' ]
    };

    async execute(data) {
        const {
            publicKey,
            signature,
            nonce
        } = data;

        const timestamp = Date.now();

        if (timestamp - nonce > expireTime) throw new Exception({ code: 'PERMISSION_DENIED', message: 'Nonce expired' });

        const ok = this.verify(publicKey, `${publicKey}${nonce}`, signature);

        if (!ok) throw new Exception({ code: 'PERMISSION_DENIED', message: 'Invalid signature' });

        const profile = await Profile.findOne({
            where: {
                publicKey
            }
        });

        if (!profile) throw new Exception({ code: 'NOT_FOUND', message: 'Profile not found' });
        
        return maskProfile(profile);
    }

    verify(publicKey, message, signature) {
        const hash = Buffer.from(bitcore.crypto.Hash.sha256(Buffer.from(message)));

        const signatureBuffer = Buffer.from(signature, 'hex');
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');

        return secp256k1.ecdsaVerify(signatureBuffer, hash, publicKeyBuffer);
    }
}

module.exports = ShowProfile;
