import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { ModalProvider } from '@/context/ModalContext';

import "./globals.scss";

import { baskervville, libreBaskerville, sen } from '@/fonts'
import React from 'react'

export const metadata = {
    description: 'A blank template using Payload in a Next.js app.',
    title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html className={`${sen.variable} ${libreBaskerville.variable} ${baskervville.variable}`} lang="en">
            <body>
                <ModalProvider>
                    <Header />
                    {children}
                    <Footer />
                </ModalProvider>
            </body>
        </html>
    )
}
