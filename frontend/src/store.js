import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import monitorReducersEnhancer from "./enhancer/monitorReducer";
// import loggerMiddleware from "./middleware/logger";
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducers";
import { getPostReducer } from "./reducers/postReducers";
import { employerReducer } from "./reducers/employerReducers";
import { talentReducer } from "./reducers/talentReducers";

// const middlewares = [loggerMiddleware, thunk];
const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

// const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getPosts: getPostReducer,
  employerInfo: employerReducer,
  talentInfo: talentReducer,
});

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    // isEmployerProfileComplete: localStorage.getItem(
    //   "isEmployerProfileComplete"
    // ),
    // isTalentProfileComplete: localStorage.getItem("isTalentProfileComplete"),
  },
};

const store = createStore(reducer, initialState, composedEnhancers);

export default store;
