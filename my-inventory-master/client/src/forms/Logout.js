import React, { Fragment, useContext} from 'react';
import { Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ItemsContext } from '../contexts/ItemsContext';


export default function Logout() {

    const { logout } =  useContext(ItemsContext);

    return (
        <Fragment>
          <Nav.Link onClick={logout}>
            <Link to="/login"><span className="nav-Item">Logout</span></Link>
          </Nav.Link>
        </Fragment>

    )
}


