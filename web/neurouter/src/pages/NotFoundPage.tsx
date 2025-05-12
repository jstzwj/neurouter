import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Button asChild>
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}
