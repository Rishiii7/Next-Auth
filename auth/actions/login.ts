"use server";

import { LoginSchema } from '@/schemas';
import * as z from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../route';
import { AuthError } from 'next-auth';
import { generateVerficationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { sendVerficationEmail } from '@/lib/mail';


export const login = async ( values : z.infer< typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse( values );

    if( !validatedFields.success ) {
        return {
            error : "Invalid Fields"
        };
    }

    const { email, password} = validatedFields.data;

    const existingUser = await getUserByEmail( email );

    if( !existingUser || !existingUser.email || !existingUser.password) {
        return {
            error : "Email does not exist"
        }
    }

    if( !existingUser.emailVerified ) {
        const verificationToken = await generateVerficationToken( existingUser.email );

        await sendVerficationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return {
            success : "Confirmation email sent"
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo:  DEFAULT_LOGIN_REDIRECT,
        }) ;
    } catch (error ) {
        if ( error instanceof AuthError) {
            switch ( error.type) {
                case "CredentialsSignin" :
                    return {
                        error : "Invalid Credentials"
                    }
                default:
                    return {
                        error : "Something went Wrong"
                    }
            }
        }

        throw error;
    }

};