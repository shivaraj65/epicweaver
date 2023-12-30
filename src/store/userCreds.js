import { create } from "zustand";

// depricated.. now used for app wide state management
const userCreds = create((set) => ({

  selectedMenu: 1,
  setSelectedMenu: (data) => set({ selectedMenu: data }),

  pageFlag: 0,
  // 0-none / 1-create / 2-read 
  setPageFlag: (data) => set({ pageFlag: data }),

  storyId:null,
  setStoryId:(data) => set({ storyId: data }),
}));

export default userCreds;
