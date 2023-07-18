import { NextApiRequest, NextApiResponse } from 'next'
import { BuildNextAuthOptions } from '../../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const removeNoteBodySchema = z.object({
  id: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
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

  console.log(req.query)

  const { id } = removeNoteBodySchema.parse(req.query)

  console.log(id)

  try {
    await prisma.entries.delete({
      where: {
        id,
      },
    })

    return res.status(202).end()
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
