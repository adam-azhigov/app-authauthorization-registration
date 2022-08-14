const initialState = {
    items: [],
    loading: false,
    currentUser: {},

}

export  const userReduser = (state= initialState, action) => {
    switch (action.type) {
        case "users/load/pending":
            return {
                ...state,
                loading: true,
            };
        case "users/load/fulfilled":
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case "userCurrent/load/pending":
            return {
                ...state,
                loading: true,
            };
        case "userCurrent/load/fulfilled":
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            }
        case "user/edit/pending":
            return {
                ...state,
            };
        case "user/edit/fulfilled":
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            ...action.payload.data,
                        }
                    }
                    return item
                })
            }
        default:
            return state
    }
}

export const loadUserAll = () => {
        return async (dispatch) => {
            dispatch({type: "users/load/pending"});

            const res = await fetch("/users");

            const json = await res.json();
            dispatch({type: "users/load/fulfilled", payload: json})
        }
}

export const loadUserCurrent = () => {
    return async (dispatch, getState ) => {
        dispatch({ type: "userCurrent/load/pending" });
        const state = getState();
        const res = await fetch("http://localhost:4000/auth/me",{
            headers: {
                Authorization: `Bearer ${state.application.token}`,
            }
        });
        const json = await res.json();
        dispatch({type: "userCurrent/load/fulfilled", payload: json})
    }
}

export const editUser = (id,data) => {
    return async (dispatch,getState) => {
        dispatch ({type: "user/edit/pending"});

        const state = getState();
        await fetch("/account", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${state.application.token}`,
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
                fullName: data.name,
                email: data.email,
                password: data.password
            }),

        })
        console.log(data.password)
        dispatch ({type: "user/edit/fulfilled", payload: {id, data}})
    }
}

