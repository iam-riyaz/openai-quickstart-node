import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: queryInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
          console.log({data})
      setResult(data.result);
      setQueryInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/wb_gpt.png" />
      </Head>

      <main className={styles.main}>
        <img src="/wb_gpt.png" className={styles.icon} />
        <h3>Write your query here</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Type Anything "
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
