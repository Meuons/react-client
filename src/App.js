import React from 'react'

import Index from './index'
import './App.css'
import Get from './Get'
//Functional component
const App = () => {
  //render single App component
  return(
    <>
    <header>
   <h1>Movie Reviews</h1></header>
   <div id="wrapper">
     <div id="mainContent">
 
   <div>
    <Get/>
    </div>
 <footer>Created by Måns</footer>
   </div>    
  
    </div>

    </>
  )
}
  
export default App