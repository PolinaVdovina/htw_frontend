import React from "react"
import { urls } from "./urls"
import { Authentication } from "./authentication/Authentication"
import { Route } from "react-router-dom"
import { Registration } from './registration/Registration';
import { Cabinet } from "./cabinet/Cabinet"
import { Home } from './home/Home';
import { Search } from './search/Search';
import { NewsComponent } from "../components/news/NewsComponent";
import { Analytics } from "./cabinet/institution/Analytics";
import { SettingsPage } from "./settings/SettingsPage";
import { ChatList } from "./chat/ChatList";

export const Routes = () =>
    <>
        <Route path={urls.home.path} component={Home} exact></Route>
        <Route path={urls.authentication.path} component={Authentication}></Route>
        <Route path={urls.registration.path} component={Registration}></Route>
        <Route path={urls.cabinet.path} component={Cabinet}></Route>
        <Route path={urls.search.path} component={Search}></Route>
        <Route path={urls.news.path} component={NewsComponent}></Route>
        <Route path={urls.analytics.path} component={Analytics}></Route>
        <Route path={urls.chat.path} component={ChatList}/>
        <Route path={urls.settings.path} component={SettingsPage}/>
    </>
