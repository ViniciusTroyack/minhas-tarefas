import { getServerSession } from "next-auth";
import { authOptions } from "./lib/nextAuth";
import styles from "./page.module.css";
import Image from "next/image";

import heroImg from "../../public/assets/hero.png";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className={styles.container}>
      <div className={styles.logoContent}>
        <Image
          className={styles.hero}
          alt="Logo Tarefas+"
          src={heroImg}
          priority
        />
      </div>
      <h1 className={styles.title}>
        Sistema feito para você organizar <br />
        seus estudos e tarefas
      </h1>

      <div className={styles.infoContent}>
        <section className={styles.box}>
          <span>+12 posts</span>
        </section>
        <section className={styles.box}>
          <span>+90 comentários</span>
        </section>
      </div>
    </main>
  );
}
