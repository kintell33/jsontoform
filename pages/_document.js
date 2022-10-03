import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head title="JSON2FORM">
          <meta property="og:title" content="JSON2FORM"></meta>
          <meta property="og:url" content="https://www.json2form.com" />{" "}
          <meta
            property="og:description"
            content="JSON2FORM is a web application that allow you to paste your json and edit in a form without complications"
          />
          <meta property="og:image" content={"https://imgur.com/uB8QEVq"} />
          <meta property="og:type" content="website" /> {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
