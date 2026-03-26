import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <h1 className="text-4xl font-semibold font-mono text-foreground">404</h1>
      <p className="text-muted-foreground text-sm">Page not found.</p>
      <Link
        to="/"
        className="text-primary text-sm font-mono hover:underline"
      >
        Back to Users
      </Link>
    </div>
  )
}
