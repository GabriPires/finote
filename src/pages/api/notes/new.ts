import { NextApiRequest, NextApiResponse } from 'next'
import { BuildNextAuthOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const newNoteBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
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

  const { title, description } = newNoteBodySchema.parse(req.body)

  try {
    const newNote = await prisma.notes.create({
      data: {
        title,
        description,
        user_id: session.user.id,
      },
    })

    return res.status(201).json({ id: newNote.id })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
