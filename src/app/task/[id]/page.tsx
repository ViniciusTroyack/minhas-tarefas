import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { FormComments } from "@/components/formComments";

interface TaskPageProps {
  params: {
    id: string;
  };
}

interface TaskProps {
  tarefa: string;
  public: boolean;
  createdDate: string;
  user: string;
  taskId: string;
}

export default async function Task(props: TaskPageProps) {
  const docRef = doc(db, "tarefas", props.params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists() || !snapshot.data()?.public) {
    redirect("/");
  }

  const data = snapshot.data();
  const task = {
    tarefa: data.tarefa,
    public: data.public,
    createdDate: new Date(data.createdDate.seconds * 1000).toLocaleDateString(),
    user: data.user,
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
          <p>{task?.tarefa}</p>
        </article>
      </main>
      <section className={styles.commentsContainer}>
        <h2>Deixe aqui seu comentário</h2>
        <FormComments taskId={task.taskId} />
      </section>
    </div>
  );
}
