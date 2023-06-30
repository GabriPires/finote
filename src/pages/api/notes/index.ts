import { NextApiRequest, NextApiResponse } from 'next'
import { BuildNextAuthOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    BuildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  try {
    const notes = await prisma.notes.findMany({
      where: {
        user_id: session.user.id,
      },
    })
    return res.status(200).json(notes)
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
