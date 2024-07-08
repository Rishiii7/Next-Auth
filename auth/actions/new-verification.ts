"use server";

import { getVerficationTokenByToken } from '../data/verfication-token';
import { getUserByEmail } from '../data/user';
import { db } from '../lib/db';


export const newVerificationToken = async  (
    token : string
) => {

    try{
        const verificationToken = await getVerficationTokenByToken( token );

        if( !verificationToken ) return {
            error : "Token does not exist"
        };

        const hasExpried = new Date(verificationToken.expires) < new Date();

        if( hasExpried ) {
            return {
                error : "Token has expired"
            }
        }

        const existingUser = await getUserByEmail( verificationToken.email );

        if( !existingUser ) {
            return {
                error : "User does not exist"
            }
        }

        await db.user.update({
            where : {
                id: existingUser.id
            },
            data : {
                emailVerified: new Date(),
                email: verificationToken.email
            }
        });

        await db.verificationToken.delete({
            where : {
                id: verificationToken.id
            }
        });

        return {
            success : "Email verified"
        }


    } catch( error ) {
        console.error(error);
    }

}