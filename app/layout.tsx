import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import Loglib from "@loglib/tracker/react";

import MainProvider from "../providers/MainProvider";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "Retrolink",
  description: "Retro gaming online marketplace.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <MainProvider>
          <Loglib
            config={{
              id: "www_retrolink",
              consent: "granted",
            }}
          />
          <Theme
            accentColor='tomato'
            grayColor='gray'
            appearance='light'
            panelBackground='translucent'
            scaling='110%'
            radius='medium'
          >
            <main className={GeistSans.className}>{children}</main>
          </Theme>
        </MainProvider>
      </body>
    </html>
  );
}
