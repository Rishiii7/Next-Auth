"use client";

import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';


const Social = () => {

    const onClick = (provider : "github" | "google") => {
        signIn( provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        }
        )
    }

  return (
    <div className='flex items-center w-full gap-x-2'>
        <Button className='w-full '
            size={"lg"}
            variant={"outline"}
            onClick={() => onClick("google")}
        >
            <FcGoogle className='w-5 h-5'/>
        </Button>
        <Button className='w-full '
            size={"lg"}
            variant={"outline"}
            onClick={() => onClick("github")}
        >
            <FaGithub className='w-5 h-5' />
        </Button>
        
    </div>
  )
}

export default Social