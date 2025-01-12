import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { CiCirclePlus } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { GoCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import "./tile.css";
import OpenModalButton from "../OpenModalButton";
import EditChoreModal from "../EditChoreModal/EditChoreModal";
import { deleteChore } from "../../store/chores";

function Tile({ chore }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    await dispatch(deleteChore(chore.id));
  };

  return (
    <div
      className="tile-container"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <GoCircle />
      </div>
      <p>{chore.name}</p>

      {/* <p>{chore.assignedTo}</p> */}
      {chore.dueDate ? <p>Due {chore.dueDate}</p> : <></>}
      {hovered ? (
        <div className="actions">
          <OpenModalButton
            itemText={<FiEdit2 />}
            modalComponent={<EditChoreModal chore={chore} />}
          />
          <BsTrash3 style={{ color: "red" }} onClick={handleDelete} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tile;
