import React,{useState,useEffect} from 'react';
import BgImage from "./BgImage";
import { Helmet } from "react-helmet";
import { useDispatch,useSelector } from "react-redux";
import { postLogin } from "../store/asyncMethods/authMethods";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

 const Login = () => {
   const navigate = useNavigate();
   const[state, setState] = useState({
     email:'',
     password:''
   });

   /***call dispatch****/
    const dispatch = useDispatch(); 
  
  /***access current state using useSelector****/
  const {loginErrors,user} = useSelector((state)=>state.AuthReducer);

   /****handleInputs function****/
  const handleInputs = (e) => {
    setState({...state,[e.target.name] : e.target.value});//key value pair me sari values le li
  }

  /*****login*****/
  const userLogin = (e) => {
    e.preventDefault();
    dispatch(postLogin(state));
    //console.log(state);
  }

//Useeffecct hook
useEffect(()=>{
	if(loginErrors.length > 0){
		loginErrors.map((error) => toast.error(error.msg));
	}

},[loginErrors])

  return (
    <>
    <Helmet>
				<title>Login</title>
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
            <form onSubmit={userLogin}>
              <div className='group'>
                <h3 className='form-heading'>Login</h3>
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
										value={'LOGIN'}
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

export default Login;
