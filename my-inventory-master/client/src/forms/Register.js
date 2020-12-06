import React, { useContext, useEffect } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';
import { Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Register() {

  const { username, email, password, setUsername, currency, setEmail, setPassword, setCurrency, register, error, isAuthenticated, clearError } =  useContext(ItemsContext);

  const handleSubmit = (e) => {
      e.preventDefault();

      const newUser = {
        username,
        email,
        password,
        currency
      }

      register(newUser);

      setUsername('');
      setEmail('');
      setPassword('');
    }
    

  useEffect(() =>{
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
        <div>
          <div className="form-container">
            <h4><span>Create Account</span></h4>

            { error ? <Alert className="alert_modal" variant="danger">
                      { error }
                      </Alert> 
                    : null  }
            { isAuthenticated ? <Alert className="alert_modal" variant="success">
                      {`You are successfully registered! Please sign in.`}
                      </Alert> 
                  : null  }
            <form onSubmit={handleSubmit}>            
                <input type="text" value={username} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />        
                <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                <div>
                <label for="cars">Choose your currency:</label>
                  <select name="currency" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="$">Dollar</option>
                    <option value="&euro;">Euro</option>
                    <option value="&#8355;">Franc</option>
                    <option value="&curren;">Generic Currency</option>
                    <option value="&#163;">Pound</option>
                    <option value="&#x20B9;">Rupee</option>
                    <option value="&yen;">Yen</option>
                  </select>  
                </div>    
                <div className="submit">        
                  <button type="submit" class="btn btn-primary">Sign up</button>
                </div>
            </form>
            <div>
              <p>Already have an account?
              <Link to="/login"> Sign in</Link>
              </p>
            </div>
          </div>

        </div>
    )
}
