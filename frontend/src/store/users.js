const ALL_USERS = 'users/AllUsers'

const setAllUsers = payload => ({
    type: ALL_USERS,
    payload
})

export const getAllUsers = () => async dispatch => {
    const response = await fetch("/api/users");
    if (response.ok) {
		const data = await response.json();
        console.log(data)
		if (data.errors) {
			return;
		}

		dispatch(setAllUsers(data));
	}
}

const initialState = {}

function usersReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case ALL_USERS: 
        newState = {}
        action.payload.Users.forEach(user => newState[user.id] = user)
        return newState
        default:
            return state;
    }
}

export default usersReducer;