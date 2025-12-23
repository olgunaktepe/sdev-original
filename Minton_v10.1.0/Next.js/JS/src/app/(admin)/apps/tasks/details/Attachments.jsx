"use client";

import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";
import Image from "next/image";

// components

const Attachments = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  /**
   * Handled the accepted files and shows the preview
   */
  const handleAcceptedFiles = files => {
    let allFiles = files;
    (files || []).map(file => Object.assign(file, {
      preview: file["type"].split("/")[0] === "image" ? URL.createObjectURL(file) : null,
      formattedSize: formatBytes(file.size)
    }));
    allFiles = [...selectedFiles];
    allFiles.push(...files);
    setSelectedFiles(allFiles);
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
  };
  return <div className="card">
      <div className="card-body">
        <Dropdown className="float-end" align="end">
          <Dropdown.Toggle as="a" className="text-muted cursor-pointer">
            <i className="mdi mdi-dots-horizontal font-18"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <i className="mdi mdi-attachment me-1"></i>Attachment
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-pencil-outline me-1"></i>Edit
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-content-copy me-1"></i>Mark as Duplicate
            </Dropdown.Item>
            <Dropdown.Divider as="div" />
            <Dropdown.Item className="text-danger">
              <i className="mdi mdi-delete-outline me-1"></i>Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h5 className="header-title mb-3">Attachments</h5>

        <div className="row">
          <div className="col-md-6">
            <div>
              <FileUploader showPreview={false} onFileUpload={acceptedFiles => handleAcceptedFiles(acceptedFiles)} />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="mt-4 mt-md-0">
              {/* Files */}
              <div className="dropzone-previews" id="filePreview">
                {selectedFiles && selectedFiles.length > 0 && (selectedFiles || []).map((f, i) => {
                return <div className="card border mb-2" key={i + "-file"}>
                        <div className="p-2">
                          <div className="row align-items-center">
                            {f.preview && <div className="col">
                                <Image data-dz-thumbnail="" className="avatar-sm rounded bg-light" alt={f.name} src={f.preview} height={36} width={36} />
                              </div>}
                            {!f.preview && <div className="col">
                                <div className="avatar-sm">
                                  <span className="avatar-title badge-soft-primary text-primary rounded">
                                    {f.type.split("/")[1]}
                                  </span>
                                </div>
                              </div>}
                            <div className="col ps-0">
                              <Link href="" className="text-muted fw-semibold">
                                {f.name}
                              </Link>
                              <p className="mb-0 font-12">{f.formattedSize}</p>
                            </div>
                            <div className="col">
                              <Link href="" className="btn btn-link font-16 text-muted">
                                <i className="fe-x" onClick={() => removeFile(i)}></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>;
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Attachments;