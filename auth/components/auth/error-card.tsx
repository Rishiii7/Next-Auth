import React from 'react'
import { Card, CardHeader, CardFooter } from '../ui/card';
import { Header } from './header';
import BackButton from './back-button';

export const ErrorCard = () => {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader >
            <Header  label='Oops! Something went wrong'/>
        </CardHeader>
        <CardFooter>
            <BackButton
                label='Back to login'
                link='/auth/login'
            />
        </CardFooter>

    </Card>
  )
}
