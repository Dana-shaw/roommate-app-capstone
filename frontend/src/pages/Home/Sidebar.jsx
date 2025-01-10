import { FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Sidebar() {
    const [helpWithRefresh, setHelpWithRefresh] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    const ulRef = useRef()
    let navigate = useNavigate()
    // const recentAlbumRef = useRef(null);
    let dispatch = useDispatch()


    useEffect(() => {

    }, [dispatch]);



    let refresh = () => {
        setHelpWithRefresh(prev => prev + 1)
    }


    const toggleMenu = (e) => {
        e.stopPropagation();
    };


    useEffect(() => {

    }, [])


    let handleClick = (id) => {


    };


    return (
        <>
            <div className="head-container">
                <div className="side-head">
                    <h3>Sidebar</h3>

                </div>
            </div>
        </>
    )
}

export default Sidebar;
