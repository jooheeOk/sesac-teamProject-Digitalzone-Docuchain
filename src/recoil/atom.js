import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});
export const userEmail = atom({
  key: "userEmail",
  default: "",
  effects_UNSTABLE: [persistAtom],
});