import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";

import { GetData } from "../../api/api";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import "./Dashboard.css";

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNCM0JlN2M0OEI3MEZCNzY0MjBFOTAyMDQzM0NGOTQ1MzgzYjRiRDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjY3MDM2NzQzMDgsIm5hbWUiOiJteXdlYjN0b2tlbiJ9.GPixvhQdCoqOsmaVPJkCEP_x-vAZ7evQSI08zj0wDu8";
}

const storageClient = new Web3Storage({ token: getAccessToken() });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#042c54",
    color: "#fa816b",
    fontFamily: "Manrope",
    borderColor: "#fa816b",
    margin:"0"
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

  "&:last-child td, &:last-child th": {},
}));

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonloading, setbuttonLoading] = useState(false);
  const [content, setContent] = React.useState("");
  const [myhash, setHash] = React.useState("");

  const viewPaste = async (hash) => {

    setbuttonLoading(true)

    console.log("hash", hash);

    setHash(hash)
    
    const res = await storageClient.get(hash);
    const files = await res.files();
    console.log(files);
    const file = files[0];

    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      let rawContent;
      try {
        rawContent = JSON.parse(reader.result);
      } catch (e) {
        console.error(e);
        setLoading(false);
        return
      }

      console.log("rawContent", rawContent);

      const serializedFiles = rawContent.files;

      console.log(serializedFiles)
      const files = []
      if (rawContent.isFile) {
        for (const serializedFile of serializedFiles) {
          const fileBuffer = new Uint8Array(serializedFile.content).buffer;
          const file = new File([fileBuffer], serializedFile.name, {
            type: serializedFile.type,
          });
          files.push(file)
        }
        console.log("files",files[0])

        const element = window.document.createElement("a")
        element.href = window.URL.createObjectURL(
          new Blob([files[0]], { type: files[0]["type"] })
        );
        element.download = files[0]["name"]
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)

      } else {
        setContent(serializedFiles[0].content);

        const element = window.document.createElement("a");
        element.href = window.URL.createObjectURL(
          new Blob([content], { type: "text/plain" })
        );
        element.download = "myFile.txt"
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

      }

    });
    reader.readAsBinaryString(file);

    setbuttonLoading(false)
  
  };

  const getList = async () => {
    setLoading(true);
    const { data } = await axios.get(GetData());
    console.log(data);
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
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
              <StyledTableCell align="right">Hash number</StyledTableCell>
              <StyledTableCell align="right">Export / Download</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {records.map((row) => (
              <StyledTableRow key={row.FileName}>
                <StyledTableCell component="th" scope="row">
                  {row.FileName}
                </StyledTableCell>

                <StyledTableCell align="right">{row.FileType}</StyledTableCell>
                <StyledTableCell align="right">{row.FileSize}</StyledTableCell>
                <StyledTableCell align="right">{row.FileDate}</StyledTableCell>
                <StyledTableCell align="right">{row.IpfsHash}</StyledTableCell>

                <StyledTableCell align="right">
                  <div className="download-button">
                    <Button
                      loading={buttonloading}
                      color="secondary"
                      variant="contained"
                      onClick={() => viewPaste(row.IpfsHash)}

                      // onClick={console.log(row.IpfsHash)}
                    >
                      {buttonloading && row.IpfsHash === myhash ? (
                        <span>
                          <CircularProgress
                            style={{ color: "yellowgreen" }}
                            size={20}
                            thickness={5}
                          />
                          &nbsp; &nbsp; Downloading
                        </span>
                      ) : (
                        "Download"
                      )}
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
