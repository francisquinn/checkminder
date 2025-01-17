import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsChecking } from "../features/core/coreSlice";

export function Footer() {
  const isChecking = useSelector(selectIsChecking);

  return (
    <>
      {!isChecking && (
        <nav>
          <ul>
            <li>
              <Link to="/checkminder/">
                <span className="icon icon-nav icon-list"></span>
              </Link>
            </li>
            <li>
              <Link to="/checkminder/settings">
                <span className="icon icon-nav icon-gear"></span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}