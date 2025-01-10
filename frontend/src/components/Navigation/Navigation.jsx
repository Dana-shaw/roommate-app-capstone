import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { GiKangaroo } from "react-icons/gi";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from '../SignupFormModal';
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  const home = () => {
    const path = `/`;
    navigate(path);
  };

  return (
    <nav className={!sessionUser ? "hidden" : "nav-container"}>
      <ul className="navigation">
        <li>
          <div className="logo-container" onClick={home}>
            <GiKangaroo />
            <h1>Roomease</h1>
          </div>
        </li>

        {isLoaded && (
          <div className="action-container">
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
