import { Text, Card } from "@mantine/core";
import { IconCheck, IconUserSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function ShowMyPostsInFilter() {
  const [isSelected, setIsSelected] = useState(false);
  const iconSize = 33;

  return (
    <Card
      w="fit-content"
      onClick={() => setIsSelected(!isSelected)}
      bd={
        isSelected
          ? "1.5px solid var(--mantine-color-blue-5)"
          : "1.5px solid transparent"
      }
      style={{ cursor: "pointer" }}
    >
      <Text mb="5px">Показать только мои объявления</Text>
      {isSelected ? (
        <IconCheck size={iconSize} color="var(--mantine-color-blue-5)" />
      ) : (
        <IconUserSearch color="var(--mantine-color-gray-5)" size={iconSize} />
      )}
    </Card>
  );
}
