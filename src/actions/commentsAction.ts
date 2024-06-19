"use server";
import { db } from "@/services/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { authOptions } from "@/app/lib/nextAuth";
import { getServerSession } from "next-auth";

export async function addComment(FormData: FormData, taskId: string) {
  if (FormData.get("comment") == "") return;
  const session = await getServerSession(authOptions);
  try {
    await addDoc(collection(db, "comments"), {
      comment: FormData.get("comment"),
      createdDate: new Date(),
      user: session?.user?.email,
      name: session?.user?.name,
      taskId: taskId,
    });
  } catch (e) {
    console.log(e);
  }
}
