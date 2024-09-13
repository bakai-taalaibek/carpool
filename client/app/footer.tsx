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
      >
        <GridCol span={{ base: 12, sm: 6 }} w={400} maw={400}>
          <Title c="white" lh={1} ff="Greycliff CF">
            Contact us
          </Title>
          <Text
            c="var(--mantine-color-blue-0)"
            maw={{ base: "100%", sm: 300 }}
            mt="sm"
            mb={30}
          >
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList />
        </GridCol>

        <GridCol span={{ base: 12, sm: 6 }} w={400} maw={400}>
          <Paper bg="white" p="xl" shadow="lg" radius="md" w="100%">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              // classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label="Name"
              placeholder="John Doe"
              mt="md"
              // classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              label="Your message"
              placeholder="I want to order your goods"
              minRows={4}
              mt="md"
              // classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group justify="flex-end" mt="md">
              <Button bg="var(--mantine-color-blue-6)">Send message</Button>
            </Group>
          </Paper>
        </GridCol>
      </Grid>
    </Center>
  );
});

export default Footer;
