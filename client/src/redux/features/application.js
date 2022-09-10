const initialState = {
    signingUp: false,
    signingIn: false,
    error: null,
    token: localStorage.getItem("token")

}


export default function applicationReduser (state = initialState,action) {
    switch (action.type){
        case "application/signup/pending":
            return {
                ...state,
                signingUp: true,
                error: null
            }
        case "application/signup/fulfilled":
            return {
                ...state,
                signingUp: true,
            }
        case "application/signup/rejected":
            return {
                ...state,
                signingUp: false,
                error: action.error
            };
        case "application/signin/pending":
            return {
               ...state,
               error: null
            }
        case "application/signin/fulfilled":
            return {
                ...state,
                token: action.payload.token
            }
        case "application/singin/rejected":
            return {
                ...state,
                error: action.payload
            }
        case "logout":
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}

export const createUser = (password, fullName, gender, dateOfBirth,email, navigate) => {
    return async (dispatch) => {
        dispatch({ type: "application/signup/pending" });
        const res = await fetch("/register", {
            method: "POST",
            body: JSON.stringify({password, fullName, gender, dateOfBirth,email}),
            headers: {
                "Content-type": "application/json"
            }
            });
            const json = await res.json();
            if(json.error) {
               dispatch({type: "application/singup/rejected", error: json.error});
               throw new Error(json.error.message || "Что то пошло не так")
               } else {
                   dispatch({ type: "application/singup/rejected", payload: json})
                    navigate("/login")
                };
            };
        };
export const auth = (email, password,navigate) => {
    return async (dispatch) => {
        dispatch({type: "application/signin/pending"});
        const res = await fetch("/auth",{
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-type": "application/json",
            },
        });
        const json =  await res.json();
        if (json.error) {
            return  dispatch({ type: "application/singin/rejected", payload: json.error  })

        } else {
            dispatch({type: "application/signin/fulfilled", payload: json });
            localStorage.setItem("token", json.token);
            navigate("/current");
        }
    }
}

export const logout = (navigate) => {
    localStorage.removeItem("token")
    navigate("/");
    window.location.reload()
    return {
        type: "logout"
    }

}
