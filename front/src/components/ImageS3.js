import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import CardMedia from "@mui/material/CardMedia";
import "./ImageS3.css";
const ImageS3 = ({ source }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/s3", {
          key: source,
        });
        const imageData = response.data;
        setImageUrl(`data:image/jpeg;base64,${imageData}`);
      } catch (error) {
        console.error("Error fetching image from S3:", error);
        setImageUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [source]);

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress size={50} />
        </div>
      ) : (
        <CardMedia
          component="img"
          height="100%"
          src={imageUrl ?? "./images/placeholder.png"}
          alt="session"
          style={{
            cursor: "pointer",
            height: imageUrl ? "100%" : "100px",
            transition: "all 0.2s ease",
          }}
        />
      )}
    </div>
  );
};

export default ImageS3;