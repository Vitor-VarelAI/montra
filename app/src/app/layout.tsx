import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Montra · VVarelAI",
  description: "Máquina de demos de redesign para outbound",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="bg-cream min-h-screen text-ink antialiased">{children}</body>
    </html>
  )
}
