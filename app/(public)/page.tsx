import { Navbar } from '@/components/ui/marketing/navbar'

export default function Home () {
  return (
    <div className='w-full max-w-7xl mx-auto min-h-[calc(100dvh-48px)] flex flex-col relative'>
      <Navbar />
      <div className='pt-12 flex-1 px-4 grid place-content-center place-items-center gap-4 text-center'>
        <h1>
          next started project app
        </h1>
        <p className='text-muted-foreground w-10/12'>Stack: NextJS 15, DrizzleORM, AuthJS, Neon DB, Tailwind, Stripe</p>
      </div>
    </div>
  )
}
