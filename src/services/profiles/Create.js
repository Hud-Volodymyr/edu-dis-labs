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

class CreateProfile extends Base {
    static validationRules = {
        publicKey : [ 'required', 'string' ],
        signature : [ 'required', 'string' ],
        nonce : [ 'required', 'integer' ],
        name : [ 'required', 'string' ],
        lastName : [ 'required', 'string' ],
        email : [ 'required', 'email' ]
    };

    async execute(data) {
        const {
            publicKey,
            signature,
            nonce,
            name,
            lastName,
            email
        } = data;

        const timestamp = Date.now();

        if (timestamp - nonce > expireTime) throw new Exception({ code: 'PERMISSION_DENIED', message: 'Nonce expired' });

        const ok = this.verify(publicKey, `${publicKey}${nonce}`, signature);

        if (!ok) throw new Exception({ code: 'PERMISSION_DENIED', message: 'Invalid signature' });
        const existingProfile = await Profile.findOne({
            where: {
                publicKey
            }
        });

        if (existingProfile) throw new Exception({ code: 'PERMISSION_DENIED', message: 'Cannot create profile with this public key' });


        const profile = await Profile.create({
            publicKey,
            name,
            lastName,
            email
        });

        if (!profile) throw new Exception({ code: 'SERVER_ERROR', message: 'Failed to create profile' });
        
        return maskProfile(profile);
    }

    verify(publicKey, message, signature) {
        const hash = Buffer.from(bitcore.crypto.Hash.sha256(Buffer.from(message)));

        const signatureBuffer = Buffer.from(signature, 'hex');
        const publicKeyBuffer = Buffer.from(publicKey, 'hex');

        return secp256k1.ecdsaVerify(signatureBuffer, hash, publicKeyBuffer);
    }
}

module.exports = CreateProfile;