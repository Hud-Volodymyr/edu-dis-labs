/* eslint-disable no-undef */
'use strict';

const client = require('../apiSupertest');
const generate = require('../utils/generateUser');
const truncate = require('../utils/truncate');
const seed = 'Hardcoded test seed';

beforeAll(async () => {
    await truncate();
});

afterEach(async () => {
    await truncate();
});

describe('Tests for profile routes', () => {
    test('positive: should create profile', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        // when

        const result = await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // then

        expect(result.body).toMatchObject({
                email: 'v.gud2001@gmail.com',
                lastName: 'Hud',
                name: 'Volodymyr',
            })
    });

    test('positive: should show profile', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // when

        const result = await client.get('show', {
            headers: {
                publickey: publicKey,
                signature,
                nonce
            }
        })
        expect(result.body).toMatchObject({
                email: 'v.gud2001@gmail.com',
                lastName: 'Hud',
                name: 'Volodymyr',
            })
    });

    test('negative: should not create profile with same public key twice', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        // when

        await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        const result = await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // then

        expect(result.body).toMatchObject({
                code: 'PERMISSION_DENIED',
                errors: [],
                errorMessage: 'Cannot create profile with this public key'
            })
    });

    test('negative: should not create profile with expired nonce signature', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        // when

        const result = await client.post('create', {
            publicKey,
            signature,
            nonce : nonce - 5000,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // then

        expect(result.body).toMatchObject({
                code: 'PERMISSION_DENIED',
                errors: [],
                errorMessage: 'Nonce expired'
            })
    });

    test('negative: should not create profile if signature is invalid', async () => {
        // given
        const {
            publicKey,
            nonce
        } = generate(seed)

        // when

        const result = await client.post('create', {
            publicKey,
            signature: '72af4c82480d4b4643f3f7628f0c0726f0200125b77997d1484e8b188577e7891f59aaa7d3b5bfbe8bdffb5ccd324a96476cb3c6a8ae99dc7173e0cb168751a8',
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // then

        expect(result.body).toMatchObject({
                code: 'PERMISSION_DENIED',
                errors: [],
                errorMessage: 'Invalid signature'
            })
    });

    test('negative: should not show profile with expired nonce', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // when

        const result = await client.get('show', {
            headers: {
                publickey: publicKey,
                signature,
                nonce: nonce - 5000
            }
        })
        expect(result.body).toMatchObject({
                code: 'PERMISSION_DENIED',
                errors: [],
                errorMessage: 'Nonce expired'
            })
    });

    test('negative: should not show profile if signature is invalid', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        // when

        const result = await client.get('show', {
            headers: {
                publickey: publicKey,
                signature: '72af4c82480d4b4643f3f7628f0c0726f0200125b77997d1484e8b188577e7891f59aaa7d3b5bfbe8bdffb5ccd324a96476cb3c6a8ae99dc7173e0cb168751a8',
                nonce
            }
        })
        expect(result.body).toMatchObject({
                code: 'PERMISSION_DENIED',
                errors: [],
                errorMessage: 'Invalid signature'
            })
    });

    test('negative: should not show profile if signature is invalid', async () => {
        // given
        const {
            publicKey,
            signature,
            nonce
        } = generate(seed)

        await client.post('create', {
            publicKey,
            signature,
            nonce,
            name : 'Volodymyr',
            lastName : 'Hud',
            email : 'v.gud2001@gmail.com'
        })

        const {
            publicKey: anotherKey,
            signature: anotherSignature,
            nonce: anotherNonce
        } = generate('fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542')

        // when

        const result = await client.get('show', {
            headers: {
                publickey: anotherKey,
                signature: anotherSignature,
                nonce: anotherNonce
            }
        })
        expect(result.body).toMatchObject({
                code: 'NOT_FOUND',
                errors: [],
                errorMessage: 'Profile not found'
            })
    });
})