"use client";
import React, { useState } from 'react';
import { useTransition } from 'react';
import z from 'zod'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '../ui/form';
import { RegisterSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-success';
import { login } from '@/actions/login';

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const onSubmit = (values : z.infer<typeof RegisterSchema>) => {

        setError("");
        setSuccess("");

        startTransition( () => {
            login(values)
            .then( (data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    }

    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel="Already have an account?"
            backButtonLink='/auth/login'
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder='John Doe'
                                            type='text'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    <FormError message={error}/>
                    <FormSucess message={success}/>
                    <Button
                        className='w-full'
                        disabled={isPending}
                    >
                        Sign Up
                    </Button>

                </form>

            </Form>
        </CardWrapper>
  )
}
