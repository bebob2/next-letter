import { prisma } from '@/lib/prisma'
import { subscriptionValidator } from '@/lib/validators'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const { email } = subscriptionValidator.parse(body)

    const subscription = await prisma.subscription.create({
      data: {
        email,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map((issue) => issue.message)

      return NextResponse.json({ messages }, { status: 422 })
    }
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
