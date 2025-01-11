import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { CiCirclePlus } from "react-icons/ci";
import { GoCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import "./tile.css";



function Tile({chore}) {
    console.log(chore.assignedTo)
    return (
        <div className="tile">
            <div>
            <GoCircle />
            </div>
            <p>{chore.name}</p>
            <div className="actions">
                {/* <p>{chore.assignedTo}</p> */}
                {chore.dueDate? <p>Due {chore.dueDate}</p> : <></>}
            </div>
        </div>
    )
}

export default Tile;
