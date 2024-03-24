import { Route, Routes } from "react-router-dom";
import { Settings } from "./routes/Settings";
import { Checklist } from "./routes/Checklist";
import { Home } from "./routes/Home";
import { Error } from "./routes/Error";
import { Checker } from "./routes/Checker";
import { Footer } from "./components/Footer";
import { useState } from "react";

export default function App() {
    const [ isChecker, setIsChecker ] = useState(false);

    function handleFooterActions() {
        setIsChecker(isChecker => !isChecker);
    }

	return (
		<>
			<main style={isChecker ? { height: '100%' } : { height: 'auto' }}>
				<Routes>
					<Route path="/checkminder/" element={<Home />}></Route>
					<Route path="/checkminder/settings" element={<Settings />}></Route>
					<Route path="/checkminder/:list_id" element={<Checklist />}></Route>
					<Route path="/checkminder/:list_id/checker" element={<Checker handleFooterActions={handleFooterActions} />}></Route>
					<Route path="*" element={<Error />}></Route>
				</Routes>
			</main>
			<Footer isChecker={isChecker} />
		</>
	)
}