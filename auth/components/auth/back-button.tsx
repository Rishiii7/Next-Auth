"use client";
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

type BackButtonProps = {
    label: string;
    link: string;
}

const BackButton = ({
    label,
    link
}: BackButtonProps) => {
  return (

    <Button 
        variant={"link"}
        className='font-normal w-full'
        size={"sm"}
        asChild
    >
        <Link href={link}>
            <p className='text-sm underline'>
                {label}
            </p>
        </Link>
    </Button>
    
  )
}

export default BackButton