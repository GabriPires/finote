import { NextApiRequest, NextApiResponse } from 'next'
import { BuildNextAuthOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const newEntryBodySchema = z.object({
  title: z.string(),
  value: z.coerce.number(),
  type: z.string(),
  noteId: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
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

  const { title, value, type, noteId } = newEntryBodySchema.parse(req.body)

  try {
    await prisma.entries.create({
      data: {
        title,
        value: value * 100,
        type,
        note_id: noteId,
      },
    })

    return res.status(201).end()
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
