let rooms: string[] = [];
let headCount: { roomId: string; members: string[] }[] = [];

function entranceUser(id: string, name: string) {
  let roomId = id;

  if (rooms.length === 0) {
    rooms = [...rooms, id];
    headCount = [...headCount, { roomId: id, members: [name] }];
  } else {
    const lastRoomId = rooms[rooms.length - 1];
    const filter = headCount.filter((obj) => obj.roomId === lastRoomId);

    if (filter[0].members.length < 8) {
      const member = [...filter[0].members, name];
      headCount = headCount.map((obj) =>
        obj.roomId === lastRoomId ? { ...obj, members: member } : { ...obj }
      );

      roomId = lastRoomId;
    } else {
      rooms = [...rooms, id];
      headCount = [...headCount, { roomId: id, members: [name] }];
    }
  }

  roomStateLogger("ENTER");

  return roomId;
}

function exitUser(roomId: string, name: string) {
  let room = headCount.find((item) => item.roomId === roomId);
  if (room) {
    const memberFilter = room.members.filter((nm) => nm !== name);
    if (memberFilter.length > 0) {
      room = { ...room, members: memberFilter };
      headCount = [...headCount, room];
    } else {
      headCount = headCount.filter((obj) => obj.roomId !== roomId);
      rooms = rooms.filter((id) => id !== roomId);
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

module.exports = {
  rooms,
  headCount,
  entranceUser,
  exitUser,
};
