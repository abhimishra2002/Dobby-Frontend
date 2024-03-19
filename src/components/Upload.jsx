import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ImageUpload.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate('/');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
      setTitle(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (image && title) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", title);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      axios
        .post("https://dobby-backend-0zy3.onrender.com/api/image/upload-image", formData, {
          headers,
        })
        .then((response) => {
          setLoading(false);
          navigate('/');
          
          toast.success("Upload successfull!");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error in uploading image");
          console.error("Error uploading image:", error);
        });
        setLoading(false);
    } else {
      toast.error("Image or title is missing");
      console.error("Image or title is missing");
    }
  };

  useEffect(() => {
    if (loading) {
      toast.dismiss(); 
      toast.info('Connecting to backend...', { autoClose: false });
    }
  }, [loading]);
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="form-container">
          <h2>Upload Image</h2>
          <div className="input-group">
            <label htmlFor="file">Choose File:</label>
            <input
              type="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
            />
          </div>
          <div className="preview-container">
            {previewUrl && (
              <div className="preview">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
