## 1. app/hooks/ (The Data Fetchers)
This is the most important folder for your 90% dynamic content.

use-docs.ts: This should contain your Convex useQuery calls. Instead of calling Convex directly in a component, you call it here.

Example: export const useDocBySlug = (slug: string) => useQuery(api.docs.get, { slug });

use-scroll-spy.ts: Logic to detect which heading is currently in view (used by the Table of Contents).

## 2. app/components/ (The Display Logic)
   docs/: This is for components that require Convex data to function.

navbar.tsx: Likely contains your main navigation and the trigger for the search menu.

SidebarTree.tsx: Should fetch the list of all document titles/slugs from Convex to build the navigation tree.

ToC.tsx: (Table of Contents) Parses the current document's content to find headings.

ui/: Strictly for Shadcn. Do not put business logic here. If you need a custom button, build it in docs/ using the primitives from ui/.

layout.tsx: This is your "Shell." It defines where the Navbar and Sidebar sit relative to the main content area.

## 3. app/routes/ (The Entry Points)
   __root.tsx: Your global wrapper. Put your Layout, Navbar, and TanStackRouterDevtools here.

docs.$slug.tsx: The dynamic route. It reads the slug from the URL, passes it to your use-docs.ts hook, and renders the result.

index.tsx: Your landing page.

Refining the lib/ folder
I noticed in your image you still have logo.png and useScrollSpy.ts inside app/lib.

Move logo.png: Create an app/assets folder. Assets shouldn't live in the logic library.

Move useScrollSpy.ts: You already have a hooks folder—move it there to keep lib strictly for utility functions like utils.ts.

Search Integration (The 10% UI)
Since you're installing the Shadcn Search (Command) component:

Backend: Add a search index to your convex/schema.ts (as discussed previously).

Frontend: Create app/components/docs/search-menu.tsx.

Trigger: Place the search trigger (usually a button that says "Search... ⌘K") inside your navbar.tsx.