import { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, updateAction } from '../store/asyncMethods/postMethods';
import { POST_RESET,RESET_UPDATE,RESET_UPDATE_ERRORS,POST_REQUEST } from '../store/types/PostTypes';
import Loader from './Loader';

const Edit = () => {
	const navigate  = useNavigate();
	const { id } = useParams();
	//console.log(id);
	//const [value, setValue] = useState('');
	const [state, setState] = useState({
		title: '',
		description: '',
		body:''
	});

	const dispatch = useDispatch();
	const { loading, redirect } = useSelector((state) => state.PostReducer);
	const { post, postStatus } = useSelector((state) => state.FetchPost);
	const { editErrors } = useSelector((state) => state.UpdatePost);
	useEffect(() => {

		if (postStatus) {
			setState({
				title: post[0].title,
				description: post[0].description,
				body: post[0].body,

			});
			//setValue(post.body);
			dispatch({ type: POST_RESET });
		} else {
			dispatch(fetchPost(id));
		}
	}, [post]);
	
	//console.log(post[0].title);
	const updatePost = (e) => {
		e.preventDefault();
		dispatch(
			updateAction({
				title: state.title,
				body: state.body,
				description: state.description,
				id: post[0]._id,
			})
		);
	};

	//Editerrors
	useEffect(() => {
		if (editErrors.length !== 0) {
			editErrors.map((error) => toast.error(error.msg));
			dispatch({ type: RESET_UPDATE_ERRORS });
		}
	}, [editErrors]);

	//redirecction
	useEffect(() => {
		if (redirect) {
			navigate("/dashboard/1");
		}
	}, [redirect]);
	return !loading ? (
		<div className='mt-100'>
			<Helmet>
				<title>Edit post</title>
				<meta name='description' content='update post' />
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
			<div className='container'>
				<div className='row'>
					<div className='col-6'>
						<div className='card'>
							<h3 className='card__h3'>Edit post</h3>
							<form onSubmit={updatePost}>
								<div className='group'>
									<label htmlFor='title'>Post title</label>
									<input
										type='text'
										name='title'
										id='title'
										className='group__control'
										placeholder='Post title'
										value={state.title}
										onChange={(e) =>
											setState({ ...state, title: e.target.value })
										}
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
											onChange={(e) =>
												setState({ ...state, body: e.target.value })
											}
											className='group__control'
											placeholder='Enter body'
											maxLength='1000'></textarea>
									</div>
								
								<div className='group'>
									<label htmlFor='description'>Meta Description</label>
									<textarea
										name='description'
										id='description'
										cols='30'
										rows='10'
										defaultValue={state.description}
										onChange={(e) =>
											setState({ ...state, description: e.target.value })
										}
										onKeyUp={(e) =>
											setState({ ...state, description: e.target.value })
										}
										className='group__control'
										placeholder='meta description...'
										maxLength='150'></textarea>
									<p className='length'>
										{state.description ? state.description.length : 0}
									</p>
								</div>
								<div className='group'>
									<input
										type='submit'
										value='Edit'
										className='btn btn-default btn-block'
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};
export default Edit;
