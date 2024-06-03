// src/App.tsx
import React from 'react';
import WebcamControl from './components/WebcamControl';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Face Recognition App</h1>
      </header>
      <WebcamControl />
    </div>
  );
};

export default App;
