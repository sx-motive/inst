import { atom } from 'recoil';

const timelineState = atom({
  key: 'timelineState',
  default: [],
});

const userState = atom({
  key: 'userState',
  default: null,
  dangerouslyAllowMutability: true,
});

const signState = atom({
  key: 'signState',
  default: 'login',
});

const openState = atom({
  key: 'openState',
  default: false,
});

export { userState, timelineState, signState, openState };
