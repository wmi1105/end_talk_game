const e = require("cors");
const socketIO = require("socket.io");
const api = require("./api.ts");

const response = api.dictionary("나무");

let rooms: string[] = [];
let headCount: { roomId: string; members: string[] }[] = [];

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

    socket.on("init", (payload: any) => {
      console.log("init", payload);
      userName = payload;

      if (rooms.length === 0) {
        const id = socket.id;
        rooms = [...rooms, id];
        headCount = [...headCount, { roomId: id, members: [payload] }];
      } else {
        const lastRoomId = rooms[rooms.length - 1];
        const filter = headCount.filter((obj) => obj.roomId === lastRoomId);

        if (filter[0].members.length < 8) {
          const member = [...filter[0].members, payload];
          headCount = headCount.map((obj) =>
            obj.roomId === lastRoomId ? { ...obj, members: member } : { ...obj }
          );
        } else {
          const id = socket.id;
          rooms = [...rooms, id];
          headCount = [...headCount, { roomId: id, members: [payload] }];
        }
      }

      console.group("================ ROOM  =====================");
      console.log(rooms);
      console.log(headCount);
      console.groupEnd();

      io.emit("receive message", {
        type: "init",
        name: payload,
        message: "",
      });
    });

    socket.on("room out", (item: any) => {
      console.log(item, "나가기");
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

    socket.on("send message", (item: any) => {
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
