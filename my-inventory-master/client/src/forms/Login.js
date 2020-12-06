import React, { useContext, useEffect } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';
import { Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {

  const { email, password, setEmail, setPassword, login, error, clearError, isAuthenticated, user } =  useContext(ItemsContext);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    login(user)

    setEmail('');
    setPassword('');
    
  }
  
  if(isAuthenticated && user){
    history.push("/additem");
  }

  useEffect(() =>{
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <div>
          <div className="form-container">
            <h4><span>Sign in</span></h4>

            { error ? <Alert className="alert_modal" variant="danger">
                              { error }
                      </Alert> 
                    : null  }

            { isAuthenticated && user ? <Alert className="alert_modal" variant="success">
                              {`Successfully logged in!`}
                        </Alert> 
                    : null  }
              <form onSubmit={handleSubmit}>                    
                  <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />    
                  <div className="submit">        
                    <button type="submit" class="btn btn-primary">Sign In</button>
                  </div>
              </form>
              <div>
              <p>Don't have an account yet?
              <Link to="/register"> Sign up</Link>
              </p>
            </div>
          </div>
        </div>
    )
}