import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import "./Homepage.css";
import ImageGrid from './Image';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const { isAuthenticated } = useContext(UserContext);

  return (<div>
    {!isAuthenticated && <>
    <h1 className='homepage'>Kindly Login or create account to view your data. Thanks!</h1>
    </>}
    {
      isAuthenticated && <ImageGrid/>
    }
  </div>
    
  )
}

export default HomePage