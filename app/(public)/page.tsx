import { Navbar } from '@/app/(public)/_components/navbar'

export default function Home () {
  return (
    <div className='w-full min-h-dvh max-w-7xl mx-auto flex flex-col relative overflow-y-auto'>
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
