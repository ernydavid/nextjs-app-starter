import { Navbar } from '@/components/ui/marketing/navbar'

export default function Page () {
  return (
    <div className='w-full max-w-5xl mx-auto min-h-[calc(100dvh-48px)] flex flex-col justify-center items-center relative'>
      <Navbar />
      <h1>Pricing</h1>
    </div>
  )
}
