import { createRoot } from 'react-dom/client'
import { createElement } from "react"

/*                        1. create root                                            */
// const root = createRoot(document.getElementById('root'))
/*                      2. render                             */
// root.render(<h1>Hello react !!!!!</h1>)

// senarior of Composable & Declarative
// this is the reason we have jsx syntax 
const root = createRoot(document.getElementById("root"))
const reactElement = createElement("h1", null, "Hello from createElement!")
console.log(reactElement) // {type: 'h1', key: null, props: {children: 'Hello from createElement!'}, _owner: null, _store: {}}
root.render(
    reactElement
)
