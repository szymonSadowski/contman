import { createFileRoute } from '@tanstack/react-router'
import { Stats } from '@/components/stats'
import { UsersTable } from '@/components/users-table'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">
            Users
          </h1>
        </div>
        <Stats />
      </div>
      <UsersTable />
    </>
  )
}
