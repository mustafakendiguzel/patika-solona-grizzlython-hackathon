import create, { State } from "zustand";

interface UserAuthenticateStore extends State {
  user: any;
  setUser: (user: any) => void;
}

const useCurrentUserStore = create<UserAuthenticateStore>((set, _get) => ({
  user: null,
  setUser: async (user) => {
    set((s) => {
      s.user = user;
    });
  },
}));

export default useCurrentUserStore;
