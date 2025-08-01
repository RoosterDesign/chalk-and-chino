import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";

import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import { ModalProvider } from "@/app/context/ModalContext";

import "./globals.scss";

import { baskervville, libreBaskerville, sen } from "@/app/fonts";
import { getFooterData } from "@/lib/footer/getFooterData";
import { getHeaderNav } from "@/lib/nav/getHeaderNav";
import { getProductCategories } from "@/lib/products/getProductCategories";

export const metadata = {
    openGraph: {
        url: "https://chalkandchino.co.uk",
        title: "Chalk & Chino",
        description: "Bespoke Furniture Upcycling in Hucclecote, Gloucester.",
        images: [
            {
                url: "/og-default.png",
                width: 1200,
                height: 630,
                alt: "Chalk & Chino",
            },
        ],
        siteName: "Chalk & Chino",
    },
    twitter: {
        card: "summary_large_image",
        title: "Chalk & Chino",
        description: "My awesome site",
        images: ["/og-default.png"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        other: [
            {
                rel: "icon",
                url: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                rel: "icon",
                url: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                rel: "icon",
                url: "/favicon.svg",
                type: "image/svg+xml",
            },
            {
                rel: "manifest",
                url: "/site.webmanifest",
            },
        ],
    },
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
                <SpeedInsights />
            </body>
        </html>
    );
}
