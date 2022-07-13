import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../utils/prisma'

type Data = {
  success: boolean
  coin?: any
  msg?: string
  vote?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { coingeckoId } = req.query
    console.log(coingeckoId)
    if (typeof coingeckoId === 'string') {
      const coin = await prisma.coin.findFirst({
        where: {
          coingeckoId: coingeckoId,
        },
        include: {
          votesBuy: true,
          votesSell: true,
          votesWait: true,
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
    if (req.body.voteCategory === 'buy') {
      try {
        const voteInDb = await prisma.voteBuy.create({
          data: { votedBuyId: req.body.coinId },
        })
        res.status(200).json({ success: true, vote: voteInDb })
      } catch (err) {
        console.error(err)
      }
    } else if (req.body.voteCategory === 'sell') {
      try {
        const voteInDb = await prisma.voteSell.create({
          data: { votedSellId: req.body.coinId },
        })
        res.status(200).json({ success: true, vote: voteInDb })
      } catch (err) {
        console.error(err)
      }
    } else if (req.body.voteCategory === 'wait') {
      try {
        const voteInDb = await prisma.voteWait.create({
          data: { votedWaitId: req.body.coinId },
        })
        res.status(200).json({ success: true, vote: voteInDb })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
