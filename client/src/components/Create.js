import React,{useState,useEffect} from 'react';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import {createAction} from "../store/asyncMethods/postMethods";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from './Loader';
//
 const Create = () => {
	 const navigate = useNavigate();
	 /***access form error****/
	  const {createErrors ,redirect,loading} = useSelector(state => state.PostReducer);
	 /****image name set karne k liye image select krete hi****/
	const[currentImage,setCurrentImage] = useState('Choose Image');

	/***image preview****/
	const [imagePreview, setImagePreview] = useState('');

	/***For reducx****/
	const dispatch = useDispatch();

	//aaccess uder data
	const {user : {_id,name}} = useSelector((state) => state.AuthReducer);
	//console.log(user);
	//const {_id,name} = user;
	//console.log(_id,name);

	/***set state using hook****/
	const [state, setState] = useState({
		title: '',
		description: '',
		body:'',
		image: '',
	});

	/***slug state****/
	const[slug,setSlug] = useState('');
	const[slugButton,setslugButton] = useState(false);
	
	/****Editor****/
	// const theme = 'snow'; 
	// const { quill, quillRef } = useQuill({theme});

	/***handle descriptuion****/
	const handleDescription = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleBody = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}
	
	/***Image name get krenge images slect krte hi..onchange pe fir setCurrentImage me image ka naam set kr denge****/
	const fileHandle = (e) => {
		if(e.target.files.length !=0)
		//console.log(e.target.files[0].name);
		setCurrentImage(e.target.files[0].name);
		//set image in form state me..
		setState({
			...state,
			[e.target.name]: e.target.files[0],
		});

		//set image preview
		const reader = new FileReader();
		reader.onloadend = () => {
			setImagePreview(reader.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	}

    /****handleInputs function****/
  	const handleInput = (e) => {
		setState({...state,[e.target.name] : e.target.value});//key value pair me sari values le li
		//text ka space trim se hataenge aur slug me - add karenge
		const createSlug = e.target.value.trim().split(' ').join('-');
		setSlug(createSlug);

  	}
	//
	const [value, setValue] = useState('');
   /****Update Slug ****/
   const slugHandle = (e) => {
	setslugButton(true);
	setSlug(e.target.value);
   }
   /****update slug url****/
   const handleURL = (e) => {
		e.preventDefault();
		setSlug(slug.trim().split(' ').join('-'));
	};
  /****post submit****/
  const createPost = (e) => {
	e.preventDefault();
	const {title,description,image,body} = state;
	const formData = new FormData();
	formData.append('title',title);
	formData.append('body',body);
	formData.append('image',image);
	formData.append('description',description);
	formData.append('slug',slug);
	formData.append('name',name);
	formData.append('id',_id);
	//console.log(formData);
	dispatch(createAction(formData));
	//console.log(state);
  }

  //Useeffecct hook
useEffect(()=>{
	//console.log(createErrors);
	if(redirect){
		navigate("/dashboard");
	}
	if(createErrors.length > 0){
		createErrors.map((error) => toast.error(error.msg));
	}
},[createErrors,redirect])

    return (
        <>
            <div className='create mt-100'>
                <Helmet>
                    <title>Create new post</title>
                    <meta name='description' content='Create a new post' />
                </Helmet>
                <Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{
					style: {
						fontSize: '14px',
					},
				}}
			/>

              {!loading ? <div className='container'>
					<form onSubmit={createPost}>
						<div className='row ml-minus-15 mr-minus-15'>
							<div className='col-6 p-15'>
								<div className='card'>
									<h3 className='card__h3'>Create a new post</h3>

									<div className='group'>
										<label htmlFor='title'>Post Title</label>
										<input
											type='text'
											name='title'
											id='title'
											value={state.title}
											onChange={handleInput}
											className='group__control'
											placeholder='Post title...'
										/>
									</div>
									<div className='group'>
										<label htmlFor='image' className='image__label'>
											{/* Choose Image */}
											{currentImage}
										</label>
										<input
											type='file'
											name='image'
											id='image'
											onChange = {fileHandle}
											
										/>
									</div>
									<div className='group'>
										<label htmlFor='body'>Post body</label>
										<textarea
											name='body'
											id='body'
											cols='30'
											rows='10'
											value={state.body}
											onChange={handleBody}
											className='group__control'
											placeholder='Enter body'
											maxLength='1000'></textarea>

										{/* <div style={{ width: 400, height: 300 }}>
										<div ref={quillRef}></div>
										</div> */}
									</div>
									<div className='group'>
										<label htmlFor='description'>Meta Description</label>
										<textarea
											name='description'
											id='description'
											cols='30'
											rows='10'
											className='group__control'
											placeholder='meta description...'
											defaultValue={state.description}
											onChange={handleDescription}
											maxLength='150'></textarea>
										<p className='length'>
											{state.description ? state.description.length : 0}
										</p>
									</div>
								</div>
							</div> 
							<div className='col-6 p-15'>
								<div className='card'>
									<div className='group'>
										<label htmlFor='slug'>Post URL</label>
										<input
											type='text'
											name='slug'
											id='slug'
											className='group__control'
											placeholder='Post URL...'
											value={slug}
											onChange={slugHandle}
										/>
									</div>
									<div className='group'>
										{slugButton ? (
											<button class='btn btn-default' onClick={handleURL}>
												Update Slug
											</button>
										) : (
											''
										)}
									</div>
									<div className='group'>
										<div className='imagePreivew'>
											{imagePreview ? <img src={imagePreview} /> : ''}
										</div>
									</div>

									<div className='group'>
										<input
											type='submit'
											value='Create post'
											className='btn btn-default btn-block'
										/>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div> : <Loader /> }
            </div>
        </>
    )
}

export default Create;
