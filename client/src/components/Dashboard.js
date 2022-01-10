import React,{useState,useEffect} from 'react';
import { Helmet } from "react-helmet";
import { useDispatch,useSelector } from "react-redux";
import { REDIRECT_FALSE,REMOVE_MESSAGE,SET_LOADER,SET_MESSAGE,CLOSE_LOADER } from "../store/types/PostTypes";
import toast, { Toaster } from 'react-hot-toast';
import { fetchPosts } from "../store/asyncMethods/postMethods";
import { BsPencil, BsArchive, BsImage } from 'react-icons/bs';
import Loader from './Loader';
import Sidebar from './Sidebar';
import Pagination from "./Pagination";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import moment from "moment";


 const Dashboard = () => {
	
	  /***access form redirect****/
	  const {redirect,message,loading} = useSelector(state => state.PostReducer);
	  //access user data
	  const {user : {_id},token } = useSelector(state => state.AuthReducer);
	  //access possts data
	  const { posts,count,perPage } = useSelector(state => state.FetchPosts);
	  const {page} = useParams();
	  //check condition
	  if(page === undefined){
		  page = 1;
	  }
	  //console.log(posts);
	  const dispatch = useDispatch();
	  //delete post
	  const deletePost = async (id) => {
		const confirm = window.confirm('Are you really want to delete this post?');
		if (confirm) {
			dispatch({ type: SET_LOADER });
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				const {
					data: { msg },
				} = await axios.get(`/delete/${id}`, config);
				dispatch(fetchPosts(_id, page));
				dispatch({ type: SET_MESSAGE, payload: msg });
			} catch (error) {
				dispatch({ type: CLOSE_LOADER });
				console.log(error);
			}
		}
	};
	  useEffect(() => {
		 if(redirect){
			dispatch({type:REDIRECT_FALSE});
		 }
		 if(message){
			 toast.success(message);
			 dispatch({type:REMOVE_MESSAGE});
		 }
		 
		 dispatch(fetchPosts(_id,page));
	  }, [page])
  return (
    <>
      <Helmet>
			<title>Dashboard</title>
			<meta
				name='description'
				content='Learn HTML, CSS, JavaScript, React, Vue, Flutter etc'
			/>
	   </Helmet>
	   <Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{
					style: {
						fontSize: '14px',
					},
				}}
			/>
	   <div className='container mt-100'>
				<div className='row ml-minus-15 mr-minus-15'>
					<div className='col-3 p-15'>
						<Sidebar />
					</div>
					<div className='col-9 p-15'>
						{!loading ? (
							posts.length > 0 ? (
								posts.map((post) => (
									<div className='dashboard__posts' key={post._id}>
										<div className='dashboard__posts__title'>
											<Link to={`/details/${post.slug}`}>{post.title}</Link>
											<span>Published At : {moment(post.updatedAt).fromNow()}</span>
										</div>
										<div className='dashboard__posts__links'>
											<Link to={`/updateImage/${post._id}`}>
												<BsImage className='icon' />
											</Link>
											<Link to={`/edit/${post._id}`}>
												<BsPencil className='icon' />
											</Link>
											<BsArchive
												className='icon'
												onClick={()=>deletePost(post._id)}
											/>
										</div>
									</div>
								))
							) : (
								'You dont have any post'
							)
						) : (
							<Loader />
						)}
						<Pagination path='dashboard' page={page} perPage={perPage} count={count} />
					</div>
				</div>
			</div>
    </>
  )
}

export default Dashboard;
