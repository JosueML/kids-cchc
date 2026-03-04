import type { Metadata } from "next";
import "./globals.css";
import { Helvetica } from "./fonts";
import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
    title: "Cada Hogar Kids",
    description:
        "Sitio web oficial de Cada Hogar Kids, un ministerio de Cristo en Cada Hogar Cuba.",
    openGraph: {
        title: "Cada Hogar Kids",
        description:
            "Sitio web oficial de Cada Hogar Kids, un ministerio de Cristo en Cada Hogar Cuba.",
        url: "https://cadahogarkids.com",
        siteName: "Cada Hogar Kids",
        images: [
            {
                url: "https://cadahogarkids.com/img/logos/chk.svg",
                width: 1200,
                height: 630,
                alt: "Cada Hogar Kids - Sitio web oficial",
            },
        ],
        locale: "es_CU",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PlausibleProvider domain="cadahogarkids.com">
            <html lang="es">
                <head>
                    <link rel="icon" href="/img/logos/chk_logo.svg" />
                </head>
                <body className={`${Helvetica.className} antialiased`}>
                    {children}
                </body>
            </html>
        </PlausibleProvider>
    );
}
