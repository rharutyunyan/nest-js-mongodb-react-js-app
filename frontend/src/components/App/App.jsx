import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../Home/Home';
import User from '../User/User';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Products from '../Products/Products';
import About from '../About/About';
import Reviews from '../common/Reviews';
import 'antd/dist/antd.css';

export default function App() {
  const user = localStorage.getItem('user');
  const PrivateRoute = ({ component: Component, handleChildFunc, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (user ? <Component {...props} user={user} /> : <Redirect to="/login" />)}
      />
    );
  };

  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/" exact={true} component={Home} />
        <PrivateRoute path="/products" exact={true} component={Products} />
        <PrivateRoute path="/about" exact={true} component={About} />
        <PrivateRoute path="/review" component={Reviews} />
        <PrivateRoute path="/users/:userId" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
