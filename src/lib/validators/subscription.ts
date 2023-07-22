import { z } from 'zod'

export const subscriptionValidator = z.object({
  email: z.string().email({ message: 'E-Mail is not valid!' }),
})

export type SubscriptionPayload = z.infer<typeof subscriptionValidator>
