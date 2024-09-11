import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, RefObject } from "react";

const Footer = forwardRef<HTMLDivElement>(function Footer(props, ref) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <Center
      ref={ref}
      py={20}
      style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}
    >
      <form style={{ width: "500px" }} onSubmit={form.onSubmit(() => {})}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
          fw={900}
          ta="center"
        >
          Оставить отзыв
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            name="name"
            variant="filled"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Почта"
            placeholder="Ваша электронная почта"
            name="email"
            variant="filled"
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Тема"
          placeholder="Тема"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps("subject")}
        />
        <Textarea
          label="Сообщение"
          mt="md"
          placeholder="Ваше сообщение"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps("message")}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Отправить отзыв
          </Button>
        </Group>
      </form>
    </Center>
  );
});

export default Footer;
