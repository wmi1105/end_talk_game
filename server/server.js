// ################## HTTP 서버(express) 생성 부분
// # express모듈 객체 생성
const express = require("express");
const app = express();

// # 정적 파일 경로 설정
const path = require("path");
app.use(express.static(path.join(__dirname, "/")));

// # 라우팅 처리
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// # HTTP 서버 구동(port: 8080)
const server = app.listen(8080, () => {
  console.log("Server is Listening at 8080");
});

// ################## socket.io 모듈 사용 부분
// # socket.io 모듈 추출
const socketIO = require("socket.io");

// # socket.io 객체 생성: 1) http서버 연결, 2) path 설정(생략시 디폴트: /socket.io)
const io = socketIO(server, {
  path: "/socket.io",
  cors: {
    origin: "htttp://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// # socket.io 객체의 이벤트 리스터 설정
// 1) 연결 성공 이벤트: "socket.io 객체"로 "connect" 이벤트 처리
io.on("connect", (socket) => {
  let userName = "";
  const ip =
    socket.request.headers["x-forwarded-for"] ||
    socket.request.connection.remoteAddress;
  console.log(
    `클라이언트 연결 성공 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`
  );

  socket.on("init", (payload) => {
    console.log("init", payload);
    userName = payload;
    io.emit("receive message", {
      type: "init",
      name: payload,
      message: "",
    });
  });

  socket.on("room out", (item) => {
    console.log(item, "나가기");
    io.emit("receive message", {
      type: "out",
      name: userName,
      message: "",
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log(`연결 종료 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`);
  });

  socket.on("error", (error) => {
    console.log(`에러 발생: ${error}`);
  });

  socket.on("send message", (item) => {
    console.log(`${item.name} : ${item.message}`);
    io.emit("receive message", {
      type: "msg",
      name: item.name,
      message: item.message,
    });
  });
});
