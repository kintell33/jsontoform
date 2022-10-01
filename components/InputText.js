import { useEffect, useState } from "react";
import { Input, Text, Avatar } from "@nextui-org/react";

export default function InputText({
  label,
  initialValue,
  onChange,
  stylest,
  type,
  color,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function isUrl(val) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      val.toString()
    );
  }

  function getPaddingTitleInUrl(val) {
    if (isUrl(val)) return "60px";
    return "0px";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "700px",
        minHeight: "60px",
        gap: "5px",
        ...stylest,
        paddingBottom: "10px",
      }}
    >
      <Text
        h4
        css={{
          textGradient: color,
          paddingLeft: getPaddingTitleInUrl(value.toString()),
        }}
      >
        {label}
      </Text>
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
      {isUrl(value.toString()) && (
        <Avatar
          style={{ position: "relative", top: "-95px" }}
          src={value.toString()}
        ></Avatar>
      )}
    </div>
  );
}
