let rooms: { roomId: string; master: string }[] = [];
let headCount: { roomId: string; members: string[] }[] = [];

function entranceUser(id: string, name: string) {
  let roomId = id;

  if (rooms.length === 0) {
    rooms = [...rooms, { roomId, master: name }];
    headCount = [...headCount, { roomId: id, members: [name] }];
  } else {
    const lastRoomId = rooms[rooms.length - 1].roomId;
    const filter = headCount.filter((obj) => obj.roomId === lastRoomId);

    if (filter[0].members.length < 8) {
      const member = [...filter[0].members, name];
      headCount = headCount.map((obj) =>
        obj.roomId === lastRoomId ? { ...obj, members: member } : { ...obj }
      );

      roomId = lastRoomId;
    } else {
      rooms = [...rooms, { roomId, master: name }];
      headCount = [...headCount, { roomId: id, members: [name] }];
    }
  }

  roomStateLogger("ENTER");

  return nowRoomMember(roomId);
}

function exitUser(roomId: string, name: string) {
  let room = headCount.find((item) => item.roomId === roomId);
  if (room) {
    const memberFilter = room.members.filter((nm) => nm !== name);
    if (memberFilter.length > 0) {
      room = { ...room, members: memberFilter };
      headCount = [...headCount, room];

      rooms = rooms.map((obj) => {
        if (obj.roomId === roomId && obj.master === name) {
          return { ...obj, master: memberFilter[0] };
        }
        return obj;
      });
    } else {
      headCount = headCount.filter((obj) => obj.roomId !== roomId);
      rooms = rooms.filter((room) => room.roomId !== roomId);
    }
  }

  roomStateLogger("EXIT");
}

function roomStateLogger(type: string) {
  console.group(`================ ${type} ROOM  =====================`);
  console.log(rooms);
  console.log(headCount);
  console.log("");
  console.groupEnd();
}

function nowRoomMember(roomId: string) {
  const roomFilter = rooms.filter((obj) => obj.roomId === roomId);
  const filter = headCount.filter((obj) => obj.roomId === roomId);
  return {
    roomId: roomId,
    master: roomFilter[0].master,
    members: filter[0].members,
  };
}

module.exports = {
  rooms,
  headCount,
  nowRoomMember,
  entranceUser,
  exitUser,
};
