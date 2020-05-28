import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import List from './pages/List';
import AddEdit from './pages/AddEdit';

export default function App() {

  return (
      <div className="container">
        <div className="alert alert-primary"><h1 className="text-center">Wallet Tracker</h1></div>
        <nav className="nav nav-pills flex-column flex-sm-row">
          <Link to="/addedit" className="flex-sm-fill text-sm-center nav-link" >Add or Edit Wallet Expenses</Link>
          <Link to="/list" className="flex-sm-fill text-sm-center nav-link active" >Track Wallet Expenses</Link>
        </nav>
        <Switch>
          <Route path="/addedit" component={AddEdit} />
          <Route path="/list" component={List} />
        </Switch>
      </div>
  );
}
