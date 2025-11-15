import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="stylesheet" href="https://classless.de/classless.css"></link>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
