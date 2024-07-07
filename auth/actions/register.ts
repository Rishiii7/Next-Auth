"use server";

import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';


export const register = async  ( values : z.infer< typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse( values );

    if( !validatedFields.success ) {
        return {
            error : "Invalid Fields"
        };
    }

    const { email, name, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash( password, 10 );

    const existingUser = await getUserByEmail(email);

    if ( existingUser ) {
        return {
            error : "Email already taken"
        }
    }

    const resp = await db.user.create({
        data : {
            email: email,
            name: name,
            password: hashedPassword
        }
    });

    console.log(resp);

    return {
        success: "User Created"
    };
};