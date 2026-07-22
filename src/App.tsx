import { Route, Routes, useMatch } from "react-router-dom";
import { Settings } from "./routes/Settings";
import { Checklist } from "./routes/Checklist";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";

export default function App() {
  const isChecking = useMatch("/checkminder/:listId/checker");

  return (
    <>
      <main style={isChecking ? { height: '100%' } : { height: 'auto' }}>
        <Routes>
          <Route path="/checkminder/" element={<Home />}></Route>
          <Route path="/checkminder/settings" element={<Settings />}></Route>
          <Route path="/checkminder/:listId" element={<Checklist />}></Route>
          <Route path="/checkminder/:listId/checker" element={<Checker />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </main>
    </>
  )
}