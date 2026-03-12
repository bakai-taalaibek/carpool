"use client";
import {
  Anchor,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Group,
  PaperProps,
  PasswordInput,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useToggle } from "@mantine/hooks";
import {
  ConfirmationResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, setCredentials } from "../../lib/authSlice";
import { auth } from "../../lib/firebase";
import GoogleIcon from "../../public/icons/GoogleIcon";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useSentTokenMutation,
} from "../../services/accountsApi";
import { LoginResponseDto } from "../../types/login";
import { TermsModal } from "../termsModal";

export default function AuthenticationForm(props: PaperProps) {
  const dispatch = useDispatch();
  const [sendToken] = useSentTokenMutation();
  const [isWaitingForCode, setIsWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null,
  );
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const router = useRouter();

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const [isModalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const [authActionType, toggleAuthActionType] = useToggle([
    "login",
    "register",
  ]);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
      );
    }
  }, []);

  const form = useForm({
    initialValues: {
      emailOrPhone: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },

    validate: {
      emailOrPhone: (val) => {
        if (isEmpty) {
          return "Заполните поле";
        } else if (isPhoneUsed) {
          const withCodeAndLength = /^\+[1-9]\d{9,14}$/.test(val);

          if (withCodeAndLength) return null;
          else return "Пожалуйста укажите номер с кодом страны (+996)";
        } else {
          const isEmailValid = /^\S+@\S+\.\S+$/.test(val);

          if (isEmailValid) return null;
          else return "Введите корректную почту";
        }
      },
      password: (val) => {
        if (isPhoneUsed) return null;
        else if (val.length >= 6) return null;
        else return "Минимальная длина пароля - 6 символов";
      },
      passwordConfirmation: (val, values) => {
        if (authActionType === "login" || isPhoneUsed) return null;
        else if (val === values.password) return null;
        else return "Введенные пароли не совпадают";
      },
      terms: (val) => {
        if (authActionType === "login" || val) return null;
        else return true;
      },
    },
  });

  const input = form.values.emailOrPhone;

  const isPhoneUsed = /^\+?\d+$|^\+$/.test(input);
  const isEmpty = input === "";
  const isEmailUsed = !isEmpty && !isPhoneUsed;

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const idToken = await result.user.getIdToken();

    try {
      const response = await sendToken(idToken).unwrap();

      saveCredentials(response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signInWithEmail = async () => {
    const values = form.values;
    const result = form.validate();
    if (result.hasErrors) return;

    if (authActionType === "login") {
      try {
        const response = await loginUser({
          identifier: values.emailOrPhone,
          password: values.password,
        }).unwrap();

        saveCredentials(response);
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      try {
        await registerUser({
          email: values.emailOrPhone,
          password: values.password,
        }).unwrap();

        router.push("auth/check-email");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  const sendSms = async () => {
    const result = form.validateField("emailOrPhone");
    if (result.hasError) return;

    const verifier = (window as any).recaptchaVerifier;

    const response = await signInWithPhoneNumber(
      auth,
      form.values.emailOrPhone,
      verifier,
    );
    setConfirmation(response);

    setIsWaitingForCode(true);
  };
  const confirmCode = async () => {
    if (confirmation === null) return;
    const result = await confirmation.confirm(code);
    const idToken = await result.user.getIdToken();

    try {
      const response = await sendToken(idToken).unwrap();

      saveCredentials(response);
    } catch (error) {
      console.error("Login failed:", error);
    }
    setIsWaitingForCode(false);
    setCode("");
  };

  const saveCredentials = (response: LoginResponseDto) => {
    dispatch(
      setCredentials({
        token: response.token,
        user: response.user,
        expiresAt: response.expiresAt,
      }),
    );

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("expiresAt", response.expiresAt);

    router.push("/");
  };

  if (isAuthenticated) router.push("/");

  return (
    <>
      <Text ta="center" fw={900} mb={5} size="xl">
        {authActionType === "register"
          ? "Зарегистрируйтесь с помощью..."
          : "Войдите с помощью..."}
      </Text>
      <Text c="dimmed" size="sm" ta="center" mb={20}>
        {authActionType === "register"
          ? "Уже есть аккаунт? "
          : "Еще нет аккаунта? "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => toggleAuthActionType()}
        >
          {authActionType === "register" ? "Войдите" : "Зарегистрируйтесь"}
        </Anchor>
      </Text>
      <Button
        leftSection={<GoogleIcon />}
        variant="default"
        radius="xl"
        fullWidth
        mb="md"
        onClick={loginWithGoogle}
      >
        Google
      </Button>

      <Divider
        label="Или через номер телефона / почту"
        labelPosition="center"
        mt="lg"
        mb="xs"
      />

      <Stack>
        <TextInput
          disabled={isWaitingForCode}
          label={
            isEmpty ? "Телефон или почта" : isPhoneUsed ? "Телефон" : "Почта"
          }
          placeholder="+996 500 600 700 / name@email.com"
          value={form.values.emailOrPhone}
          onChange={(event) =>
            form.setFieldValue("emailOrPhone", event.currentTarget.value)
          }
          error={form.errors.emailOrPhone}
          radius="md"
        />

        {isEmailUsed && (
          <>
            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius="md"
            />

            {authActionType === "register" && (
              <PasswordInput
                label="Подтвердите пароль"
                placeholder="Введите пароль снова"
                value={form.values.passwordConfirmation}
                onChange={(event) =>
                  form.setFieldValue(
                    "passwordConfirmation",
                    event.currentTarget.value,
                  )
                }
                error={form.errors.passwordConfirmation}
                radius="md"
              />
            )}
          </>
        )}
        {isWaitingForCode && (
          <Stack gap={2}>
            <Text fz={14} fw={500}>
              Введите полученный код:
            </Text>
            <Group justify="space-between">
              <PinInput
                autoFocus
                length={6}
                size="xs"
                placeholder=""
                value={code}
                onChange={(value) => setCode(value)}
              />
              <CloseButton
                c="red"
                bg="red.0"
                onClick={() => {
                  setIsWaitingForCode(false);
                  setCode("");
                }}
              />
            </Group>
          </Stack>
        )}
      </Stack>
      <div id="recaptcha-container"></div>

      <Group justify="space-between" mt="xl">
        {authActionType === "register" ? (
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
        ) : isEmailUsed ? (
          <Anchor
            component={Link}
            href="/auth/forgot-password"
            c="dimmed"
            size="sm"
            ta="start"
          >
            Забыли пароль?
          </Anchor>
        ) : (
          <div></div>
        )}

        {isWaitingForCode ? (
          <Button onClick={() => confirmCode()}>{"Далее"}</Button>
        ) : isPhoneUsed ? (
          <Button onClick={sendSms}>Получить SMS</Button>
        ) : (
          <Button onClick={signInWithEmail}>
            {authActionType === "login" ? "Войти" : "Далее"}
          </Button>
        )}
      </Group>
      <TermsModal opened={isModalOpened} onClose={closeModal} />
    </>
  );
}
