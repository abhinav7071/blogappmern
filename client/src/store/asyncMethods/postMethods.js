import axios from "axios";
import {SET_LOADER,CLOSE_LOADER,CREATE_POST, CREATE_ERRORS,REDIRECT_FALSE,REDIRECT_TRUE,SET_MESSAGE,REMOVE_MESSAGE,REMOVE_ERRORS,SET_POSTS,SET_POST,POST_REQUEST,POST_RESET,EDIT_ERRORS,SET_UPDATE_ERRORS,UPDATE_IMAGE_ERROR,SET_DETAILS,COMMENTS} from "../types/PostTypes";

//
//const token = localStorage.getItem('myToken');
export const createAction = (postData) => {
    return async (dispatch,getState) => {
        //const data = getState();
        //console.log('Your state is',data);
        const {AuthReducer: {token} } = getState();
        dispatch({type: SET_LOADER});
        try {
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
            //console.log(postData);
            const {data:{msg}}  = await axios.post('/create_post',postData,config);
            dispatch({type:CLOSE_LOADER});
            dispatch({type:REMOVE_ERRORS});
            dispatch({type:REDIRECT_TRUE});
            dispatch({type:SET_MESSAGE,payload:msg});//display success message
            //console.log(data);
        } catch (error) {
            //console.log(error.response.data);
            //console.log(error.response);
			//const { errors } = error.response.data;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: CREATE_ERRORS, payload: error.response.data });
           
        }
    }
}

//fetch all posts
export const fetchPosts = (id,page) => {
    return async (dispatch,getState) => {
        const {AuthReducer: {token} } = getState();
        dispatch({type:SET_LOADER});
        try {
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
            const {data:{response,count,perPage}}  = await axios.get(`/posts/${id}/${page}`,config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POSTS,payload:{response,count,perPage} });
            //console.log(response);
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }

}

//fetch single post
export const fetchPost = (id) => {
    return async (dispatch,getState) => {
        const {AuthReducer: {token} } = getState();
        dispatch({type:SET_LOADER});
        try {
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
            const {data:{post}}  = await axios.get(`/post/${id}`,config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_POST,payload:post });
            dispatch({ type: POST_REQUEST });
            //console.log(post);
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
        }
    }

}

//update post
export const updateAction = (editData) => {
    return async (dispatch,getState) => {
        const {AuthReducer: {token} } = getState();
        dispatch({type:SET_LOADER});
        try {
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
            const {data}  = await axios.post(`/update`,editData,config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
           // dispatch({ type: SET_MESSAGE,payload: data.msg });
            //console.log(post);
        } catch (error) {
            const { response :{ data: {errors},}, } = error;
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_UPDATE_ERRORS, payload:errors});
        }
    }

}

//update image
export const updateImageAction = (updateData) => {
	return async (dispatch, getState) => {
		const {
			AuthReducer: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { msg },
			} = await axios.post('/updateImage', updateData, config);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: REDIRECT_TRUE });
			dispatch({ type: SET_MESSAGE, payload: msg });
		} catch (error) {
			const {
				response: {
					data: { errors },
				},
			} = error;
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: UPDATE_IMAGE_ERROR, payload: errors });
		}
	};
};

//fetch post on home
export const homePosts = (page) => {
    return async(dispatch) => {
        try{
            const {data:{response,count,perPage}} = await axios.get(`/home/${page}`);
            dispatch({type:CLOSE_LOADER});
            dispatch({type:SET_POSTS,payload: {response, count, perPage } });
        } catch(error){
            dispatch({type:CLOSE_LOADER})
        }
    }
}

export const postDetails = (id) => {
	return async (dispatch) => {
		dispatch({ type: SET_LOADER });
		try {
			const {
				data: { post, comments },
			} = await axios.get(`/explore/${id}`);
			dispatch({ type: CLOSE_LOADER });
			dispatch({ type: SET_DETAILS, payload: post });
			dispatch({ type: COMMENTS, payload: comments });
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error);
		}
	};
};
export const postComment = (commentData) => {
	return async (dispatch, getState) => {
		const {
			AuthReducer: { token },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		dispatch({ type: SET_LOADER });
		try {
			const { data } = await axios.post('/comment', commentData, config);
			dispatch({ type: CLOSE_LOADER });
			console.log(data);
		} catch (error) {
			dispatch({ type: CLOSE_LOADER });
			console.log(error);
		}
	};
};

