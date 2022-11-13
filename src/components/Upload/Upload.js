import React, { useRef, useState } from "react";
import useFileUpload from "react-use-file-upload";
import "./Upload.css";
import {
  Card,
  CardContent,
  styled,
  Paper,
  tableCellClasses,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Web3Storage } from "web3.storage";
import { Button } from "react-bootstrap";
import { SaveData } from "../../api/api";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#042c54",
    color: "#fa816b",
    fontFamily: "Manrope",
    borderColor: "#fa816b",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#042c54",
    color: "#81AFDD",
    borderColor: "#81AFDD",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#042c54",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNCM0JlN2M0OEI3MEZCNzY0MjBFOTAyMDQzM0NGOTQ1MzgzYjRiRDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjY3MDM2NzQzMDgsIm5hbWUiOiJteXdlYjN0b2tlbiJ9.GPixvhQdCoqOsmaVPJkCEP_x-vAZ7evQSI08zj0wDu8";
}

const storageClient = new Web3Storage({ token: getAccessToken() });

const save = async (FileName, FileType, FileSize, FileDate, IpfsHash) => {
  const res = await axios.get(
    SaveData(FileName, FileType, FileSize, FileDate, IpfsHash)
  );
  console.log(res);
};

const Upload = () => {
  const { files, setFiles, handleDragDropEvent, removeFile } = useFileUpload();

  const [loading, setLoading] = useState(false);
  const [isUpload, setFileUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [cid, setCid] = useState("");
  const inputRef = useRef();
  console.log("data", files);

  const createNewPaste = async () => {
    console.log("Button clicked");
    setLoading(true);
    console.log("loading", loading);

    let formattedContent, serializedFiles;

    const filePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const response = {
              content: Array.from(new Uint8Array(reader.result)),
              type: file.type,
              name: file.name,
            };
            resolve(response);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsArrayBuffer(file);
      });
    });
    serializedFiles = await Promise.all(filePromises);

    console.log("serializedFiles", serializedFiles);

    // else {
    //     serializedFiles = [{
    //         content: textContent,
    //         type: null,
    //         name: null,
    //     }];
    // }

    formattedContent = {
      isFile: isUpload,
      files: serializedFiles,
    };

    console.log(formattedContent);

    const serializedFileContent = JSON.stringify(formattedContent);
    const finalizedFileContent = serializedFileContent;
    const file = new File([finalizedFileContent], { type: "text/plain" });
    const cid = await storageClient.put([file]);

    console.log("cid", cid);
    console.log("serializedFileContent", serializedFileContent);
    setCid(cid);

    const finaldata = [];

    for (let i = 0; i < files.length; i++) {
      save(
        files[0].name,
        files[0].type,
        files[0].size / 1000,
        files[0].lastModifiedDate.toDateString(),
        cid
      );
    }

    setLoading(false);
    setUploadStatus(true);
  };

  return (
    <div className="upload">
      <div
        onDragEnter={handleDragDropEvent}
        onDragOver={handleDragDropEvent}
        onDrop={(e) => {
          handleDragDropEvent(e);
          setFiles(e, "a");
        }}
      >
        <Card sx={{ background: "#042c54" }}>
          <CardContent>
            <p>Drag and drop files here or </p>

            <div className="upload-img">
              <img
                onClick={() => inputRef.current.click()}
                alt="ima"
                src="https://media3.giphy.com/media/JscA27pcDdfubFImYj/giphy.gif?cid=ecf05e47kna7fgo3gouq3t1d6373z97o5zpmjukfvinb28ab&rid=giphy.gif&ct=s"
                class="upload-icon"
              />
            </div>

            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => {
                setFiles(e, "a");
                setFileUpload(true);
                inputRef.current.value = null;
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>File Name</StyledTableCell>
                <StyledTableCell align="right">File Type</StyledTableCell>
                <StyledTableCell align="right">File Size (kb)</StyledTableCell>
                <StyledTableCell align="right">
                  Last Modified Date
                </StyledTableCell>
                <StyledTableCell align="right">Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.type}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.size / 1000}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.lastModifiedDate.toDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <div>
                      <img
                        onClick={() => removeFile(row.name)}
                        alt="ima"
                        src="https://media1.giphy.com/media/LpRUYmsvkm1rjbFilS/giphy.gif?cid=ecf05e474ef3mmbdzzz6h1ji46m12eziptn9qwg16aj31fse&rid=giphy.gif&ct=s"
                        class="remove-icon"
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="upload-button">
        <Button
          loading={loading}
          color="secondary"
          variant="contained"
          onClick={createNewPaste}
        >
          {loading ? (
            <span>
              <CircularProgress
                style={{ color: "yellowgreen" }}
                size={20}
                thickness={5}
              />
              &nbsp; &nbsp; Creating paste
            </span>
          ) : (
            "Create paste"
          )}
        </Button>
      </div>

      {uploadStatus ? (
        <div className="message">
          <Card sx={{ background: "#042c54" }}>
            <CardContent>
              <div className="upload-img">
                <img
                  alt="done"
                  src="https://media2.giphy.com/media/QJ4Hm8oJgMJIqFAuVc/giphy.gif?cid=ecf05e47s4tlxk8zh5ndd02pp8zgpp6z2gnmz01l6y125nhh&rid=giphy.gif&ct=s"
                  class="upload-icon"
                />
              </div>
              <div class="message-hash">
                <h1>Files uploaded successfully with Hash number - </h1>
                <p> &nbsp; &nbsp;{cid}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Upload;
