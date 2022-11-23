const express = require("express");
const http = require("http");
const cors = require("cors");
const twilio = require("twilio");
const { send } = require("process");

const PORT = 5002;
const app = express();
const server = http.createServer(app);

app.use(cors());

let guilds = [];
let connectedUsers = [];

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = "AC7cff1792ce0f8d410f4790a5048eeeb7";
  const authToken = "c9f5e65fe22c2e6764d5ca5530d4970c";

  const client = twilio(accountSid, authToken);

  res.send({ token: null });
  try {
    client.tokens.create().then((token) => {
      res.send({ token });
    });
  } catch (err) {
    console.log("error occurred when fetching turn server credentials");
    console.log(err);
    res.send({ token: null });
  }
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join-guild-channel", (data) => {
    console.log("join-guild-channel에 들어왔습니다.")
    joinGuildChannelHandler(data, socket);
  });
  socket.on("create-room", (data) => {
    console.log("1 enter-room에 들어왔습니다.")
    createRoomHandler(data, socket);
  });
  socket.on("join-room", (data) => {
    console.log("2 join-room에 들어왔습니다.")
    joinRoomHandler(data, socket);
  });
  socket.on("conn-signal", (data) => {
    console.log("6 conn-signal 이 도착했습니다.");
    signalingHandler(data, socket);
  });
  socket.on("conn-init", (data) => {
    console.log("4 conn-init 이 도착했습니다.")
    initializeConnectionHandler(data, socket);
  });
  socket.on("exit-room", () => {
    console.log("방에서 나가는 요청이 도착했습니다.")
    exitRoomHandler(socket);
  });
  socket.on("disconnect", () => {
    console.log("길드 채널에서 나갑니다.")
    disconnectedHandler(socket);
  });
})

const joinGuildChannelHandler = (data, socket) => {
  const { nickname, guildId } = data

  const newUser = {
    nickname,
    guildId,
    socketId: socket.id,
    roomNumber: null,
    learningRecordId: null
  }
  const thisGuild = guilds.filter((guild) => {
    return guild.guildId === guildId
  })

  if (thisGuild.length > 0) {
    const guild = thisGuild[0]
    guild.connectedUsers = [...(guild.connectedUsers), newUser]
    connectedUsers = [...connectedUsers, newUser]
    io.to(socket.id).emit("guild-update", { guild })
  } else {
    const newGuild = {
      guildId,
      rooms: [
        {
          roomNumber: 1,
          videoId: null,
          connectedUsers: [],
        },
        {
          roomNumber: 2,
          videoId: null,
          connectedUsers: [],
        },
        {
          roomNumber: 3,
          videoId: null,
          connectedUsers: [],
        },
      ],
      connectedUsers: [newUser]
    }
    guilds = [...guilds, newGuild]
    connectedUsers = [...connectedUsers, newUser]
  }
}

const createRoomHandler = (data, socket) => {
  const { roomNumber, guildId, videoId, learningRecordId } = data

  let guild = guilds.find((g) => {
    return g.guildId === guildId
  });

  const roomId = guildId + "-" + roomNumber;

  if (guild) {
    let user = guild.connectedUsers.find((user) => user.socketId === socket.id);
    let room = guild.rooms.find((room) => room.roomNumber === roomNumber)
    user.roomNumber = roomNumber
    user.learningRecordId = learningRecordId
    room.videoId = videoId
    room.connectedUsers = [...(room.connectedUsers), user]

    socket.join(roomId);
    guild.connectedUsers.forEach((user) => {
      io.to(user.socketId).emit("guild-update", { guild })
    })
  }
}

const joinRoomHandler = (data, socket) => {
  const { roomNumber, guildId, learningRecordId } = data

  let guild = guilds.find((g) => {
    return g.guildId === guildId
  });

  const roomId = guildId + "-" + roomNumber;

  if (guild) {
    let user = guild.connectedUsers.find((u) => u.socketId === socket.id);
    let room = guild.rooms.find((room) => room.roomNumber === roomNumber)
    user.roomNumber = roomNumber
    user.learningRecordId = learningRecordId
    room.connectedUsers = [...(room.connectedUsers), user]

    socket.join(roomId)
    room.connectedUsers.forEach((user) => {
      if (user.socketId !== socket.id) {
        const data = {
          connUserSocketId: socket.id,
        };

        console.log(`3 send prepare to ${user.socketId}`)
        io.to(user.socketId).emit("conn-prepare", data);
      }
    });
    guild.connectedUsers.forEach((user) => {
      io.to(user.socketId).emit("guild-update", { guild })
    })

  }
}

const exitRoomHandler = (socket) => {
  console.log("나가는 요청이 실행되었습니다.")
  const user = connectedUsers.find((user) => {
    return user.socketId === socket.id
  });

  if (user) {
    const guild = guilds.find(g => {
      return g.guildId === user.guildId
    })

    const room = guild.rooms.find(r => {
      return r.roomNumber == user.roomNumber
    })

    if (room) {
      room.connectedUsers = room.connectedUsers.filter(u => {
        return u.socketId != user.socketId
      })
      if (room.connectedUsers.length < 1) {
        room.videoId = null;
      }

      const roomId = guild.guildId + "-" + room.roomNumber
      socket.leave(roomId)

      room.connectedUsers.forEach(u => {
        io.to(u.socketId).emit("user-disconnected", { socketId: socket.id })
      })
      guild.connectedUsers.forEach(u => {
        io.to(u.socketId).emit("guild-update", { guild })
      })
    }
  }
}

const disconnectedHandler = (socket) => {
  console.log("나가는 요청이 실행되었습니다.")
  const user = connectedUsers.find((user) => {
    return user.socketId === socket.id
  });

  // console.log(user)
  if (user) {
    if (user.roomNumber) {
      exitRoomHandler(socket)
    }
    const guild = guilds.find(g => g.guildId == user.guildId);
    if (guild) {
      guild.connectedUsers = guild.connectedUsers.filter(u => {
        return u.socketId != user.socketId
      })
    }
    connectedUsers = connectedUsers.filter(u => {
      return u.socketId != user.socketId
    })
  }
}

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  io.to(connUserSocketId).emit("conn-signal", signalingData);
  console.log(connUserSocketId, "한테 conn-signal 보냄")
};

// information from clients which are already in room that They have prepared for incoming connection
const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  console.log("5 init message to new member");
  io.to(connUserSocketId).emit("conn-init", initData);
}















server.listen(5002, () => {
  console.log("server start on 5002");
})