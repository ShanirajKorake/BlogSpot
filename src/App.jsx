import React,{useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import authServices from './appwrite/auth';
import { logIn, logOut } from './store/authSlice';
import { Footer, Header } from './components';
import {Outlet } from'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    authServices.getCurrentUsr()
    .then((userData) => { 
      console.log(userData);
      if (userData){
        dispatch(logIn({userData}))
      }else{
        dispatch(logOut())
      }
    }
  )
     .then(e => console.log(e))
     .finally(setLoading(false))
  }, []);

  return !loading ? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-black text-white'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      </div>
    </>)
    :null
}

export default App
