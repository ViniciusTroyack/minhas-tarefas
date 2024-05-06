"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css";

export function LoginBtn() {
  const { data, status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <button
          className={styles.loginButton}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Acessar
        </button>
      ) : (
        <button className={styles.loginButton} onClick={() => signOut()}>
          {data?.user?.name}
        </button>
      )}
    </>
  );
}
