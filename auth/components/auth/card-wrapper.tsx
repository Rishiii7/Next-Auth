"use client";
import React from 'react';

import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter
 } from '@/components/ui/card';
import { Header } from './header';
import Social from './social';
import BackButton from './back-button';


type CardWrapperProps = {
    children: React.ReactNode;
    headerLabel : string;
    backButtonLabel: string;
    backButtonLink: string;
    showSocial: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonLink,
    showSocial,
} : CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-lg'>
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        { showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}
        <CardFooter>
            <BackButton 
                label={backButtonLabel} 
                link={backButtonLink}
            />
        </CardFooter>
    </Card>
  )
}

