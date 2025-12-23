"use client";

import React, { useState } from "react";
import Link from "next/link";
import Dropzone from "react-dropzone";
import Image from "next/image";
const FileUploader = props => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  /**
   * Handled the accepted files and shows the preview
   */
  const handleAcceptedFiles = files => {
    let allFiles = files;
    if (props.showPreview) {
      (files || []).map(file => Object.assign(file, {
        preview: file["type"].split("/")[0] === "image" ? URL.createObjectURL(file) : null,
        formattedSize: formatBytes(file.size)
      }));
      allFiles = [...selectedFiles];
      allFiles.push(...files);
      setSelectedFiles(allFiles);
    }
    if (props.onFileUpload) props.onFileUpload(allFiles);
  };

  /**
   * Formats the size
   */
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  /*
   * Removes the selected file
   */
  const removeFile = fileIndex => {
    const newFiles = [...selectedFiles];
    newFiles.splice(fileIndex, 1);
    setSelectedFiles(newFiles);
    if (props.onFileUpload) props.onFileUpload(newFiles);
  };
  return <>
      <Dropzone {...props} onDrop={acceptedFiles => handleAcceptedFiles(acceptedFiles)}>
        {({
        getRootProps,
        getInputProps
      }) => <div className="dropzone">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              <i className="h2 text-muted ri-upload-2-line d-inline-block"></i>
              <h4>Drop files here or click to upload.</h4>
            </div>
          </div>}
      </Dropzone>

      {props.showPreview && selectedFiles.length > 0 && <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
          {(selectedFiles || []).map((f, i) => {
        return <div className="card mt-1 mb-0 shadow-none border" key={i + "-file"}>
                <div className="p-2">
                  <div className="row align-items-center">
                    {f.preview && <div className="col">
                        <Image className="avatar-sm rounded bg-light" alt={f.name} src={f.preview} height={36} width={36} />
                      </div>}
                    {!f.preview && <div className="col">
                        <div className="avatar-sm">
                          <span className="avatar-title bg-primary rounded">
                            {f.type.split("/")[1]}
                          </span>
                        </div>
                      </div>}
                    <div className="col ps-0">
                      <Link href="" className="text-muted fw-bold">
                        {f.name}
                      </Link>
                      <p className="mb-0">
                        <strong>{f.formattedSize}</strong>
                      </p>
                    </div>
                    <div className="col">
                      <Link href="" className="btn btn-link btn-lg text-muted shadow-none">
                        <i className="fe-x" onClick={() => removeFile(i)}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>;
      })}
        </div>}
    </>;
};
FileUploader.defaultProps = {
  showPreview: true
};
export default FileUploader;