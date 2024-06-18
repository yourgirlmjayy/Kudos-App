import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header';
import Buttons from './Buttons';
import SearchForm from './SearchForm.jsx';

function App() {

  return (
    <div className='kudos-app'>
      <Header />
      <SearchForm />
      <Buttons />
    </div>

  )
}

export default App;
