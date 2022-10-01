import { useEffect, useState } from "react";
import { Input, Text } from "@nextui-org/react";

export default function InputText({ label, initialValue, onChange, stylest }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        minHeight: "60px",
        padding: "10px",
        gap: "5px",
        ...stylest,
      }}
    >
      <Text>{label}</Text>
      <Input
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={value.toString()}
        placeholder={value.toString()}
      ></Input>
    </div>
  );
}
