import create, { State } from "zustand";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface UserAuthenticateStore extends State {
  isLogginActive: boolean;
  loggingScreen: (isLogginActive: boolean) => void;
}

const useUserAuthenticateStore = create<UserAuthenticateStore>((set, _get) => ({
  isLogginActive: true,
  loggingScreen: async (isLogginActive) => {
    let balance = 0;
    try {
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.isLogginActive = isLogginActive;
      console.log(`balance updated, `, balance);
    });
  },
}));

export default useUserAuthenticateStore;
