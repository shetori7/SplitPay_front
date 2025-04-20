import type { Metadata } from "next";
import "./globals.css";
import Header from "../component/header";
// import Footer from "../component/footer";

export const metadata: Metadata = {
  title: "Sogen Admin",
  description: "Sogen Admin Application",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}