import axios from "axios";
import {SET_LOADER,CLOSE_LOADER,SET_TOKEN,REGISTER_ERRORS,LOGIN_ERRORS} from "../types/UserTypes";

//Register
export const postRegister = (state) => {
    //iss function k behind pe redux thunk middleware kaam krega aur thunk hume access deta h 
    // dispactch function ka..then rrtuen krenge another new function aur iss function mein dipatch recive krnge

    return async (dispatch) => {
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        };
        /***Call dispatch and set true request send karne k phle lodaing ko true,resposne aane kk bad loading ko false set kar denge***/
        dispatch({type:SET_LOADER});
        try{
            const {data} = await axios.post('http://localhost:5300/register',state,config);
            dispatch({type:CLOSE_LOADER});
            //console.log(response);
             /****set token in local storage****/
             localStorage.setItem('myToken',data.token);
            dispatch({
                type:SET_TOKEN,
                payload:data.token
                
            });
        } catch(error){
            dispatch({type:CLOSE_LOADER});
            dispatch({
                type:REGISTER_ERRORS,
                payload:error.response.data.errors
            });
            console.log(error.response);
        }
    }
}

//Login
export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        };

        try{
            dispatch({type:SET_LOADER});
            const {data} = await axios.post('/login',state,config);
            dispatch({type:CLOSE_LOADER});
            /****set token in local storage****/
            localStorage.setItem('myToken',data.token);
            dispatch({
                type:SET_TOKEN,
                payload:data.token 
            });

        } catch(error){
            dispatch({type:CLOSE_LOADER});
            dispatch({
                type:LOGIN_ERRORS,
                payload:error.response.data.errors
            });
        }

    }
}