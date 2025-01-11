import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi2";
import { HiOutlineMenu } from "react-icons/hi";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../../components/OpenModalButton";
import { CiSquarePlus } from "react-icons/ci";
import NewChoreModal from "../../components/NewChoreModal/NewChoreModal";


const CreateNewButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);


  const ulClassName = "add-new-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className="new-button">
        <CiSquarePlus className="sidebar-icon" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
          <div>
            <div>
              <OpenModalButton itemText="Add a Chore" modalComponent={<NewChoreModal/>}/>
            </div>
            <div>
              <p>Add an Expense</p>
            </div>
          </div>
      </ul>
    </>
  );
};

export default CreateNewButton;
