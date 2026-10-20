import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/private/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/private/new"!</div>
}
