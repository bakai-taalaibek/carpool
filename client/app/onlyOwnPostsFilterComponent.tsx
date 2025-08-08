import { Card, CardProps, Switch, Text } from "@mantine/core";
import { useEffect, useState } from "react";

type TProps = {
  value?: boolean;
  onChange?: (arg: boolean) => void;
} & CardProps;

export default function OnlyOwnPostsFilterComponent({
  value,
  onChange,
  ...props
}: TProps) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => setIsSelected(value ?? isSelected), [value]);

  return (
    <Card
      onClick={() => {
        onChange && onChange(!value);
        setIsSelected(!isSelected);
      }}
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
