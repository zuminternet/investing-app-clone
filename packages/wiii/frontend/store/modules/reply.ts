import { Module } from 'vuex';
import { AxiosStatic } from 'axios';
import { RootState } from '@/store';
import { range } from '../../../domain/utilFunc';

declare const Axios: AxiosStatic;

interface ReplyState {
  //
}

const state = () => {
  //
};

const getters = {
  //
};

const mutations = {
  //
};

const actions = {
  /**
   * getRandomRepls
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

      const {
        data: { results },
        status,
        statusText,
      } = await Axios.get(`https://randomuser.me/api/?results=${nums}`, { responseType: 'json' });
      if (status >= 400) throw new Error(statusText);

      const {
        data: messages,
        status: msgStatus,
        statusText: msgStatusText,
      } = await Axios.get(`http://metaphorpsum.com/paragraphs/${nums}`, { responseType: 'text' });
      if (msgStatus >= 400) throw new Error(msgStatusText);

      const messagesArr = messages.split('\n\n');

      const randomRepls = Array.from({ length: nums });
      for (const i of range(0, nums)) {
        const {
          login: { uuid, username },
          picture: { thumbnail },
        } = results[i];

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
};

const Reply = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
} as Module<ReplyState, RootState>;

export default Reply;
