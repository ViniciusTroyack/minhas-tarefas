import Head from "next/head";
import styles from "./styles.module.css";
import { db } from "@/services/firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { FormComments } from "@/components/formComments";
import { CommentsSection } from "@/components/commentsSection";

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

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
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
  const firebaseQuery = query(
    collection(db, "comments"),
    where("taskId", "==", props.params.id)
  );

  const snapshotComments = await getDocs(firebaseQuery);
  let allComments: CommentProps[] = [];
  snapshotComments.forEach((doc) => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId,
    });
  });

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
      <section className={styles.commentsContainer}>
        <h2>Comentário</h2>
        {allComments.length === 0 && (
          <span>Nenhum comentário foi encontrado...</span>
        )}
        <CommentsSection taskId={props.params.id} />
      </section>
    </div>
  );
}
