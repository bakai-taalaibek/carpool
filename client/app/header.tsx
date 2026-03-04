import { Box, Button, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../lib/authSlice";
import UserMenu from "./userMenu";

type TProps = {
  scrollFooterIntoView: () => void;
};

export const Header = ({ scrollFooterIntoView }: TProps) => {
  const pathname = usePathname();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Box
      h={60}
      w="100%"
      style={{
        position: "absolute",
        top: 0,
        zIndex: 3,
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
      bg="white"
    >
      <Group px="md" h="100%" justify="space-between">
        <Text
          component={Link}
          href="/"
          tt="uppercase"
          c="cyan.8"
          fw={700}
          size="lg"
        >
          POPUTKA.KG
        </Text>
        <Group gap={20}>
          {pathname !== "/new" && (
            <Button
              component={Link}
              href="/new"
              radius="xl"
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 90 }}
              visibleFrom="xs"
            >
              + Новая попутка
            </Button>
          )}
          <Button
            variant="subtle"
            color="cyan"
            radius="xl"
            onClick={() => scrollFooterIntoView()}
            visibleFrom="sm"
          >
            Оставить отзыв
          </Button>
          {!isAuthenticated && (
            <Button
              component={Link}
              href="/auth"
              variant="subtle"
              color="cyan"
              radius="xl"
            >
              Войти
            </Button>
          )}
          <UserMenu />
        </Group>
      </Group>
      {/* only in mobile viewport on index page show sub-header (hiddenFrom="sm") */}
      {pathname === "/" && (
        <Group
          hiddenFrom="xs"
          w="100%"
          bg="gray.0"
          h={45}
          justify="space-evenly"
        >
          <Button
            className="[&_*[data-position='left']]:[margin-inline-end:6px]"
            component={Link}
            href="/new"
            radius="xl"
            variant="subtle"
            color="cyan"
            leftSection={<IconPlus />}
          >
            Новая попутка
          </Button>
        </Group>
      )}
    </Box>
  );
};
