import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerficationEmail = async  ( 
    email : string,
    token: string
) => {
    const confirmationLink = `http://localhost:3000/auth/new-verfication?token=${token}`;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your email address',
            html:`
                <p> Click <a href=${confirmationLink}>here</a> to confirm email </p>
            `
        });

        if( error ) {
            throw error;
        }

        console.log(data);

    } catch (error ) {
        console.log(error);
    }
};
