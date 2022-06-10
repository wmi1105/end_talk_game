const socketIO = require("socket.io");
const api = require("./api.js");

const response = api.dictionary("나무");

module.exports = function ({ server }) {
  const io = socketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "htttp://localhost:1001",
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
        name: item.name,
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
      console.log(`send message : ${JSON.stringify(item)}`);
      if (item.name !== "") {
        io.emit("receive message", {
          type: "msg",
          name: item.name,
          message: item.message,
        });
      }
    });
  });
};
