import React from "react"
import { urls } from "./urls"
import { Authentication } from "./authentication/Authentication"
import { Route, Switch } from "react-router-dom"
import { Registration } from './registration/Registration';
import { Cabinet } from "./cabinet/Cabinet"
import { Home } from './home/Home';
import { Search } from './search/Search';
import { NewsComponent } from "../components/news/NewsComponent";
import { Analytics } from "./cabinet/institution/Analytics";
import { SettingsPage } from "./settings/SettingsPage";
import { ChatList } from "./chat/ChatList";
import { Notification } from './notifications/Notification';
import { AccountActivation } from './account-activation/AccountActivation';
import { AccountActivationSuccess } from './account-activation/AccountActivationSuccess';
import { TypeNewPassword } from './password-recovery/TypeNewPassword';
import { PasswordRecoveryRequest } from './password-recovery/PasswordRecoveryRequest';
import { ChangeEmail } from './change-email/ChangeEmail';
import { VacancyView } from "./vacancy/VacancyView";

export const Routes = () =>
    <>
        <Route path={urls.authentication.path} component={Authentication}></Route>
        <Switch>
            <Route path={urls.registrationWithRole.path} component={Registration}></Route>
            <Route path={urls.registration.path} component={Registration}></Route>
        </Switch>
        <Route path={urls.cabinet.path} component={Cabinet}></Route>
        <Route path={urls.search.path} component={Search}></Route>
        <Route path={urls.news.path} component={NewsComponent}></Route>
        <Route path={urls.analytics.path} component={Analytics}></Route>
        <Route path={urls.chat.path} component={ChatList}/>
        <Route path={urls.settings.path} component={SettingsPage}/>
        <Route path={urls.notifications.path} component={Notification}/>
        <Route exact path={urls.home.path} component={NewsComponent}/>
        <Route path={urls.accountActivation.path} component={AccountActivation}/>
        <Route path={urls.accountActivationSuccess.path} component={AccountActivationSuccess}/>
        <Route path={urls.typeNewPassword.path} component={TypeNewPassword}/>
        <Route path={urls.passwordRecoveryRequest.path} component={PasswordRecoveryRequest}/>
        <Route path={urls.changeEmail.path} component={ChangeEmail}/>
        <Route path={urls.vacancy.path} component={VacancyView}/>
    </>

