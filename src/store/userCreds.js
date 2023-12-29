import { create } from 'zustand'

const userCreds = create((set) => ({
  credentials: null,

  setCredentials: () => set((data) => ({ credentials: data })),
 
}))

export default userCreds