import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'
import { string } from 'zod'

type Props = {
  params: {
    subscriptionId: string
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const { subscriptionId } = params

  try {
    const subscription = await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          'Error during un-subscription! NOTE: You are maybe still subscribed!',
      },
      { status: 409 }
    )
  }
}
