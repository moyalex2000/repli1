import mysql from 'mysql2/promise';

// Replace with your actual database credentials
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