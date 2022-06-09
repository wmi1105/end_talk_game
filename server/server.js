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
const io = socketIO(server, { path: "/socket.io" });

// # socket.io 객체의 이벤트 리스터 설정
// 1) 연결 성공 이벤트: "socket.io 객체"로 "connect" 이벤트 처리
io.on("connect", (socket) => {
  const ip =
    socket.request.headers["x-forwarded-for"] ||
    socket.request.connection.remoteAddress;
  console.log(
    `클라이언트 연결 성공 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`
  );

  socket.on("init", (payload) => {
    console.log("init", payload);
  });

  // 2) 연결 종료 이벤트: "매개변수로 들어온 socket"으로 처리해야 함 주의!
  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log(`연결 종료 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`);
  });

  // 3) 에러 발생 이벤트: "매개변수로 들어온 socket"으로 처리해야 함 주의!
  socket.on("error", (error) => {
    console.log(`에러 발생: ${error}`);
  });

  // 4) 클라이언트에서 보낸 이벤트 처리: 클라이언트에서 "client_msg" 이름으로 보낸 데이터 수신
  socket.on("client_msg", (data) => {
    console.log(`클라이언트에서 보낸 메시지 수신: ${data}`);

    // # 클라이언트에게 "server_msg" 이름으로 데이터 전송
    socket.emit("server_msg", `[${socket.id}]소켓 서버에서 보낸 메세지입니다.`);
  });
});
