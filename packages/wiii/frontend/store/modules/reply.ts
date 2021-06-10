import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { range } from '../../../domain/utilFunc';
import { getRandomText, getRandomUser } from '@/services/reply/random';

declare const Axios: AxiosStatic;

interface ReplyState {}

const Reply = {
  namespaced: true,
  state: {},
  getters: {
    //
  },
  actions: {
    insertReply: async ({ rootGetters: { getTicker, getAuth, getEmail } }, { content }) => {
      try {
        if (!getAuth) return;

        const result = await Axios.post(`/api/reply/`, { docId: getTicker, email: getEmail, content }, { withCredentials: true });
        console.log({ insertResult: result });
        return true;
      } catch (e) {
        return console.error(e);
      }
    },

    getReplsByDocID: async ({ rootGetters: { getTicker } }) => {
      try {
        const result = await Axios.get(`/api/reply/list?ticker=${getTicker}`);
        console.log({ result });
        return result;
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
            login: { uuid, username },
            picture: { thumbnail },
          } = users[i];

          randomRepls[i] = {
            replId: uuid,
            userThumbnail: thumbnail,
            userName: username,
            date: new Date(Date.now() * Math.random()),
            contents: messagesArr[i],
            likes: Math.floor(Math.random() * 50),
          };
        }

        return randomRepls.sort((a, b) => b.date - a.date);
      } catch (e) {
        return console.error(e);
      }
    },
  },
} as Module<ReplyState, RootState>;

export default Reply;
