import { Link, Route, Routes } from "react-router-dom";
import { About } from "./routes/About";
import { Checklist } from "./routes/Checklist";
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
        <Route path="/:list_id" element={<Checklist />}></Route>
        <Route path="/:list_id/checker" element={<Checker />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  )
}