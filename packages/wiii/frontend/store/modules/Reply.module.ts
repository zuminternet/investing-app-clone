import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { range } from '../../../domain/utilFunc';
import { getRandomText, getRandomUser } from '@/services/reply/random';
import { getRepls, toggleLikes } from '@/services/reply';

declare const Axios: AxiosStatic;

interface ReplyState {}

const Reply = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    insertReply: async ({ rootGetters: { getTicker, getAuth, getEmail } }, { contents }) => {
      try {
        if (!getAuth) return;

        const { data, status, statusText } = await Axios.post(
          `/api/reply/`,
          { docId: getTicker, email: getEmail, contents },
          { withCredentials: true },
        );
        if (status >= 400) throw Error(statusText);
        return true;
      } catch (e) {
        return console.error(e);
      }
    },

    getReplsByDocID: async ({ rootState: { auth } }, ticker: string) => {
      if (!ticker) return;
      try {
        const results = await getRepls(ticker, auth);
        console.log({ results });
        if (!results) return;
        return results;
      } catch (e) {
        return console.error(e);
      }
    },

    /**
     * getRandomRepls
     * @todo Service로 함수 분리
     * @property replId
     * @property userThumbnail
     * @property userName
     * @property date
     * @property contents
     * @property likes
     * - ReplySection 개발/테스트를 위한 randomuser.me API, metaphorpsum API 활용
     * - @see https://randomuser.me/documentation#multiple
     * - @see http://metaphorpsum.com/
     */
    getRandomRepls: async (): Promise<void | object> => {
      try {
        const nums = 15;

        const users = await getRandomUser(nums);
        if (!users) throw new Error();

        const texts = await getRandomText(nums);
        if (!texts) throw Error();
        const { messages } = texts;
        const messagesArr = messages.split('\n\n');

        const randomRepls = Array.from({ length: nums });
        for (const i of range(0, nums)) {
          const {
            email,
            login: { uuid, username },
            picture: { thumbnail },
          } = users[i];

          randomRepls[i] = {
            replId: uuid,
            userThumbnail: thumbnail,
            userName: username,
            userMail: email,
            updatedAt: new Date(Date.now() * Math.random()),
            contents: messagesArr[i],
            likes: Math.floor(Math.random() * 50),
          };
        }

        return randomRepls.sort((a, b) => b.updatedAt - a.updatedAt);
      } catch (e) {
        return console.error(e);
      }
    },

    toggleLikesAction: (_, replId: string) => {
      if (!replId) return false;
      try {
        toggleLikes(replId);
      } catch (e) {
        return console.error(e);
      }
    },
  } /** actions */,
} as Module<ReplyState, RootState>;

export default Reply;
