"use client";
import React from 'react';
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
import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-success';

export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values : z.infer<typeof LoginSchema>) => {
        console.log(values);
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <FormError message=''/>
                    <FormSucess message=''/>
                    <Button
                        className='w-full'
                    >
                        Log In
                    </Button>

                </form>

            </Form>
        </CardWrapper>
  )
}
