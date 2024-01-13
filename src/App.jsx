import { Link, Route, Routes } from "react-router-dom";
import { About } from "./routes/About";
import { List } from "./routes/List";
import { Lists } from "./routes/Lists";
import { Error } from "./routes/Error";

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Lists</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Lists />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/lists/:id" element={<List />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}