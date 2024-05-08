import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import styles from "./styles.module.css";
import Head from "next/head";
import { TextArea } from "@/components/textArea";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <form>
              <TextArea placeholder="Digite sua tarefa..." />
              <div className={styles.checkBoxArea}>
                <input type="checkbox" className={styles.checkbox} />
                <label>Deixar tarefa publica?</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
