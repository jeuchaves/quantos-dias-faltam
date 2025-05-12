import { BrowserRouter } from "react-router-dom"
import { Routing } from "./routes/Routing"

export const App = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  )
}