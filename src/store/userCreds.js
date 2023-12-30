import { create } from "zustand";

const userCreds = create((set) => ({
  credentials: {
    _id: "b6d83bc1-e3a8-42c5-a3da-4ca0c223db3c",
    email: "shivaraj.feb@gmail.com",
    name: "shivaraj",
    password:
      "d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db",
  },
  setCredentials: (data) => set({ credentials: data }),

  selectedMenu: 1,
  setSelectedMenu: (data) => set({ selectedMenu: data }),

  pageFlag: 0,
  // 0-none / 1-create / 2-read 
  setPageFlag: (data) => set({ pageFlag: data }),

  storyId:null,
  setStoryId:(data) => set({ storyId: data }),
}));

export default userCreds;
