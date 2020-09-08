import React from "react"
import { urls } from "./urls"
import { Authentication } from "./authentication/Authentication"
import { Route } from "react-router-dom"
import { Registration } from './registration/Registration';
import { Cabinet } from "./cabinet/Cabinet"
import { Home } from './home/Home';
import { Search } from './search/Search';
import { NewsComponent } from "../components/news/NewsComponent";
import { Chat } from './chat/Chat';

export const Routes = () =>
    <>
        <Route path={urls.home.path} component={Home} exact/>
        <Route path={urls.authentication.path} component={Authentication}/>
        <Route path={urls.registration.path} component={Registration}/>
        <Route path={urls.cabinet.path} component={Cabinet}/>
        <Route path={urls.search.path} component={Search}/>
        <Route path={urls.news.path} component={NewsComponent}/>
        <Route path={urls.chat.path} component={Chat}/>
    </>

