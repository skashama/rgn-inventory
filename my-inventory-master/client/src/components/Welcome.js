import React from 'react';
import { Link } from "react-router-dom";

 const Welcome = () => {
    return (
      <div className="welcome_container container">
        <div className="welcome_content">
          <div class="welcome_text">
            <p>Sign up to manage your inventory.</p> 
          </div>

          <div>        
            <button type="submit" className="cta_button">
             <Link to="/login">Login</Link>
            </button>       
            <button type="submit" className="cta_button">
              <Link to="/register">Sign up</Link>
            </button>
          </div>
        </div>
      </div>
    )
}

export default Welcome;