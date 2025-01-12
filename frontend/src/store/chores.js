import { csrfFetch } from "./csrf";

const SET_CHORES = "chores/setChores";
const ADD_CHORE = "chores/addChore";

const setAllChores = (payload) => ({
  type: SET_CHORES,
  payload,
});

const newChore = (payload) => ({
  type: ADD_CHORE,
  payload,
});

export const getAllChores = () => async (dispatch) => {
  const response = await csrfFetch("/api/chores");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      return;
    }

    dispatch(setAllChores(data));
  }
};

export const addChore = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/chores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(newChore(data));
    return data;
  }
};

const initialState = {};

function choresReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_CHORES:
      newState = {};
      console.log(action.chores);
      action.payload.Chores.forEach((chore) => (newState[chore.id] = chore));
      return newState;
    case ADD_CHORE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}

export default choresReducer;
