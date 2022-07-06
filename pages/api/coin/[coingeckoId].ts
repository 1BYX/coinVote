// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coin, Vote } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'

type Data = {
  success: boolean
  coin?: Coin
  msg?: string
  vote?: Vote
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const { coingeckoId } = req.query
    console.log(coingeckoId)
    if (typeof coingeckoId === 'string') {
      const coin = await prisma.coin.findFirst({
        where: {
          coingeckoId: coingeckoId,
        },
      })
      if (!coin) {
        res.status(404).json({ success: false, msg: 'no coin with this name' })
      } else {
        res.status(200).json({ success: true, coin: coin })
      }
    } else {
    }
  } else if (req.method === 'POST') {
    const voteInDb = await prisma.vote.create({
      data: {
        votedBuyId: req.body.votedBuy,
        votedSellId: req.body.votedBuy,
        votedWaitId: req.body.votedWait,
      },
    })
    res.status(200).json({ success: true, vote: voteInDb })
  }
}
