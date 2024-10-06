import type { NextApiRequest, NextApiResponse } from 'next'
import { executeQuery } from '../../utils/database'; // Import from utility
import { Console } from 'console';


type Data = {
  message: string
  result: Array<string>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    // Handle GET requests
    const data = req.query;
    //console.log("["+data+"]")
    if (data.att1) {
      try {
        const parsedJson = JSON.parse(data.att1);
        if (parsedJson.att1) {
          console.log(`Received att1: ${parsedJson.att1}`); 
          console.log("hola")
          res.status(200).json({ message: `You sent att1: ${parsedJson.att1}`,result:[] });
        } else {
          res.status(400).json({ message: 'Please provide att1 in the JSON data.',result:[] });
        }
      } catch (error) {
        res.status(400).json({ message: 'Invalid JSON format.' ,result:[]});
      }
    } else {
      res.status(400).json({ message: 'Please provide JSON data in the query string.' ,result:[]});
    }
  } else {
    // Handle POST requests (same as before)
    console.log("api hello1")
    const data = req.body;
    if (data.att1) {
      console.log(`Received att1: ${data.att1}`);
      let result = []; // Declare result outside the try block
      try {
        // Example: Select data from a table
        result = await executeQuery(
          //`SELECT * FROM t1 WHERE id = ${data.att1}` // Assuming 'att1' is an ID
          `SELECT * FROM t1` // Assuming 'att1' is an ID
        );
        console.log(result)
      } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error',result:[] });
      }
      console.log("enviando resultados")
      console.log(result)
      res.status(200).json({ message: 'Data selected successfully', result: result });
    } else {
      res.status(400).json({ message: 'Please provide att1 in the request body.',result:[] });
    }
  }
}