import styles from "./styles.module.css";
import Link from "next/link";
import { LoginBtn } from "../loginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/nextAuth";

export async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              Tarefas<span>+</span>
            </h1>
          </Link>
          {session?.user && (
            <Link href="/dashboard" className={styles.link}>
              Meu Painel
            </Link>
          )}
        </nav>
        <LoginBtn />
      </section>
    </header>
  );
}
