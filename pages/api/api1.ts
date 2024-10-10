import type { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../utils/database';

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
      res.status(200).json({ message: `Data: ${data.att1}` });
    } else {
      res.status(400).json({ message: 'Please provide att1 in the request body.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}