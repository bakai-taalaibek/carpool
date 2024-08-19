"use client";

import "dayjs/locale/ru";

import { DatesProvider } from "@mantine/dates";

export default function DatesProviderWrapper({ children }: { children: any }) {
  return <DatesProvider settings={{ locale: "ru" }}>{children}</DatesProvider>;
}
