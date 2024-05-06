import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/header";
import { NextAuthProvider } from "./providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarefas+ | Organize suas tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
