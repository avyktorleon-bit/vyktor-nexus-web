import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Vyktor Nexus",
    description: "ZWeb migrated to Next.js",
};

import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="antialiased">
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    );
}
