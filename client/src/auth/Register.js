import React,{useState,useEffect} from 'react';
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useDispatch,useSelector } from "react-redux";
import { postRegister } from "../store/asyncMethods/authMethods";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

 const Register = (props) => {
	 const navigate = useNavigate();
	 const[state,setState] = useState({
		 name:'',
		 email:'',
		 password:''
	 });

/***access current state using useSelector****/
const {loading,registerErrors,user} = useSelector((state)=>state.AuthReducer);

/***call dispatch****/
const dispatch = useDispatch(); 

/****handleInputs function****/
  const handleInputs = (e) => {
	setState({...state,[e.target.name] : e.target.value});//key value pair me sari values le li
  }


/***User Registration ****/
const userRegister = async (e) => {
	e.preventDefault();
	dispatch(postRegister(state));
	//console.log(state); // data humeara state me hota hai, header pass krnge
	// const config = {
	// 	headers:{
	// 		'Content-Type':'application/json',
	// 	}
	// };
	// /***Call dispatch and set true request send karne k phle lodaing ko true,resposne aane kk bad loading ko false set kar denge***/
	// dispatch({type:'SET_LOADER'});
	// try{
	// 	const response = await axios.post('http://localhost:5300/register',state,config);
	// 	dispatch({type:'CLOSE_LOADER'});
	// 	console.log(response);
	// 	dispatch({
	// 		type:'REGISTER_ERRORS',
	// 		payload:response.data.errors
	// 	});
	// } catch(error){
	// 	dispatch({type:'CLOSE_LOADER'});
	// 	dispatch({
	// 		type:'REGISTER_ERRORS',
	// 		payload:error.response.data.errors
	// 	});
	// 	console.log(error.response);
	// }
	
}
//Useeffecct hook
useEffect(()=>{
	if(registerErrors.length > 0){
		registerErrors.map((error) => toast.error(error.msg));
	}
	//agar user user ka token milta h to-- routelink bana kk dashboard ko dalanege to ye code likhne ki jaruat ni
	// if(user){
	// 	navigate("/dashboard");
	// }
},[registerErrors,user])

  return (
    <>
		<Helmet>
			<title>Register</title>
			<meta
				name='description'
				content='Learn HTML, CSS, JavaScript, React, Vue, Flutter etc'
			/>
		</Helmet>
      <div className='row mt-80'>
        <div className='col-8'>
          <div className='bgImage'>
            <BgImage />
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					style: {
						fontSize: '14px',
					},
				}}
			/>
          </div>
        </div>
        <div className='col-4'>
         <div className='account'>
          <div className='account__section'>
            <form onSubmit={userRegister}>
              <div className='group'>
                <h3 className='form-heading'>Register</h3>
              </div>
              <div className='group'>
					<input
						type='text'
						name='name'
						className='group__control'
						placeholder='Enter Name'
						value={state.name}
						onChange={handleInputs}
					/>
				</div>
                <div className='group'>
					<input
						type='email'
						name='email'
						className='group__control'
						placeholder='Enter Email'
						value={state.email}
						onChange={handleInputs}
					/>
				</div>
                <div className='group'>
					<input
						type='password'
						name='password'
						className='group__control'
						placeholder='Create Password'
						value={state.password}
						onChange={handleInputs}
					/>
				</div>
                <div className='group'>
					<input
						type='submit'
						className='btn btn-default btn-block'
						value={loading ? '..........' : 'REGISTER'}
					/>
				</div>
            </form>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default Register;
