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

      const { roomId, master } = roomCtrl.entranceUser(socket.id, userName);

      receiveMessage({
        type: "init",
        name: userName,
        roomId: roomId,
        master: master,
        message: "",
      });
    });

    socket.on("exit", (item: { roomId: string; name: string }) => {
      roomCtrl.exitUser(item.roomId, item.name);
      const { master } = roomCtrl.nowRoomMember(item.roomId);

      receiveMessage({
        type: "out",
        name: item.name,
        roomId: item.roomId,
        master: master,
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

    socket.on("game start", (item: { roomId: string }) => {
      const { members } = roomCtrl.nowRoomMember(item.roomId);
      api.gameReset();

      receiveGameCtrl({
        nowTern: "",
        nextTern: members[0],
        verify: true,
        suggestion: "",
        message: "",
      });
    });

    socket.on(
      "send message",
      async (item: { roomId: string; name: string; message: string }) => {
        if (item.name !== "") {
          const {
            verify,
            suggestion,
          }: { verify: boolean; suggestion: string } =
            await api.wordVerification(item.message);

          const { members } = roomCtrl.nowRoomMember(item.roomId);
          const idx = members.indexOf(item.name);
          const next = members.length - 1 === idx ? members[0] : members[idx];

          receiveGameCtrl({
            nowTern: item.name,
            nextTern: next,
            verify,
            suggestion,
            message: item.message,
          });
        }
      }
    );

    function receiveMessage(data: {
      type: string;
      name: string;
      roomId: string;
      master: string;
      message: string;
    }) {
      io.emit("receive message", { ...data });
    }

    function receiveGameCtrl(data: {
      nowTern: string;
      nextTern: string;
      verify: boolean;
      suggestion: string;
      message: string;
    }) {
      io.emit("receive game ctrl", { ...data });
    }
  });
};
