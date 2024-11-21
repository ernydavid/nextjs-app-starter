import type { MetadataRoute } from 'next'

export default function manifest (): MetadataRoute.Manifest {
  return {
    name: 'Next Started App',
    short_name: 'NextJS Started',
    description: 'NextJS started template app',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#4A6DA7',
    theme_color: '#4A6DA7',
    icons: [
      {
        src: '/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
