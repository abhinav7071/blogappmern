import jwt_decode from "jwt-decode";
import {SET_LOADER,CLOSE_LOADER,SET_TOKEN,REGISTER_ERRORS, LOGOUT,LOGIN_ERRORS} from "../types/UserTypes";

//apna state define kiya: initial state define kiye,
const initState = {
    loading:false,
    registerErrors :[],
    loginErrors:[],
    token:'',
    user:'',
    LOGOUT,
    LOGIN_ERRORS,
}

/****verify token****/
const verifyToken = token =>{
    if(token){
        const decodeToken = jwt_decode(token);
        /***Check Token Expires or not in browser****/
        const expiresIn = new Date(decodeToken.exp * 1000);
        if(new Date() > expiresIn){
            //expire ho gya ho to remove ho jaye
            localStorage.removeItem('myToken');
            //iske baad null return krenge ye must h
            return null;
        } else {
            return decodeToken;
            // initState.token = token; //set token
            // const {user} = decodeToken; // set user decoded data in token in state, agr token milta hai to
            // initState.user = user;//set usr data in user in state
            // //console.log('roadies');
            // //console.log(user);
        }
    }
}
//Accesing token
const token = localStorage.getItem('myToken');
if(token){
    const decoded = verifyToken(token);
    if(decoded){
        initState.token = token;
        const {user} = decoded;
        initState.user = user;
    }
}


//console.log(decodeToken);

//ye two arguments lega state and action aur iss function me action ko evalaue krenge
const AuthReducer = (state = initState,action) => {
    if(action.type === SET_LOADER){
        return {...state,loading:true}
    } else if(action.type === CLOSE_LOADER){
        return {...state,loading:false}
    } else if(action.type === REGISTER_ERRORS){
        return {...state,registerErrors:action.payload}
    } else if(action.type === SET_TOKEN){
        const decoded = verifyToken(action.payload);
        const {user} = decoded;
        return {...state,token:action.payload,user:user,loginErrors:[],registerErrors:[]};
    } else if(action.type === LOGIN_ERRORS){
        return {...state,loginErrors:action.payload}
    } else if(action.type === LOGOUT){
        return {...state,token:'',user:''}//token and user data emplty kiya 
    } else {
        return state;
    }
    return state;
}

export default AuthReducer;