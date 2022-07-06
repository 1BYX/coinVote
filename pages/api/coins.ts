// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'
import { prisma } from '../../utils/prisma'

type Data = {
  success: boolean
  coins?: Array<{}>
  msg?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const allCoins = await prisma.coin.findMany({})
    if (!allCoins)
      res
        .status(500)
        .json({ success: false, msg: 'internal server error, no coins found' })
    res.status(200).json({ success: true, coins: allCoins })
  }
}
