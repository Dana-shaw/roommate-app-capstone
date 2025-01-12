import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { editChore } from "../../store/chores";


function EditChoreModal({chore}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState(chore.name);
  const [assignedTo, setAssignedTo] = useState(chore.assignedTo.id);
  const [dueDate, setDueDate] = useState(chore.dueDate);
  console.log(chore)


  const users = Object.values(useSelector((state) => state.users));
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      assignedTo,
      dueDate,
    };

    console.log(chore.id)

    dispatch(editChore(parseInt(chore.id), payload))
    closeModal()
  };

  return (
    <div id="new-chore-modal">
      <h1>Edit Chore</h1>
      <form onSubmit={handleSubmit} className="edit-chore-form">
        <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
        <select  onChange={(e) => setAssignedTo(parseInt(e.target.value))} >
        <option value="" key="">--Select who to assign to--</option>
          {Object.values(users).map((user) => (
          <option value={user.id} key={user.id}>{user.firstName} {user.lastName}</option>
        ))}
        </select>
        </div>
        <div>
        <label>Due Date (optional)</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} ></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditChoreModal;