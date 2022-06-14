const e = require("cors");
const socketIO = require("socket.io");
const api = require("./api.ts");

const roomCtrl = require("./rooms.ts");

module.exports = function ({ server }: { server: any }) {
  const io = socketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "htttp://localhost:1001",
      methods: ["GET", "POST"],
    },
  });

  // # socket.io 객체의 이벤트 리스터 설정
  // 1) 연결 성공 이벤트: "socket.io 객체"로 "connect" 이벤트 처리
  io.on("connect", (socket: any) => {
    let userName = "";
    const ip =
      socket.request.headers["x-forwarded-for"] ||
      socket.request.connection.remoteAddress;
    console.log(
      `클라이언트 연결 성공 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`
    );

    socket.on("init", (payload: { name: string }) => {
      console.log("init", payload);
      userName = payload.name;

      const roomId = roomCtrl.entranceUser(socket.id, userName);

      io.emit("receive message", {
        type: "init",
        name: userName,
        roomId: roomId,
        message: "",
      });
    });

    socket.on("exit", (item: { roomId: string; name: string }) => {
      roomCtrl.exitUser(item.roomId, item.name);

      io.emit("receive message", {
        type: "out",
        name: item.name,
        message: "",
      });
    });

    socket.on("disconnect", (reason: any) => {
      console.log(reason);
      console.log(`연결 종료 - 클라이언트IP: ${ip}, 소켓ID: ${socket.id}`);
    });

    socket.on("error", (error: any) => {
      console.log(`에러 발생: ${error}`);
    });

    socket.on(
      "send message",
      async (item: { roomId: string; name: string; message: string }) => {
        if (item.name !== "") {
          const verify: boolean = await api.wordVerification(item.message);

          io.emit("receive game ctrl", {
            nowTern: item.name,
            nextTern: item.name,
            verify: verify,
            message: item.message,
          });
        }
      }
    );
  });
};
