import { useState } from "react";
import { Button, Textarea, Text } from "@nextui-org/react";
import InputText from "../components/InputText";
import { setJson } from "../utils";

const styles = {
  container: { width: "100%", height:'100%' },
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
    height:'80%'
  },
  formGenerator: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    height: "100%",
  },
  textarea: {
    height: "500px",
  },
  form: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
};

export default function Home() {
  const [dataJson, setDataJson] = useState("");
  const [fields, setFields] = useState({});

  function JsonDrawer(amount, label, json) {
    console.log(Object.keys(json));
    return Object.keys(json).map((e, i) => {
      console.log("keys", json);
      const propertyType = typeof json[e];
      if (propertyType.toString() === "object") {
        return (
            JsonDrawer(
              amount + 0,
              label === "" ? e : label + "." + e,
              json[e]
            )
        );
      } else {
        const labelText = `${label ? label + "." + e : e}`;

        return (
          <InputText
            stylest={{ paddingLeft: `${amount}px` }}
            key={labelText}
            label={labelText}
            initialValue={json[e]}
            onChange={(value) => {
              const jsonTemp = setJson(fields, labelText, value);
              setFields(jsonTemp);
              setDataJson(JSON.stringify(jsonTemp, null, 2));
            }}
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
          to
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
          <Textarea
            value={dataJson}
            fullWidth={true}
            size={"lg"}
            onChange={(e) => {
              setDataJson(e.target.value);
            }}
            height={'500px'}
            placeholder="Ingrese aqui el JSON"
          />
          <Button onClick={handleGenerateForm}>Generar formulario</Button>
        </div>
        <div style={styles.form}>
          {JsonDrawer(0, "", fields)}
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
