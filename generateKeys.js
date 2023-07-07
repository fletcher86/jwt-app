// Imported dependencies
const fs = require('fs')
const { generateKeyPairSync } = require('crypto');
var jwt = require('jsonwebtoken');

// Generate ES256 keys
const { publicKey, privateKey } = generateKeyPairSync('ec', {
    namedCurve: 'P-256',
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
});

// Write key pairs to file
fs.writeFileSync('private_key.pem', privateKey);
console.log('Saved private_key.pem');

fs.writeFileSync('public_key.pem', publicKey);
console.log('Saved public_key.pem');