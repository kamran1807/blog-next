import Navbar from "./components/Navbar";
import "./globals.css"

export const metadata = {
  title: "Blog Application",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
