import { createStore,applyMiddleware,combineReducers  } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import { PostReducer,FetchPosts,FetchPost,UpdatePost,UpdateImage } from "./reducers/PostReducer";
import { updateName } from "./reducers/ProfileReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

//Combine kar diye reducers saare
const rootReducers = combineReducers({
    AuthReducer : AuthReducer,
    PostReducer : PostReducer,
    FetchPosts : FetchPosts,
    FetchPost : FetchPost,
    UpdatePost : UpdatePost,
    UpdateImage: UpdateImage,
    updateName : updateName,
});

//Suppose have multiple middleware to usko array me le liye aur spread operator se combine krke sare middleware applymiddleware me pas kare denge
const middlewares = [thunkMiddleware];
//const Store = createStore(rootReducers,applyMiddleware(thunkMiddleware));

/****create Store****/
const Store = createStore(rootReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
    );
export default Store;