import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Pagina1 from './pagina1';
import Pagina2 from './pagina2'; // Import Pagina2
import mysql from 'mysql2/promise';

// Replace these with your actual database credentials
const dbConfig = {
  host: 'gldz1.dailyrazor.com',
  user: 'alsoft_portal',
  password: 'Etrust2011',
  database: 'alsoft_bitco',
};

let connection: mysql.Connection | null = null;
export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database!');
  }
  return connection;
}

export async function executeQuery(query: string) {
  const conn = await connectToDatabase();
  try {
    const [rows] = await conn.execute(query);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}


// Example usage:
async function sql1() {
  const connection = await connectToMySQL();
  try {
    // You can now execute queries using the connection
    // Example:
    const [rows] = await connection.execute('SELECT * FROM your_table');
    console.log('Data from table:', rows);
    // Close the connection when you're done
    await connection.end();
  } catch (error) {
    console.error('Error executing query:', error);
    await connection.end();
  }
}


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js on Replit!</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="/pagina1" className={styles.card}>
            <h2>Go to Pagina1 &rarr;</h2>
            <p>This is the link to the other page!</p>
          </a>

          <a href="/pagina2" className={styles.card}>
            <h2>Go to Mysql insert &rarr;</h2>
            <p>This is the link to the other page!</p>
          </a>

          <a href="/pagina3" className={styles.card}>
            <h2>Go to Mysql select &rarr;</h2>
            <p>This is the link to the other page!</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://docs.replit.com/category/deployments"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>After you are happy with this app, deploy it on Replit!</p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;