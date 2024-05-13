"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";

import styles from "./styles.module.css";
import { TextArea } from "@/components/textArea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import { db } from "@/services/firebase.config";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface TaskProps {
  id: string;
  createdDate: Date;
  public: boolean;
  tarefa: string;
  user: string;
}

export default function Dashboard() {
  const { data, status } = useSession();
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const tarefasRef = collection(db, "tarefas");
      const qr = query(
        tarefasRef,
        orderBy("createdDate", "desc"),
        where("user", "==", "troyackvinicius@gmail.com")
      );

      onSnapshot(qr, (snapshot) => {
        let lista = [] as TaskProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            createdDate: doc.data().createdDate,
            user: doc.data().user,
            public: doc.data().public,
          });
        });
        setTasks(lista);
      });
    }
    loadTasks();
  }, [data?.user?.email]);

  function handleChangePublic(e: ChangeEvent<HTMLInputElement>) {
    setPublicTask(e.target.checked);
  }

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();
    if (!input) {
      return alert("Insira uma tarefa");
    }

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        createdDate: new Date(),
        user: data?.user?.email,
        public: publicTask,
      });
      setInput("");
      setPublicTask(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleShare(id: string) {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/task/${id}`
    );
  }

  async function handleDeleteTask(id: string) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <form onSubmit={handleRegisterTask}>
              <TextArea
                placeholder="Digite sua tarefa..."
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />
              <div className={styles.checkBoxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa publica?</label>
              </div>
              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>
          {tasks.map((item) => (
            <article key={item.id} className={styles.task}>
              {item.public && (
                <div className={styles.tagContainer}>
                  <label className={styles.tag}>PUBLICO</label>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(item.id)}
                  >
                    <FiShare2 size={22} color="#3183ff" />
                  </button>
                </div>
              )}
              <div className={styles.taskContent}>
                {item.public ? (
                  <Link href={`/task/${item.id}`}>
                    <p>{item.tarefa}</p>
                  </Link>
                ) : (
                  <p>{item.tarefa}</p>
                )}

                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <FaTrash size={24} color="#ea3140" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
