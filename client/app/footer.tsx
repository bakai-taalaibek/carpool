import {
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Paper,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef } from "react";
import { useCreateReviewMutation } from "../services/reviewsApi";
import { ContactIconsList } from "./contactIcons";
import { TermsModal } from "./termsModal";

const Footer = forwardRef<HTMLDivElement | null>(function Footer(_, ref) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      anonEmail: "",
      text: "",
    },
    validate: {
      anonEmail: isEmail("Пожалуйста укажите электронную почту"),
      text: isNotEmpty("Пожалуйста добавьте сообщение"),
    },
  });
  const [isTermsModalOpen, { open: openTermsModal, close: closeTermsModal }] =
    useDisclosure(false);

  const [createReview, { isLoading, isError, isSuccess }] =
    useCreateReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview(form.getValues()).unwrap();
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

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
        <Title c="white" lh={1}>
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
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Электронная почта"
              placeholder="your@email.com"
              // required
              {...form.getInputProps("anonEmail")}
              mt="xs"
            />
            <Textarea
              autosize
              required
              label="Ваше сообщение"
              placeholder="Привет, меня зовут..."
              minRows={2}
              mt="md"
              {...form.getInputProps("text")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" bg="var(--mantine-color-blue-6)">
                Отправить
              </Button>
            </Group>
          </form>
        </Paper>
      </GridCol>
      <GridCol span={12} px={0} py="md">
        <Flex
          px={25}
          mx="auto"
          justify="space-between"
          align="center"
          maw={{ base: 400, sm: 800 }}
          fz={{ base: 13, sm: 14 }}
        >
          <Button
            p="0"
            variant="transparent"
            fw="400"
            color="white"
            onClick={openTermsModal}
            fz={{ base: 13, sm: 14 }}
          >
            Условия использования
          </Button>
          <Text ta="center" c="white" fz={{ base: 13, sm: 14 }}>
            © {new Date().getFullYear()} Bakai Taalaibek uulu
          </Text>
        </Flex>
      </GridCol>
      <TermsModal opened={isTermsModalOpen} onClose={closeTermsModal} />
    </Grid>
  );
});

export default Footer;
