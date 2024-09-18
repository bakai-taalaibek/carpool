import {
  Text,
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Center,
  Box,
  Flex,
  Grid,
  Paper,
  GridCol,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef } from "react";
import { ContactIconsList } from "./contactIcons";

const Footer = forwardRef<HTMLDivElement>(function Footer(_, ref) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value),
      message: (value) => value.trim().length === 0,
    },
  });

  return (
    <Center
      ref={ref}
      w="100%"
      bg="linear-gradient(-60deg, var(--mantine-color-blue-4) 0%, var(--mantine-color-blue-7) 100%)"
    >
      <Grid
        gutter={50}
        mih={400}
        justify="center"
        p={{
          base: "calc(var(--mantine-spacing-xl) * 1.5)",
          sm: "calc(var(--mantine-spacing-xl) * 2.5)",
        }}
        pb="xl"
      >
        <GridCol span={{ base: 12, sm: 6 }} w={400} maw={400}>
          <Title c="white" lh={1} ff="Greycliff CF">
            Свяжитесь с нами
          </Title>
          <Text
            c="var(--mantine-color-blue-0)"
            maw={{ base: "100%", sm: 300 }}
            mt="sm"
            mb={30}
          >
            Задайте вопрос, оставьте отзыв или предложение...
          </Text>

          <ContactIconsList />
        </GridCol>

        <GridCol span={{ base: 12, sm: 6 }} w={400} maw={400}>
          <Paper bg="white" p="xl" shadow="lg" radius="md" w="100%">
            <TextInput
              label="Имя"
              placeholder="Асан Асанов"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Электронная почта"
              placeholder="your@email.com"
              required
              mt="md"
              {...form.getInputProps("email")}
            />
            <Textarea
              required
              label="Ваше сообщение"
              placeholder="У меня есть предложение о сотрудничестве"
              minRows={4}
              mt="md"
              {...form.getInputProps("message")}
            />

            <Group justify="flex-end" mt="md">
              <Button bg="var(--mantine-color-blue-6)">
                Отправить сообщение
              </Button>
            </Group>
          </Paper>
        </GridCol>
        <GridCol span={12} p="md">
          <Text ta="center" c="white" fz={14} fw={500}>
            © {new Date().getFullYear()} Bakai Taalaibek uulu
          </Text>
        </GridCol>
      </Grid>
    </Center>
  );
});

export default Footer;
