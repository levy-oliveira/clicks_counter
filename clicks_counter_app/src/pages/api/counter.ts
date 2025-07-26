import type { NextApiRequest, NextApiResponse } from 'next';

const countMap: Record<string, number> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { value } = req.body;

    if (typeof value !== 'string') {
      return res.status(400).json({ error: 'Valor inválido' });
    }

    countMap[value] = (countMap[value] || 0) + 1;

    return res.status(200).json({
      value,
      count: countMap[value],
    });
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
