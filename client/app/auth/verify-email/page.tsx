"use client";

import { CheckIcon, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useVerifyEmailMutation } from "../../../services/accountsApi";

export default function VerifyEmail() {
  const params = useSearchParams();
  const token = params.get("token");
  const userId = params.get("userId");

  const router = useRouter();

  const dispatch = useDispatch();
  const [verifyEmail, { isError }] = useVerifyEmailMutation();

  const paramsIncomplete = !token || !userId;

  const calledRef = useRef(false);

  useEffect(() => {
    if (paramsIncomplete || calledRef.current) return;

    calledRef.current = true;

    try {
      (async () => {
        const response = await verifyEmail({ token, userId }).unwrap();

        notifications.show({
          message: response.message,
          color: "teal",
          title: "Успешная регистрация",
          position: "top-right",
          icon: <CheckIcon size={20} />,
        });

        router.push("/auth");
      })();
    } catch (error) {
      console.log(error);
    }
  }, [token, userId, verifyEmail]);

  if (paramsIncomplete || isError)
    return (
      <Text ta="center" fw={500} fz={20}>
        Что-то пошло не так...
      </Text>
    );
  return (
    <Text ta="center" fw={500} fz={20}>
      Проверяем вашу почту...
    </Text>
  );
}
