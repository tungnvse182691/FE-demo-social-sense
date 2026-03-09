import type { Metadata } from 'next'
import { Afacad } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const afacad = Afacad({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-afacad',
})

export const metadata: Metadata = {
  title: 'SocialSense.vn — Social Media Analytics & AI Content',
  description: 'Vietnamese social media analytics, scheduling, and AI content tool.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${afacad.className} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
