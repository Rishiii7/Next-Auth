"use client";
import React, { useState } from 'react';
import { useTransition } from 'react';
import z from 'zod'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '../ui/form';
import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-success';
import { login } from '@/actions/login';

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values : z.infer<typeof LoginSchema>) => {

        setError("");
        setSuccess("");

        startTransition( () => {
            login(values)
            .then( (data) => {
                // setSuccess(data?.success);
                setError(data?.error);
            })
        });
    }

    return (
        <CardWrapper
            headerLabel='welcome back'
            backButtonLabel="Don't have an account?"
            backButtonLink='/auth/register'
            showSocial>
            {/* Login form  */}
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit( onSubmit )}
                    className='space-y-4'
                >
                    <div 
                        className='space-y-4'>
                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder='johndoe@example.com'
                                            type='email'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Passowrd field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder='******'
                                            type='password'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormError message={error || urlError}/>
                    <FormSucess message={success}/>
                    <Button
                        className='w-full'
                        disabled={isPending}
                    >
                        Log In
                    </Button>

                </form>

            </Form>
        </CardWrapper>
  )
}
