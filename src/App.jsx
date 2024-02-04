import { Link, Route, Routes } from "react-router-dom";
import { About } from "./routes/About";
import { List } from "./routes/List";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";

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
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/lists/:list_id" element={<List />}></Route>
        <Route path="/lists/:list_id/run" element={<Checker />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}