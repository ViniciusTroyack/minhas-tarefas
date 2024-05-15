import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/firebase.config";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { redirect } from "next/navigation";
import { TextArea } from "@/components/textArea";

interface TaskPageProps {
  params: {
    id: string;
  };
}

interface TaskProsps {
  tarefa: string;
  public: boolean;
  createdDate: string;
  user: string;
  taskId: string;
}

export default async function Task(props: TaskPageProps) {
  const docRef = doc(db, "tarefas", props.params.id);
  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined || !snapshot.data()?.public) {
    redirect("/");
  }

  const task: TaskProsps = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    createdDate: new Date(
      snapshot.data()?.createdDate?.seconds * 1000
    ).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: props.params.id,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefa - Detalhes da tarefa</title>
      </Head>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.tarefa}</p>
        </article>
      </main>
      <section className={styles.commentsContainer}>
        <h2>Deixe aqui seu comentário</h2>
        <form>
          <TextArea placeholder="Digite seu comentário" />
          <button className={styles.button}>Comentar</button>
        </form>
      </section>
    </div>
  );
}
