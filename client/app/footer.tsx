import {
  Text,
  TextInput,
  Textarea,
  Group,
  Title,
  Button,
  Grid,
  Paper,
  GridCol,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef } from "react";
import { ContactIconsList } from "./contactIcons";

const Footer = forwardRef<HTMLDivElement>(function Footer(_, ref) {
  const form = useForm({
    initialValues: {
      email: "",
      message: "",
    },
    validate: {
      // email: (value) => !/^\S+@\S+$/.test(value),
      message: (value) => value.trim().length === 0,
    },
  });

  return (
    <Grid
      ref={ref}
      w="100%"
      bg="linear-gradient(-60deg, var(--mantine-color-blue-4) 0%, var(--mantine-color-blue-7) 100%)"
      gutter={50}
      justify="center"
      p="xl"
      pt="calc(var(--mantine-spacing-xl) * 1.8)"
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
        <Paper bg="white" px="xl" py="lg" shadow="lg" radius="md" w="100%">
          <TextInput
            label="Электронная почта"
            placeholder="your@email.com"
            // required
            {...form.getInputProps("email")}
            mt="xs"
          />
          <Textarea
            autosize
            required
            label="Ваше сообщение"
            placeholder="Привет, меня зовут..."
            minRows={2}
            mt="md"
            {...form.getInputProps("message")}
          />

          <Group justify="flex-end" mt="md">
            <Button bg="var(--mantine-color-blue-6)">Отправить</Button>
          </Group>
        </Paper>
      </GridCol>
      <GridCol span={12} p="md" pt="xs">
        <Text ta="center" c="white" fz={14} fw={500}>
          © {new Date().getFullYear()} Bakai Taalaibek uulu
        </Text>
      </GridCol>
    </Grid>
  );
});

export default Footer;
