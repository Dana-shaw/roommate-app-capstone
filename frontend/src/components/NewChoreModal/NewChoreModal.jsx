import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { addChore } from "../../store/chores";


function NewChoreModal({}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");


  const users = Object.values(useSelector((state) => state.users));
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      assignedTo,
      dueDate,
    };

    dispatch(addChore(payload))
    closeModal()
  };

  return (
    <div id="new-chore-modal">
      <h1>New Chore</h1>
      <form onSubmit={handleSubmit} className="new-chore-form">
        <div>
        <input type="text" placeholder="What's needs to be done?" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
        <select onChange={(e) => setAssignedTo(e.target.value)} placeholder="">
        <option value="" key="">--Select who to assign to--</option>
          {Object.values(users).map((user) => (
          <option value={user.id} key={user.id}>{user.firstName} {user.lastName}</option>
        ))}
        </select>
        </div>
        <div>
        <label>Due Date (optional)</label>
        <input type="date" onChange={(e) => setDueDate(e.target.value)} ></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewChoreModal;