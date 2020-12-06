
export default (state, action) => {

    switch(action.type){
      case 'GET_USER_ITEM':
      return {
        ...state,
        loading: false,
        items: action.payload
        }
      case 'GET_ITEM':
        return {
          ...state,
          loading: false,
          item: action.payload
        }  
      case 'ADD_USER_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload]
        }
      case 'DELETE_ITEM':
        return {  
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        }
      case 'UPDATE_ITEM':
        return {  
          ...state,
          items: [...state.items, action.payload]
        }
      case 'ADD_USER':
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
        }
      case 'LOGIN_USER':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload.user
        }
      case 'LOGOUT_USER':
      case 'AUTH_ERROR':
        localStorage.removeItem('token');
        return {
          ...state,
          error: action.payload,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        }
      case 'INVENTORY_ERROR':
        return {
          ...state,
          error: action.payload
        }
      case 'CLEAR_ERROR':
        return {
          ...state,
          error: null
        }
      default:
        return state;
    } 
}