import { useState } from "react";
import { Button, Textarea, Text } from "@nextui-org/react";
import InputText from "../components/InputText";
import { setJson } from "../utils";

const styles = {
  container: { width: "100%", height: "100vh" },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "80%",
  },
  formGenerator: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    height: "100%",
  },
  textarea: {
    height: "100%",
    borderRadius: "20px",
    backgroundColor: "#242424",
    color: "#fafafa",
    padding: "10px",
    border: "0px",
    resize: "none",
  },
  form: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
};

function getColor(depth) {
  switch (depth) {
    case 0:
      return "#007f5f";

    case 1:
      return "#55a630";

    case 2:
      return "#aacc00";

    case 3:
      return "#ffa6c1";

    case 4:
      return "#56cfe1";

    case 5:
      return "#72efdd";

    case 6:
      return "#dddf00";

    case 7:
      return "#fafaff";

    case 8:
      return "#f72585";

    case 9:
      return "#ff570a";

    case 10:
      return "#ffc857";

    default:
      return "#fff";
  }
}

export default function Home() {
  const [dataJson, setDataJson] = useState("");
  const [fields, setFields] = useState({});

  function JsonDrawer(amount, label, json, depth) {
    return Object.keys(json).map((e, i) => {
      const propertyType = typeof json[e];

      if (propertyType.toString() === "object") {
        depth++;
        return JsonDrawer(
          amount + 0,
          label === "" ? e : label + "." + e,
          json[e],
          depth
        );
      } else {
        const labelText = `${label ? label + "." + e : e}`;
        const inputType = propertyType === "string" ? "text" : "number";

        function parser(value, type) {
          switch (type) {
            case "string":
              return value.toString();

            case "number":
              return value.includes(".")
                ? parseFloat(value.toString())
                : parseInt(value.toString());

            default:
              return value;
          }
        }

        return (
          <InputText
            stylest={{ paddingLeft: `${amount}px` }}
            key={labelText}
            label={labelText}
            initialValue={json[e]}
            onChange={(value) => {
              const jsonTemp = setJson(
                fields,
                labelText,
                parser(value, inputType)
              );
              setFields(jsonTemp);
              setDataJson(JSON.stringify(jsonTemp, null, 2));
            }}
            type={inputType}
            color={getColor(depth)}
          ></InputText>
        );
      }
    });
  }

  function handleGenerateForm() {
    setFields(JSON.parse(dataJson));
    setDataJson(JSON.stringify(JSON.parse(dataJson), null, 2));
  }

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          JSON
        </Text>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 -20%, $pink600 100%",
          }}
          weight="bold"
        >
          2
        </Text>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $yellow600 -20%, $red600 100%",
          }}
          weight="bold"
        >
          FORM
        </Text>
      </div>
      <div style={styles.containerGroup}>
        <div style={styles.formGenerator}>
          <Text
            h2
            size={20}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            Ingrese su JSON en el siguiente cuadro
          </Text>
          <textarea
            style={styles.textarea}
            value={dataJson}
            size={"lg"}
            onChange={(e) => {
              setDataJson(e.target.value);
            }}
            placeholder="Ingrese aqui el JSON"
          />
          <Button onClick={handleGenerateForm}>Generar formulario</Button>
        </div>
        <div style={styles.form}>
          {JsonDrawer(0, "", fields, 0)}
          <div style={styles.action}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(fields));
              }}
            >
              Copiar al portapapeles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
