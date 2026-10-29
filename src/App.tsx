import { Route, Routes, matchPath, useLocation } from "react-router-dom";
import { Settings } from "./routes/Settings";
import { Checklist } from "./routes/Checklist";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";
import { Footer } from "./components/Footer";
import { CSSProperties, useEffect, useState } from "react";
import { getTransitionOrigin } from "./features/transitionOrigin";

const CHECKER_PATH = "/checkminder/:listId/checker";

type TransitionStage =
  | "none"
  | "fade-out"
  | "fade-in"
  | "circle-forward"
  | "circle-backward";

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] =
    useState<TransitionStage>("none");
  const [circleOrigin, setCircleOrigin] = useState(getTransitionOrigin());
  const isChecking = !!matchPath(CHECKER_PATH, displayLocation.pathname);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    const toChecker = !!matchPath(CHECKER_PATH, location.pathname);
    const fromChecker = !!matchPath(CHECKER_PATH, displayLocation.pathname);

    if (toChecker && !fromChecker) {
      setCircleOrigin(getTransitionOrigin());
      setDisplayLocation(location);
      setTransitionStage("circle-forward");
      window.scrollTo(0, 0);
    } else if (fromChecker && !toChecker) {
      setTransitionStage("circle-backward");
    } else {
      setTransitionStage("fade-out");
    }
  }, [location, displayLocation]);

  function handleAnimationEnd(): void {
    if (transitionStage === "fade-out") {
      setDisplayLocation(location);
      setTransitionStage("fade-in");
      window.scrollTo(0, 0);
    } else if (transitionStage === "circle-backward") {
      setDisplayLocation(location);
      setTransitionStage("none");
      window.scrollTo(0, 0);
    } else if (
      transitionStage === "circle-forward" ||
      transitionStage === "fade-in"
    ) {
      setTransitionStage("none");
    }
  }

  const isCircleTransition =
    transitionStage === "circle-forward" ||
    transitionStage === "circle-backward";
  const circleStyle = isCircleTransition
    ? ({
        "--origin-x": `${circleOrigin.x}px`,
        "--origin-y": `${circleOrigin.y}px`,
        "--end-radius": `${circleOrigin.radius}px`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      <main style={isChecking ? { height: "100%" } : { height: "auto" }}>
        <div
          className={`route-transition${transitionStage !== "none" ? " " + transitionStage : ""}${isChecking ? " is-checker" : ""}`}
          style={circleStyle}
          onAnimationEnd={handleAnimationEnd}
        >
          <Routes location={displayLocation}>
            <Route path="/checkminder/" element={<Home />}></Route>
            <Route path="/checkminder/settings" element={<Settings />}></Route>
            <Route path="/checkminder/:listId" element={<Checklist />}></Route>
            <Route
              path="/checkminder/:listId/checker"
              element={<Checker />}
            ></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </div>
      </main>
      <Footer isChecker={isChecking} />
    </>
  );
}
