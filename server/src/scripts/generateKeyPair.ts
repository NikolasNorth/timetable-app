import {
    generateKeyPairSync,
    KeyPairSyncResult,
    RSAKeyPairOptions
} from 'crypto';
import {existsSync, writeFileSync, readFileSync} from 'fs';

const publicKeyPath = `${__dirname}/../../keys/id_rsa.pub.pem`;
const privateKeyPath = `${__dirname}/../../keys/id_rsa.pem`;
let _publicKey: string = '';
let _privateKey: string = '';

/** Generate RSA Key-Pair */
function generateKeyPair(): KeyPairSyncResult<string, string> {
    const keyPairOpts: RSAKeyPairOptions<'pem', 'pem'> = {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    };
    const keyPair: KeyPairSyncResult<string, string> = generateKeyPairSync('rsa', keyPairOpts);

    writeFileSync(publicKeyPath, keyPair.publicKey);
    writeFileSync(privateKeyPath, keyPair.privateKey);

    return keyPair;
}

try {
    if (!(existsSync(publicKeyPath) && existsSync(privateKeyPath))) {
        const keyPair: KeyPairSyncResult<string, string> = generateKeyPair();
        _publicKey = keyPair.publicKey;
        _privateKey = keyPair.privateKey;
    } else {
        _publicKey = readFileSync(publicKeyPath, 'utf-8');
        _privateKey = readFileSync(privateKeyPath, 'utf-8');
    }
} catch (err) {
    console.error(err);
}

export const publicKey = _publicKey;
export const privateKey = _privateKey;
