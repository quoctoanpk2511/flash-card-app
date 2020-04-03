import React from 'react';
import Header from "./Header.js"
import CardContainer from "./CardContainer.js"
// import './App.css';

function App() {
    return (
      <div className='wrapper'>
        <Header />
        <div className='content-wrapper'>
          <CardContainer />
        </div>
      </div>
    );
}

export default App;
