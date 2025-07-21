import { importPKCS8, SignJWT, JWTPayload, importSPKI, jwtVerify } from 'jose';

import fs from 'fs';
import path from 'path';

const alg = 'RS256';

const privateKeyPem = fs.readFileSync(path.join(process.cwd(), "dist", "keys", "private.key"), 'utf-8');
const publicKeyPem = fs.readFileSync(path.join(process.cwd(), "dist", "keys", "public.key"), 'utf-8');

export const sign = async (payload: JWTPayload): Promise<string> => {

    const privateKey = await importPKCS8(privateKeyPem, alg);
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(privateKey);

    return jwt;
}


export const verify = async (token: string): Promise<JWTPayload | null> => {

    try {
        const publicKey = await importSPKI(publicKeyPem, alg);
        const { payload } = await jwtVerify(token, publicKey);
        console.log('✅ Token is valid');
        return payload;
    } catch (err) {
        console.error('❌ Invalid token', err);
        return null;
    }
}

