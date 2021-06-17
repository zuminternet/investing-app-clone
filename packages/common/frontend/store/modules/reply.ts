import { createReply, getReplsByDocID } from '../../apis/';

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /**
   * 댓글 추가
   * @param _ state 댓글 상태 굳이 저장할 필요없어 보임
   * @param props email, docId, contents; 사용자 email, 댓글 달 종목 또는 뉴스 id, 댓글 내용
   * @returns true / void
   */
  insertReply: async (_, { email, docId, contents }) => {
    try {
      const isOK = await createReply({ email, docId, contents });
      return isOK;
    } catch (e) {
      return console.error(e);
    }
  },

  /**
   * 댓글 목록 조회
   * @param 종목 티커 또는 뉴스 id 로 조회
   */
  getReplsByDocID: async (_, { email, docId }) => {
    try {
      const repls = await getReplsByDocID(docId, email);
      return repls;
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
};

export default Reply;
