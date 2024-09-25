import { Text, Box, Stack, rem, Flex } from "@mantine/core";
import {
  IconSun,
  IconPhone,
  IconMapPin,
  IconAt,
  IconBrandWhatsapp,
  IconBrandTelegram,
} from "@tabler/icons-react";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <Flex align="center" c="white" {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" c="var(--mantine-color-blue-0)">
          {title}
        </Text>
        <Text c="var(--mantine-color-white)">{description}</Text>
      </div>
    </Flex>
  );
}

const MOCKDATA = [
  { title: "Email", description: "bakai.pochta@gmail.com", icon: IconAt },
  {
    title: "WhatsApp",
    description: "+996 500 391990",
    icon: IconBrandWhatsapp,
  },
  {
    title: "Telegram",
    description: "t.me/bakai_abc",
    icon: IconBrandTelegram,
  },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
