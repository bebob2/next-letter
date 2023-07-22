'use client'

import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useToast } from './ui/use-toast'
import { SubscriptionPayload, subscriptionValidator } from '@/lib/validators'

type Props = {}

export const SubscribeForm = (props: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SubscriptionPayload>({
    resolver: zodResolver(subscriptionValidator),
  })

  const { toast } = useToast()

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
      await axios.post('/api/subscribe', data)
      reset()
      toast({
        title: 'You have subscribed ;)',
        description: 'Congrats! You have subscribed successfully :) ',
        variant: 'ok',
      })
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast({
          title: 'Subscription Failed :(',
          description: 'This E-Mail has already subscribed',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Subscription Failed :(',
          description:
            'An error occurred during the registration! Please try again later and check your E-Mail address.',
          variant: 'destructive',
        })
      }
    }
  })

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4 md:flex-row">
      <div>
        <Input type="email" placeholder="E-mail" {...register('email')} />
        {errors.email && (
          <div className="mt-1 text-red-500">{errors.email.message}</div>
        )}
      </div>
      <Button type="submit" className="bg-[#36405f]">
        Subscribe
      </Button>
    </form>
  )
}
