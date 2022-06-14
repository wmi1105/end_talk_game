import { atom } from "recoil";

export interface ReceiveType {
  type: string;
  name: string;
  roomId: string;
  message: string;
}

export interface MessageType {
  type: string;
  name: string;
  message: string;
}

export const RoomState = atom({
  key: "rootState",
  default: {
    roomId: "",
    name: "",
  },
});

export const ChatState = atom<MessageType[]>({
  key: "chatState",
  default: [],
});

export const SendChatState = atom<string>({
  key: "SendChatState",
  default: "",
});
