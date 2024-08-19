import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import BasicMantineLayout from "./basicMantineLayout";
import DatesProviderWrapper from "./datesProvider";

export const metadata = {
  title: "Poputka.pro",
  description: "Найди свою попутку!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <DatesProviderWrapper>
            <BasicMantineLayout>{children}</BasicMantineLayout>
          </DatesProviderWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
