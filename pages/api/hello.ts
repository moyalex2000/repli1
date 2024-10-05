import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../utils/database'; // Import from utility

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const data = req.body;
    if (data.att1) {
      console.log(`Received att1: ${data.att1}`); 
      try {
        // Example: Insert data into a table
        const result = await executeQuery(
          `INSERT INTO t1 VALUES ('${data.att1}')`
        );
        res.status(200).json({ message: 'Data ['+data.att1+'] inserted successfully' });
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(400).json({ message: 'Please provide att1 in the request body.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}