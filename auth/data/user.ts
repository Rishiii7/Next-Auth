import { db } from '../lib/db';

export const getUserByEmail = async  (email : string) => {
    try {
        const user = await db.user.findUnique( {
            where : {
                email : email
            }
        });

        return user;
    } catch(err) {
        console.log(err);
        return null;
    }
}

export const getUserbyId = async (id : string | undefined) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch ( err ) {
        console.log(err);
        return null;
    }
}
