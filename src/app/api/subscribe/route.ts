import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

type Body = { email: string }

const roundsOfHashing = 12

export async function POST(request: Request) {
  const body = (await request.json()) as Body

  const { email } = body

  try {
    const subscription = await prisma.subscription.create({
      data: {
        email,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // bla
      if (error.code === 'P2002') {
        return NextResponse.json(
          {
            message:
              'This E-Mail has already been registered! Please try another one.',
          },
          { status: 409 }
        )
      }
    }

    throw error
  }
}
