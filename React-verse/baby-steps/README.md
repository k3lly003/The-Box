# React + Vite

### Why React
- Highest job demand
- Largest ecosystem
- Less "magic"
- Composable / Declarative
- Active developer (new versions with improved/simplified ways off writing codes)

### When you might not want a framework

- Small project
- Network load concerns
- Learning curve 
- Maintenance concerns
- Incompatibility with existing codebase


### React is Declarative while Vanilla js is Imperative
Leaning on the framework/library to do the heavylifting for us, & for us we write codes in a descriptive way(we describe & react handles the details on *how* to put those things on the page).

- Describe what you want to see 
- React will figure out how to get it

### This is a eg way of Imperative 
It's a must to write it this way

#### not like :
const h1 = document.createElement("h1").textContent="Hello create element"

#### But like :
const h1 = document.createElement("h1")
h1.textContent="Hello create element"
h1.className = "header"
document.getElementById("root").appendChild(h1)

### his is a eg way of Declarative

import { createRoot } from "react-dom/client"

const root = createRoot(document.getElementById("root"))

root.render(
    <h1>Hello exercise one</h1>
)

### The use of container that group jsx

#### When there is non                                                              ### When there is one
import { createElement } from "react"                                                      //
import { createRoot } from "react-dom/client"                                             //
const root = createRoot(document.getElementById("root"))                                 //
root.render(                                                                            //
    <img src="/src/assets/react-logo.png" />                                        <main>
    <h1>This is another element</h1>                                                  <img>...
)                                                                                   </main>

createElement()createElement()                                                      //


