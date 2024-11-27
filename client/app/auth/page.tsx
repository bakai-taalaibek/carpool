"use client";
import { useToggle, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Modal,
} from "@mantine/core";
import GoogleIcon from "../../public/icons/GoogleIcon";
import Link from "next/link";

export default function AuthenticationForm(props: PaperProps) {
  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val) ? null : "Недействительный формат почты",
      password: (val) =>
        val.length <= 6 ? "Минимальная длина пароля - 6 символов" : null,
      passwordConfirmation: (val, values) =>
        val === values.password ? null : "Введенные пароли не совпадают",
      terms: (val) => !val,
    },
  });

  return (
    <Center>
      <Paper radius="md" p="xl" withBorder w={400} shadow="md" {...props}>
        <Text ta="center" fw={900} mb={5} size="xl">
          {type === "register"
            ? "Зарегистрируйтесь с помощью..."
            : "Войдите с помощью..."}
        </Text>
        <Text c="dimmed" size="sm" ta="center" mb={20}>
          {type === "register" ? "Уже есть аккаунт? " : "Еще нет аккаунта? "}
          <Anchor size="sm" component="button" onClick={() => toggle()}>
            {type === "register" ? "Войдите" : "Зарегистрируйтесь"}
          </Anchor>
        </Text>
        <Button
          leftSection={<GoogleIcon />}
          variant="default"
          radius="xl"
          fullWidth
          mb="md"
        >
          Google
        </Button>

        <Divider
          label="Или используйте почту"
          labelPosition="center"
          mt="lg"
          mb="xs"
        />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Почта"
              placeholder="your.name@email.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
              radius="md"
            />

            <PasswordInput
              required
              label="Пароль"
              placeholder="Ваш пароль"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />

            {type === "register" && (
              <PasswordInput
                required
                label="Подтвердите пароль"
                placeholder="Введите пароль снова"
                value={form.values.passwordConfirmation}
                onChange={(event) =>
                  form.setFieldValue(
                    "passwordConfirmation",
                    event.currentTarget.value
                  )
                }
                error={form.errors.passwordConfirmation}
                radius="md"
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            {type === "register" ? (
              <Checkbox
                label={
                  <>
                    Я принимаю{" "}
                    <Anchor inherit component="button" onClick={openModal}>
                      условия
                    </Anchor>
                  </>
                }
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
                error={form.errors.terms}
              />
            ) : (
              <Anchor
                component={Link}
                href="/auth/restore"
                c="dimmed"
                size="sm"
                ta="start"
              >
                Забыли пароль?
              </Anchor>
            )}

            <Button type="submit">
              {type === "login" ? "Войти" : "Далее"}
            </Button>
          </Group>
        </form>
      </Paper>
      <Modal
        size="xl"
        opened={isModalOpened}
        onClose={closeModal}
        title={
          <Text fw="600" fz="18">
            Условия использования платформы POPUTKA.KG
          </Text>
        }
      >
        <Text>
          <Text fw="500" mb={5}>
            1. Введение
          </Text>
          <Text mb={10}>
            Добро пожаловать на платформу &quot;Попутка&quot;! Используя наш
            сервис, вы соглашаетесь с настоящими Условиями использования. Если
            вы не согласны с ними, пожалуйста, не пользуйтесь нашей платформой.
          </Text>
          <Text fw="500" mb={5}>
            2. Описание сервиса
          </Text>
          <Text mb={10}>
            &quot;Попутка&quot; – это платформа, которая соединяет водителей
            (&quot;Водители&quot;) и пассажиров (&quot;Пассажиры&quot;) для
            совместных поездок. &quot;Попутка&quot; не предоставляет
            транспортных услуг и не несет ответственности за любые инциденты,
            которые могут произойти во время поездок.{" "}
          </Text>
          <Text fw="500" mb={5}>
            3. Требования к пользователям
          </Text>
          <Text mb={10}>
            Минимальный возраст для использования платформы – 18 лет. Водители
            обязаны иметь действующее водительское удостоверение, страховку на
            автомобиль и исправное транспортное средство.{" "}
          </Text>
          <Text fw="500" mb={5}>
            4. Обязанности пользователей
          </Text>
          <Text mb={10}>
            Достоверность информации: Вы обязуетесь предоставлять только
            актуальную и правдивую информацию при регистрации и использовании
            платформы. Соблюдение законов: Водители и пассажиры обязаны
            соблюдать все применимые законы и правила, включая правила дорожного
            движения и требования к страховке. Поведение: Пользователи должны
            вести себя вежливо и корректно при взаимодействии друг с другом на
            платформе и во время поездок.
          </Text>
          <Text fw="500" mb={5}>
            5. Ограничение ответственности
          </Text>
          <Text mb={10}>
            Роль платформы: &quot;Попутка&quot; является только посредником и не
            несет ответственности за поведение, безопасность или надежность
            пользователей. Риски: Вы признаете, что использование
            &quot;Попутки&quot; связано с рисками, и соглашаетесь, что платформа
            не несет ответственности за любые несчастные случаи, споры, травмы
            или убытки.
          </Text>
          <Text fw="500" mb={5}>
            6. Оплата и возврат средств{" "}
          </Text>
          <Text mb={10}>
            Все финансовые расчёты между Водителями и Пассажирами происходят
            напрямую без участия платформы &quot;Попутка&quot;. Платформа
            &quot;Попутка&quot; не участвует в спорах, связанных с платежами, и
            не несёт ответственности за их результат и финансовые убытки,
            вызванные действиями или бездействием Водителей или Пассажиров.
          </Text>
          <Text fw="500" mb={5}>
            7. Конфиденциальность
          </Text>
          <Text mb={10}>
            Платформа &quot;Попутка&quot; собирает и использует личные данные
            пользователей исключительно для обеспечения работы сервиса
            (например, для связи между Водителями и Пассажирами). Мы не передаём
            ваши данные третьим лицам, за исключением случаев, предусмотренных
            законодательством. Пользователь несёт ответственность за
            корректность и актуальность предоставленных данных. Платформа
            &quot;Попутка&quot; принимает разумные меры для защиты данных
            пользователей, но не несёт ответственности за возможные негативные
            последствия злонамеренных действий третьих лиц (например, хакеров).
          </Text>
          <Text fw="500" mb={5}>
            8. Разрешение споров
          </Text>
          <Text mb={10}>
            Все споры между Водителями и Пассажирами должны решаться
            непосредственно между сторонами. &quot;Попутка&quot; не несет
            ответственности за разрешение споров.
          </Text>
          <Text fw="500" mb={5}>
            9. Прекращение использования
          </Text>
          <Text mb={10}>
            &quot;Попутка&quot; оставляет за собой право прекратить доступ к
            аккаунту, если пользователь нарушает настоящие Условия или ведет
            себя неподобающим образом.
          </Text>
          <Text fw="500" mb={5}>
            10. Изменения условий
          </Text>
          <Text mb={10}>
            &quot;Попутка&quot; может вносить изменения в Условия использования
            в любое время. Продолжая использовать платформу, вы соглашаетесь с
            обновленными условиями.
          </Text>
        </Text>
      </Modal>
    </Center>
  );
}
