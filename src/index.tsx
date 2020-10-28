import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PageFirst, Page, NotPage } from './pages/index'
import { PokemonCard, LoginForm, PokemonCatalog } from './components/index'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';

//localStorage.clear()

const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      localStorage.isAuth === 'true' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



const Routers = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(localStorage.isAuth);

  const authentication = () => {
    localStorage.isAuth = true;
    setIsAuth(true);
  }

  const logout = () => {
    localStorage.isAuth = false;
    setIsAuth(false);
    //console.log(isAuth)
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <PageFirst title="Login">
            <LoginForm isAuth={authentication}/>
          </PageFirst>
        </Route>
        <PrivateRoute path="/" data={isAuth} exact>
          <Page logout={logout}>
            <PokemonCatalog/>
          </Page>
        </PrivateRoute>
        <PrivateRoute
          exact
          data={isAuth}
          path="/pokemon/:pokemonId"
          component={({match}: any) => (
            <Page logout={logout} isBack={true}>
              <PokemonCard match={match}/>
            </Page>
          )}/>
          <Route path="*">
            <NotPage/>
          </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routers/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
