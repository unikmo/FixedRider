import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"FixedRider | Zanzibar fixed-price transfers",description:"Know your fare before you go. Clear fixed-price transfers with verified local drivers in Zanzibar."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}