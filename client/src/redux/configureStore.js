import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger"
import  { userReduser } from "./features/users";
import applicationReduser from "./features/application";
const logger = createLogger({
    diff: true,
    collapsed: true
})
export const store = createStore(
    combineReducers({
        application: applicationReduser,
        users: userReduser
    }), composeWithDevTools(
        applyMiddleware(thunk, logger)
    )
);
