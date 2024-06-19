"use client";
import styles from "./styles.module.css";
import { FaTrash } from "react-icons/fa";
import { db } from "@/services/firebase.config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type CommentsSection = {
  taskId: string;
};

type CommentProps = {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
};

export function CommentsSection({ taskId }: CommentsSection) {
  const { data, status } = useSession();
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    async function loadComments() {
      const commentsRef = collection(db, "comments");
      if (!data?.user?.email) {
        return;
      }
      const firebaseQuery = query(commentsRef, where("taskId", "==", taskId));

      onSnapshot(firebaseQuery, (snapshot) => {
        let lista = [] as CommentProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
          });
        });
        setComments(lista);
      });
    }
    loadComments();
  }, [data?.user?.email]);

  return (
    <>
      {comments.map((item) => (
        <article key={item.id} className={styles.comment}>
          <div className={styles.headComment}>
            <label className={styles.commentsLabel}>{item.name}</label>
            <button className={styles.buttonTrash}>
              <FaTrash size={18} color="#EA3140" />
            </button>
          </div>
          <p>{item.comment}</p>
        </article>
      ))}
    </>
  );
}
