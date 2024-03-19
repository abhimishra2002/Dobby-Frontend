import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Image.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SearchResult = (props) => {
  const [images, setImages] = useState([]);
  const { param } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    axios
      .get(`https://dobby-backend-0zy3.onrender.com/api/image/imageSearch`, {
        headers: headers,
        params: {
          title: param,
        },
      })
      .then((response) => {
        setImages(response.data.images);
        setLoading(false);
        toast.success("Images search finished!");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching images:", error);
      });
  }, [param]);
  useEffect(() => {
    if (loading) {
      toast.dismiss();
      toast.info("Connecting to backend...", {
        autoClose: false,
        
      });
    }
  }, [loading]);

  return (
    <>
      <ToastContainer />
      <p className="image-heading"> Search result for: {param}</p>
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

export default SearchResult;
