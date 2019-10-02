import React from 'react';
import logo from './logo.svg';
import './App.css';
import DrawZone from './components/DrawZone/DrawZone';
import Controls from './components/Controls/Controls';

const App: React.FC = () => {
  return (
    <div className="App">
      <DrawZone />
      <Controls />
    </div>
  );
}

export default App;
