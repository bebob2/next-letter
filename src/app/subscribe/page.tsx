import Image from 'next/image'
import logo from '@/images/bebob2.png'
import { Bebas_Neue } from 'next/font/google'
import { cn } from '@/utils'

import { SubscribeForm } from '@/components/subscribeForm'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
})

type Props = {}

export default function Subscribe({}: Props) {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-800 via-cyan-700 to-cyan-600">
      <main className="container p-0 md:my-20 ">
        <div className="mx-auto flex flex-col   items-center rounded-2xl bg-[#0f0f0f] p-8 shadow-xl md:w-2/3">
          <div className="flex flex-row items-center justify-center gap-8">
            <Image
              src={logo}
              alt="Logo"
              className="h-20 w-20 lg:h-32 lg:w-32"
            />
            <h1
              className={cn(
                bebasNeue.className,
                'pt-4  text-5xl text-[#36405f] lg:text-9xl'
              )}
            >
              Newsletter
            </h1>
          </div>
          <div className=" px-8 py-12 text-xl font-bold text-neutral-400">
            <p>Hello, This is the official bebob2 Newsletter!</p>
            <p>
              It's a weekly Newsletter containing the lates news & more all
              about tech.
            </p>
            <p>So subscribe in order for you not to miss any single update!</p>
            <p className="mt-4">See you there ;)</p>
          </div>

          <SubscribeForm />
          <p className="px-8 py-12  font-semibold text-neutral-400">
            I respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </main>
    </div>
  )
}
