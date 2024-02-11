import React from "react";
import {IntlProvider} from "react-intl";
import {Route, Router} from "react-router-dom";
import MainView from "./components/MainView";
import {connect} from "react-redux";
import {history} from "./utils/Routing";
import {BASENAME} from "../config";
import OidcAuthWrapper from "./components/misc/oidc/OidcAuthWrapper";
import OidcSignInCallback from "./components/pages/OidcSignInCallback";
import OidcSilentCallback from "./components/pages/OidcSilentCallback";
import {isUsingOidcAuth} from "./utils/OidcUtils";

const App = (props) => {
    return <IntlProvider {...props.intl}>
        <Router history={history} basename={BASENAME}>
            <Route path='/oidc-signin-callback' component={OidcSignInCallback}/>
            <Route path='/oidc-silent-callback' component={OidcSilentCallback}/>
            <Route path='/' component={isUsingOidcAuth() ? OidcMainView : MainView}/>
        </Router>
    </IntlProvider>;
}

const OidcMainView = () => {
    return <OidcAuthWrapper>
        <MainView/>
    </OidcAuthWrapper>;
}

export default connect((state) => {
    return {intl: state.intl}
})(App);
