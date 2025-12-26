import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/private/$slug/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/private/$slug/edit"!</div>
}
