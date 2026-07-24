import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import { Settings } from "./routes/Settings";
import { Checklist } from "./routes/Checklist";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'none' | 'fade-in' | 'fade-out'>('none');
  const isChecking = !!matchPath("/checkminder/:listId/checker", displayLocation.pathname);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fade-out');
    }
  }, [location, displayLocation]);

  function handleAnimationEnd(): void {
    if (transitionStage !== 'fade-out') return;
    setDisplayLocation(location);
    setTransitionStage('fade-in');
    window.scrollTo(0, 0);
  }

  return (
    <>
      <main style={isChecking ? { height: '100%' } : { height: 'auto' }}>
        <div className={`route-transition${transitionStage === 'none' ? '' : ' ' + transitionStage}`} onAnimationEnd={handleAnimationEnd}>
          <Routes location={displayLocation}>
            <Route path="/checkminder/" element={<Home />}></Route>
            <Route path="/checkminder/settings" element={<Settings />}></Route>
            <Route path="/checkminder/:listId" element={<Checklist />}></Route>
            <Route path="/checkminder/:listId/checker" element={<Checker />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </div>
      </main>
      <Footer isChecker={isChecking} />
    </>
  )
}