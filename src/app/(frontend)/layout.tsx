import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import { ModalProvider } from "@/app/context/ModalContext";
import { baskervville, libreBaskerville, sen } from "@/app/fonts";

import "./globals.scss";

import { getFooterData } from "@/lib/footer/getFooterData";
import { getHeaderNav } from "@/lib/nav/getHeaderNav";
import { getProductCategories } from "@/lib/products/getProductCategories";
import React from "react";

export const metadata = {
    description: "A blank template using Payload in a Next.js app.",
    title: "Payload Blank Template",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;

    const mainNavItems = await getHeaderNav();
    const { footerText, footerLinks } = await getFooterData();
    const rawProductCategories = await getProductCategories();

    const productCategories = [
        { label: "All Products", url: "/products" },
        ...rawProductCategories,
    ];

    return (
        <html
            className={`${sen.variable} ${libreBaskerville.variable} ${baskervville.variable}`}
            lang="en"
        >
            <body>
                <ModalProvider>
                    <Header
                        mainNavItems={mainNavItems}
                        productCategories={productCategories}
                    />
                    {children}
                    <Footer
                        footerNavItems={footerLinks}
                        footerText={footerText}
                        mainNavItems={mainNavItems}
                        productCategories={productCategories}
                    />
                </ModalProvider>
            </body>
        </html>
    );
}
