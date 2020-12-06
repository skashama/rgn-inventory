import React from 'react';
import './App.scss';
import Home from './components/Home';
import ItemsContextProvider from './contexts/ItemsContext';


function App() {

  return (
    <div className="App">
      <ItemsContextProvider>
        <Home />
      </ItemsContextProvider>
    </div>
  );
}

export default App;
