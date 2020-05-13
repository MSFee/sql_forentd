import React from 'react';

import {Route, Redirect} from 'react-router-dom';

import ProtectRoute from './protectRoute';
import mainRoute from './mainRoute';
import history from './util/history';

import Main from './application/TeacherMain';
import Login from './application/Login';
import Register from './application/Register';
import ForgetPassword from './application/ForgetPassword'
export default (
    <div className="container">
        <Route exact path="/" render={()=>history.push('/login')} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/forgetPassword" component={ForgetPassword} ></Route>
        <ProtectRoute path="/main" Component={mainRoute}/>
    </div>
)