import React from 'react';
import { useSelector } from "react-redux";
import { Route, Navigate ,Outlet} from "react-router-dom";


const PrivateRoute = (props) => {
	const { user } = useSelector(state => state.AuthReducer);
	//check
	// return user ? (<Route exact={props.exact} path="props.path" element={props.element}></Route>) : 
	// (<Navigate to="/login" />)
	return user ? (<Outlet />) : 
	(<Navigate to="/login" />)
}

export default PrivateRoute;
