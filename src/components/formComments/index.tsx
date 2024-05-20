"use client";
import { addComment } from "@/actions/commentsAction";
import { useSession } from "next-auth/react";
import { TextArea } from "../textArea";
import styles from "./styles.module.css";
import { useRef } from "react";

interface CommentFormProps {
  taskId: string;
}
export function FormComments(props: CommentFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addComment(formData, props.taskId);
        ref.current?.reset();
      }}
    >
      <TextArea name="comment" placeholder="Digite seu comentário" />
      <button disabled={!session?.user} className={styles.button}>
        Comentar
      </button>
    </form>
  );
}
