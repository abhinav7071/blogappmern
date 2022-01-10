import React, {Fragment} from 'react';
import {Routes,Route} from "react-router-dom";
import './main.scss';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/EditImage";
import Details from "./components/Details";
import Comments from "./components/Comments";
import Register from "./auth/Register";
import Login from "./auth/Login";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/private/PrivateRoute";
import RouteLinks from "./components/private/RouteLinks";



function App() {
  return (
    <>
    
      <Fragment>
        <Navbar />
            <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/home/:page" element={<Home />}></Route>
                  <Route exact path="/details/:id" element={<Details />}></Route>
                  <Route element={<RouteLinks />}>
                  {/* <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/home/:page" element={<Home />}></Route> */}
                  <Route exact path="/register" element={<Register />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                </Route>
                  {/* <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/register" element={<Register />}></Route>
                  <Route exact path="/login" element={<Login />}></Route> */}
                {/* <Route exact path="/dashboard" element={<Dashboard />}></Route> */}
                <Route element={<PrivateRoute />}>
                  <Route exact path="/dashboard/:page" element={<Dashboard />}></Route>
                  <Route exact path="/create" element={<Create />}></Route>
                  <Route exact path="/edit/:id" element={<Edit />}></Route>
                  <Route exact path="/updateImage/:id" element={<EditImage />}></Route>
                  <Route exact path="/updateName" element={<UpdateName />}></Route>
                  <Route exact path="/updatePassword" element={<ChangePassword />}></Route>
                </Route>
                {/* <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route> */}
                {/* <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route> */}
                <Route exact path="*" element={<NotFound />}></Route>
            </Routes>
      </Fragment>
     
      
    </>
  );
}

export default App;
