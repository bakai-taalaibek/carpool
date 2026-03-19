"use client";
import { Group, Textarea } from "@mantine/core";
import { useState } from "react";

const replacementMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "ye",
  ё: "yo",
  ж: "j",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  ң: "nh",
  о: "o",
  ө: "oe",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ү: "ue",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "c",
  ш: "sh",
  щ: "sch",
  ъ: "'",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  A: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "Ye",
  Ё: "Yo",
  Ж: "J",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  Ө: "Oe",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ү: "Ue",
  Ф: "F",
  Х: "Kh",
  Ц: "Ts",
  Ч: "C",
  Ш: "Sh",
  Щ: "Sch",
  Ъ: "'",
  Ь: "",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
  ы: "eu",
  Ы: "Eu",
};

export default function Translate() {
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = (inputText: string) => {
    setOriginalText(inputText);

    let isFollowingFrontRounded = false;
    let isFollowingFrontUnrounded = false;
    let current = "";
    let previous = "";
    const translated = inputText
      .split("")
      .map((element) => {
        previous = current;
        current = element;

        if (
          previous === "ү" ||
          previous === "ө" ||
          previous === "Ө" ||
          previous === "Ү"
        ) {
          isFollowingFrontRounded = true;
        }

        if (
          previous === "и" ||
          previous === "е" ||
          previous === "И" ||
          previous === "Е"
        ) {
          isFollowingFrontUnrounded = true;
        }

        if (previous === " " || previous === "-") {
          isFollowingFrontRounded = false;
          isFollowingFrontUnrounded = false;
        }

        if (element === "ь") return "";
        if (element === "Ь") return "";

        if (isFollowingFrontRounded || isFollowingFrontUnrounded) {
          if (element === "ү") return "u";
          if (element === "ө") return "o";
          if (element === "Ө") return "Oe";
          if (element === "Ү") return "Ue";
        }

        if (previous === " ") {
          return replacementMap[element] || element;
        } else {
          if (element === "е") return "e";
          if (element === "Е") return "E";
          return replacementMap[element] || element;
        }
      })
      .join("");
    setTranslatedText(translated);
  };

  return (
    <Group justify="center" align="start">
      <Textarea
        w="45%"
        value={originalText}
        onChange={(event) => handleTranslate(event.currentTarget.value)}
        autosize
      />
      <Textarea
        w="45%"
        value={translatedText}
        onChange={(event) => setTranslatedText(event.currentTarget.value)}
        autosize
      />
    </Group>
  );
}
