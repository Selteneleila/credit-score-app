import { Box, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import CustomInput from "../customInput";
import "./index.css";
import upload from "../../../assets/upload.svg";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Dropzone({ title }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const deleteImage = () => {
    setUploadedFile(null);
  };

  return (
    <Box className="container">
      <Typography variant="h5">{title}</Typography>
      <div {...getRootProps({ className: "dropzone" })}>
        <CustomInput {...getInputProps()}></CustomInput>
        {uploadedFile ? (
          <>
            <img
              style={{ backgroundColor: "red" }}
              src={uploadedFile}
              alt="uploaded file"
            />
            <IconButton onClick={deleteImage}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <img src={upload} alt="upload" />
            <Typography variant="h6">
              Drag and drop picture here, or click to select
            </Typography>
            {acceptedFiles.map((file) => (
              <div key={file.path}>{file.path}</div>
            ))}
          </>
        )}
      </div>
    </Box>
  );
}
