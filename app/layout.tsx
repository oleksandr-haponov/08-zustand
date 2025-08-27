import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes manager built with Next.js",
};

export default function RootLayout({
  children,
  modal, // обязателен, так как slot @modal есть на корне
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <TanStackProvider>
          {children}
          {modal}
        </TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}
