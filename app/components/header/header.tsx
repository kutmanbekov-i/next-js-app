"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

import styles from './header.module.css';

export default function Header() {
  const { isAuthenticated, signIn, signOut } = useAuth();

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/leads">Leads</Link>
              </li>
              <li>
                <button onClick={signOut} className={styles.signOutBtn}>Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={signIn} className={styles.signInBtn}>Sign In</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
