import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Dashboard",
  description: "Web dashboard listing all GitHub projects from a user",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
