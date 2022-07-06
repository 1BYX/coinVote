import axios from 'axios'
import { prisma } from '../utils/prisma'

const doBackfill = async () => {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
  )

  const allCoins = res.data

  const formattedCoins = allCoins.map((c: any, index: number) => ({
    id: index + 1,
    coingeckoId: c.id,
  }))

  console.log('conis?', allCoins)

  const creation = await prisma.coin.createMany({
    data: formattedCoins,
  })

  console.log('Creation?', creation)
}

doBackfill()
