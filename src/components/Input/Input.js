import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Web3Storage } from "web3.storage";
import { SaveData } from "../../api/api";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Input.css";
import {
  TextareaAutosize,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNCM0JlN2M0OEI3MEZCNzY0MjBFOTAyMDQzM0NGOTQ1MzgzYjRiRDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjY3MDM2NzQzMDgsIm5hbWUiOiJteXdlYjN0b2tlbiJ9.GPixvhQdCoqOsmaVPJkCEP_x-vAZ7evQSI08zj0wDu8";
}

const storageClient = new Web3Storage({ token: getAccessToken() });

const useStyles = makeStyles({
  field: {
    backgroundColor: "#042c54",
    fontFamily: "Manrope",
    color: "#fa816b",
  },
});

const Input = () => {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [cid, setCid] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async (FileName, FileType, FileSize, FileDate, IpfsHash) => {
    const res = await axios.get(
      SaveData(FileName, FileType, FileSize, FileDate, IpfsHash)
    );
    console.log(res);
  };

  const createNewPaste = async (e) => {
    setLoading(true);
    console.log(input);

    let formattedContent, serializedFiles;
    serializedFiles = [
      {
        content: input,
        type: null,
        name: null,
      },
    ];

    formattedContent = {
      isFile: false,
      files: serializedFiles,
    };

    console.log(formattedContent);

    const serializedFileContent = JSON.stringify(formattedContent);
    const finalizedFileContent = serializedFileContent;
    const file = new File([finalizedFileContent], { type: "text/plain" });
    const cid = await storageClient.put([file]);

    console.log(file);
    console.log("cid", cid);
    console.log("serializedFileContent", serializedFileContent);
    setCid(cid);

    const current = new Date().toString().substring(0, 16);
    console.log("date", current);
    save("myFile.txt", "text", " ", current, cid);

    setUploadStatus(true);
    setLoading(false);
  };

  const handleMessageChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="input">
      <TextareaAutosize
        className={classes.field}
        aria-label="minimum height"
        minRows={10}
        placeholder="Give your input"
        onChange={handleMessageChange}
      />

      <div className="input-button">
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
              &nbsp; &nbsp; Uploading
            </span>
          ) : (
            "Text upload"
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
                <h1>Input text uploaded successfully with Hash number - </h1>
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

export default Input;
