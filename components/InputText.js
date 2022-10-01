import { useEffect, useState } from "react";
import { Input, Text } from "@nextui-org/react";

export default function InputText({ label, initialValue, onChange, stylest, type, color }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "700px",
        minHeight: "60px",
        gap: "5px",
        ...stylest,
        paddingBottom:'10px'
      }}
    >
      <Text h4 css={{
            textGradient: color,
          }}>{label}</Text>
      <Input
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        rounded
        bordered
        value={value.toString()}
        placeholder={value.toString()}
        color="primary"
        type={type}
      ></Input>
    </div>
  );
}
