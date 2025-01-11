import { FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import CreateNewButton from "./CreateNewButton";
import { RxDashboard } from "react-icons/rx";
import { GiWashingMachine } from "react-icons/gi";
import { GiPiggyBank } from "react-icons/gi";

function Sidebar() {
  const [helpWithRefresh, setHelpWithRefresh] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
      <div className="sidebar-container">

          <CreateNewButton className="sidebar-icon"/>

          <RxDashboard className="sidebar-icon"/>

          <GiWashingMachine className="sidebar-icon"/>

        <GiPiggyBank className="sidebar-icon"/>

      </div>
  );
}

export default Sidebar;
