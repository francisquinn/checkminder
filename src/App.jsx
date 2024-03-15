import { Link, Route, Routes } from "react-router-dom";
import { Settings } from "./routes/Settings";
import { Checklist } from "./routes/Checklist";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/checklist" element={<Home />}></Route>
          <Route path="/checklist/settings" element={<Settings />}></Route>
          <Route path="/checklist/:list_id" element={<Checklist />}></Route>
          <Route path="/checklist/:list_id/checker" element={<Checker />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </main>
      <nav>
          <ul>
            <li>
              <Link to="/checklist">
                <span className="icon icon-nav icon-list"></span>
              </Link>
            </li>
            <li>
              <Link to="/checklist/settings">
                <span className="icon icon-nav icon-gear"></span>
              </Link>
            </li>
          </ul>
        </nav>
    </>
  )
}