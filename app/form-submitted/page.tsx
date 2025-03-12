import Link from 'next/link';
import styles from './page.module.css';

export default function ThankYouPage() {
  return (
    <main className={styles.container}>
      <h1>Thank you!</h1>
      <p>Your information was submitted to our team of immigration attorneys. <br />Expect an email from <strong>hello@email.ai</strong>.</p>
      <Link href="/" className={styles.button}>
        Go back to homepage
      </Link>
    </main>
  );
}
