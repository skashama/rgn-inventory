import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import { Navbar, Nav} from 'react-bootstrap';
import '../styles/Home.scss';
import EditItem from './EditItem';
import Login from '../forms/Login';
import Register from '../forms/Register';
import Logout from '../forms/Logout';
import Welcome from './Welcome';
import { ItemsContext } from '../contexts/ItemsContext';

const Home = () => {

  const { isAuthenticated, user } =  useContext(ItemsContext);

    return ( 
      <Router>
      <div>
        { isAuthenticated && user ? (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <>
            <Navbar.Brand>              
              <Nav.Link href="#">
                <Link to="/additem"><span className="nav-Item">Inventory</span></Link>
              </Nav.Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto navbar-link">
                <Nav.Link href="#">
                  <Link to="/items"><span className="nav-Item">Products List</span></Link>
                </Nav.Link>
              </Nav>

              <Nav className="navbar-link">
                <span className="nav-Item welcome-user">{`Welcome, ${user.username}!`}</span>
                <Logout />
              </Nav>
              </Navbar.Collapse>
            </>
        </Navbar>
        ) 
        : (
        null
        )}

        <Switch>  
          {isAuthenticated && user ? (
            <>
            <Route exact path="/additem">
              <AddItemForm />
            </Route> 

            <Route path="/items">
              <ItemList />
            </Route>

            <Route path="/edit/:id">
              <EditItem />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            </>
          ) : (
            <>
            <Route exact path="/">
              <Welcome />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>
            </>
          )}

        </Switch>
      </div>
      </Router>
    );
}
 
export default Home;