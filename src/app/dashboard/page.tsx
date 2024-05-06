import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import styles from "./styles.module.css";
import Head from "next/head";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <h1>Painel</h1>
    </div>
  );
}
