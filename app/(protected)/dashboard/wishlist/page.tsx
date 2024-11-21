export default async function Page () {
  // this simulated request server time
  // delete on production
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <div className='grid py-36 place-content-center place-items-center gap-2'>
      <h2>Content Wishlist</h2>
      <p>Here your wishlist content</p>
    </div>
  )
}
