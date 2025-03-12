import { Text, Card, CardProps, Switch } from "@mantine/core";
import { IconCheck, IconUserSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function ShowMyPostsInFilter(props: CardProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Card
      onClick={() => setIsSelected(!isSelected)}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <Text mb={14} fw="500">
        Показать только мои объявления
      </Text>
      <Switch
        checked={isSelected}
        style={{ pointerEvents: "none" }}
        size="md"
      />
    </Card>
  );
}
