import React, { createContext, useState, useReducer } from 'react';
import appReducer from '../reducers/appReducer';
import axios from 'axios';

// Initial state
const initialState = {
  items: [],
  item: null,
  totalItem: 0,
  error: null,
  loading: false,
  users: [],
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
}

// Create context
export const ItemsContext = createContext(initialState);

// Provider component
export const ItemsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

  let [name, setName] = useState('');
  let [quantity, setQuantity] = useState();
  let [price, setPrice] = useState(); 

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('$'); 

  // Actions
  async function getItem(id) {
    try {
      const res = await axios.get(`/api/v1/items/item/${id}`);

      dispatch({
        type: 'GET_ITEM',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'INVENTORY_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getUserItems(id) {
    try {
      const res = await axios.get(`/api/v1/items/${id}`);

      dispatch({
        type: 'GET_USER_ITEM',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'INVENTORY_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function addUserItem(id, item) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post(`/api/v1/items/${id}`, item, config);

      dispatch({
        type: 'ADD_USER_ITEM',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'INVENTORY_ERROR',
        payload: err.response.data.error
      });
    }
  }



  async function deleteItem(id) {
    try {
      await axios.delete(`/api/v1/items/${id}`, tokenConfig());

      dispatch({
        type: 'DELETE_ITEM',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'INVENTORY_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function register(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/users/register', user, config);

      dispatch({
        type: 'ADD_USER',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.msg
      });
    }
  }

  const logout = () => { 
   dispatch({
    type: 'LOGOUT_USER'
   });
  }

  const clearError = () => { 
    dispatch({
     type: 'CLEAR_ERROR'
    });
   }
  
  async function login(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/users/login', user, config);

      dispatch({
        type: 'LOGIN_USER',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.msg
      });
    }
  }

  async function updateItem(id, item) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.put(`/api/v1/items/${id}`, item, config);

      dispatch({
        type: 'UPDATE_ITEM',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'INVENTORY_ERROR',
        payload: err.response.data.error
      });
    }
  }

  // Setup config/headers and state.token token
 const tokenConfig = () => {
  // Get token from localstorage
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

  const prix = state.items.map(item => parseFloat(item.quantity*item.price));
  const totalPrice = prix.reduce((acc, item) => (acc += item), 0);

  const qty = state.items.map(item => parseFloat(item.quantity));
  const totalQuantity = qty.reduce((acc, item) => (acc += item), 0);

  const totalItems = state.items.length;

    return (
        <ItemsContext.Provider value={{
          items: state.items,
          item: state.item,
          name,
          quantity,
          price,
          username,
          email,
          password,
          currency,
          totalItem: state.totalItem,
          totalItems,
          totalQuantity,
          totalPrice,
          setName,
          setQuantity,
          setPrice,
          setUsername,
          setEmail,
          setPassword,
          setCurrency,
          error: state.error,
          loading: state.loading,
          users: state.users,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          isLoading: state.isLoading,
          user: state.user,
          getUserItems,
          getItem,
          addUserItem,
          deleteItem,
          updateItem,
          register,
          login,
          logout,
          clearError
          }}>
          {children}
        </ItemsContext.Provider>
    )    
}

export default ItemsContextProvider;
