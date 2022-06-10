// ################## HTTP 서버(express) 생성 부분
// # express모듈 객체 생성
const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("./socket.js");

// # 정적 파일 경로 설정
const path = require("path");
app.use(cors());
app.use(express.static(path.join(__dirname, "/")));

// # 라우팅 처리
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// # HTTP 서버 구동(port: 8080)
const server = app.listen(8080, () => {
  console.log("Server is Listening at 8080");
});

socket({ server });
