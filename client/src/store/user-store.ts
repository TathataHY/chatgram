import {
  allUserState,
  messageState,
  selectedUserState,
  userProps,
  userState,
} from "@/types";
import { create } from "zustand";

export const useUserStore = create<userState>((set) => ({
  myUser: undefined,
  setUser: (user: userProps) => set({ myUser: user }),
}));

export const useAllUserStore = create<allUserState>((set) => ({
  allUsers: undefined,
  setAllUsers: (users: userProps[]) => set({ allUsers: users }),
}));

export const useSelectedUserStore = create<selectedUserState>((set) => ({
  selectedUser: undefined,
  setSelectedUser: (user: userProps) => set({ selectedUser: user }),
}));

export const useMessageStore = create<messageState>((set) => ({
  messages: undefined,
  setMessages: (messages: any) => set({ messages: messages }),
}));
