import React from 'react';
import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';
import './index.css'

import './App.css';

const App = () => {
  return (
    <div className="container">
      <AppHeader />
      <AppMain />
    </div>
  );
};

export default App;
