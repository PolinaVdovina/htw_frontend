import React from "react"
import { urls } from "./urls"
import { Authentication } from "./authentication/Authentication"
import { Route } from "react-router-dom"
import { Registration } from './registration/Registration';
import { Cabinet } from "./cabinet/Cabinet"
import { Home } from './home/Home';

export const Routes = () => 
    <>
        <Route path = {urls.home.path}           component={Home}                  exact></Route>
        <Route path = {urls.authentication.path} component={Authentication}></Route>
        <Route path = {urls.registration.path}   component={Registration}></Route>
        <Route path = {urls.cabinet.path}        component={Cabinet}></Route>
    </>

