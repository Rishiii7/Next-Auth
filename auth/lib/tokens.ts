import { v4 as uuidv4 } from 'uuid';
import { getVerficationTokenByEmail } from '../data/verfication-token';
import { db } from './db';

export const generateVerficationToken = async (
    email : string
) => {

    const token = uuidv4();
    const expires = new Date( new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerficationTokenByEmail( email );

    if( existingToken ) {
        await db.verificationToken.delete( {
            where : {
                id: existingToken.id,
            }
        });
    }

    const verifcationToken = await db.verificationToken.create({
        data : {
            token,
            expires,
            email,
        }
    });

    return verifcationToken;
}