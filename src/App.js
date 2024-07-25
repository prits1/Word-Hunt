import React from 'react';
import './App.css';
import AppRoutes from './Routes';

function App() {
  const darkHandler = (dark) => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <div className={'app dark:bg-zinc-800'}>
      <AppRoutes darkHandler={darkHandler} />
    </div>
  );
}

export default App;
