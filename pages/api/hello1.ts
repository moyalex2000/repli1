// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
export const test1 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.query;
    res.status(200).json({ ret: '0' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
