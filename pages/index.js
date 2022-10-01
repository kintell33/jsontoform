import { useState } from "react";
import { Button, Text, User, Loading, Switch } from "@nextui-org/react";
import InputText from "../components/InputText";
import { setJson } from "../utils";
import Link from "next/link";

const styles = {
  container: { width: "100%", height: "100vh" },
  title: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    width: "100%",
    justifyContent: "left",
    alignItems: "center",
    overflow: "auto",
    maxHeight: "100%",
    paddingLeft: "10px",
  },
  action: {
    position: "fixed",
    top: "85vh",
    right: "100px",
  },
  footer: {
    position: "fixed",
    top: "94vh",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
};

function getColor(depth) {
  return "45deg, $yellow600 -20%, $red600 100%";
}

export default function Home() {
  const [dataJson, setDataJson] = useState("");
  const [fields, setFields] = useState(null);

  function JsonDrawer(amount, label, json, depth) {
    if (!fields)
      return (
        <Loading
          style={styles.loading}
          color="secondary"
          textColor="secondary"
          size="xl"
        >
          Waiting for your JSON
        </Loading>
      );
    return Object.keys(json).map((e, i) => {
      const propertyType = typeof json[e];

      if (propertyType.toString() === "object") {
        depth++;
        return JsonDrawer(
          amount + 20,
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
          <>
            {propertyType === "boolean" && (
              <div key={labelText} style={{ paddingLeft: `${amount}px` }}>
                <Text
                  h4
                  css={{
                    textGradient: getColor(depth),
                  }}
                >
                  {labelText}
                </Text>
                <Switch
                  checked={json[e]}
                  onChange={(e) => {
                    const jsonTemp = setJson(
                      fields,
                      labelText,
                      parser(e.target.checked, propertyType)
                    );
                    setFields(jsonTemp);
                    setDataJson(JSON.stringify(jsonTemp, null, 2));
                  }}
                ></Switch>
              </div>
            )}
            {propertyType === "string" && (
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
            )}
            {propertyType === "number" && (
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
            )}
          </>
        );
      }
    });
  }

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function handleGenerateForm() {
    if (isJsonString(dataJson)) {
      setFields(JSON.parse(dataJson));
      setDataJson(JSON.stringify(JSON.parse(dataJson), null, 2));
    } else {
    }
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
            Insert your JSON in the text area
          </Text>
          <textarea
            style={styles.textarea}
            value={dataJson}
            size={"lg"}
            onChange={(e) => {
              setDataJson(e.target.value);
            }}
            placeholder='{"name":"","lastname":"","age":30}'
          />

          <Button
            size="lg"
            shadow
            color="primary"
            disabled={!isJsonString(dataJson)}
            onClick={handleGenerateForm}
          >
            {isJsonString(dataJson) ? "Generate form" : "Invalid JSON for now"}
          </Button>
        </div>
        <div style={styles.form}>
          {JsonDrawer(0, "", fields, 0)}
          <div style={styles.action}>
            {fields && (
              <Button
                shadow
                color="secondary"
                size="lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(fields, null, 2)
                  );
                }}
              >
                Copiar al portapapeles
              </Button>
            )}
          </div>
        </div>
      </div>
      <div style={styles.footer}>
        <Link href="https://github.com/kintell33">
          <a target="_blank">
            <User
              bordered
              color="primary"
              src="https://avatars.githubusercontent.com/u/5826753?v=4"
              name="by Kintell33"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
