import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // Handle GET requests
    const data = req.query;
    console.log("["+data+"]")
    if (data.att1) {
      try {
        const parsedJson = JSON.parse(data.att1);
        if (parsedJson.att1) {
          console.log(`Received att1: ${parsedJson.att1}`); 
          res.status(200).json({ message: `You sent att1: ${parsedJson.att1}` });
        } else {
          res.status(400).json({ message: 'Please provide att1 in the JSON data.' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Invalid JSON format.' });
      }
    } else {
      res.status(400).json({ message: 'Please provide JSON data in the query string.' });
    }
  } else {
    // Handle POST requests (same as before)
    const data = req.body;
    if (data.att1) {
      console.log(`Received att1: ${data.att1}`);
      res.status(200).json({ message: `esto recivi: ${data.att1}` });
    } else {
      res.status(400).json({ message: 'Please provide att1 in the request body.' });
    }
  }
}