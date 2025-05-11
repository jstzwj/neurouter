import Link from "next/link"
import { DiscIcon as Discord, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">© 2023 – {currentYear} NeuroRouter, Inc</div>

        <div className="flex items-center gap-4">
          <Link href="#" className="size-8 flex items-center justify-center rounded-md hover:bg-muted">
            <Discord className="h-5 w-5" />
            <span className="sr-only">Discord</span>
          </Link>
          <Link href="#" className="size-8 flex items-center justify-center rounded-md hover:bg-muted">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="size-8 flex items-center justify-center rounded-md hover:bg-muted">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="size-8 flex items-center justify-center rounded-md hover:bg-muted">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link href="/status" className="text-muted-foreground hover:text-foreground">
            Status
          </Link>
          <Link href="/announcements" className="text-muted-foreground hover:text-foreground">
            Announcements
          </Link>
          <Link href="/partners" className="text-muted-foreground hover:text-foreground">
            Partners
          </Link>
          <Link href="/careers" className="text-muted-foreground hover:text-foreground">
            Careers
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
