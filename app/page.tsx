import styles from "./page.module.css";
import { LeadForm } from "./components/leads/form";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.topSection}>
        <div>
          <span className={styles.logoText}>alma</span>
          <h1 className={styles.mainText}>Get An Assessment<br /> Of Your Immigration Case</h1>
        </div>
      </section>
      <main className={styles.mainSection}>
        <div className={styles.formWrapper}>
          <h2>Want to understand your visa options?</h2>
          <p>Submit the form below and our team of
            experienced attorneys will review your
            information and send a preliminary assessment
            of your case based on your goals.
          </p>
          <LeadForm />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
