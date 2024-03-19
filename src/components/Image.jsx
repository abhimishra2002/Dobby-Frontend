import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Image.css"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    setLoading(true);
    axios.get(`https://dobby-backend-0zy3.onrender.com/api/image/images`, {
      headers: headers,
    })
      .then(response => {
        setLoading(false);
        setImages(response.data.images);
        console.log(response.data);
        toast.success('Images fetched successfully!');
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching images:', error);
        toast.error('Error fetching images');
      })
      setLoading(false);
  }, []);
  useEffect(() => {
    if (loading) {
      toast.dismiss(); 
      toast.info('Connecting to backend...', { autoClose: false });
    }
  }, [loading]);

  return (<>
  <ToastContainer />
  <p className="image-heading"> My Images:</p>
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.url} alt={image.name} />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default ImageGrid;
