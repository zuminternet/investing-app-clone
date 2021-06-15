import { AxiosStatic } from 'axios';
import { pipe } from '../../../domain/utilFunc';

declare const Axios: AxiosStatic;

/**
 * @todo => domain
 * @see Reply.entity
 */
interface IReply {
  replId: string;
  userThumbnail: string;
  userName: string;
  userMail: string;
  contents: string;
  updatedAt: Date;
  likes: number;
  isParent?: boolean;
  parentReplyId?: string;
}

const refiner = (repls: object[]): IReply[] =>
  pipe(
    repls,
    (repls): IReply[] =>
      repls.map(({ id, userThumbnail, userName, userMail, contents, updatedAt, likes }) => ({
        replId: id,
        userThumbnail,
        userName,
        userMail,
        contents,
        updatedAt: new Date(updatedAt),
        likes,
      })),
    (repls: IReply[]) => repls.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
  );

export const getRepls = async (ticker: string) => {
  try {
    const {
      data: { results },
      status,
      statusText,
    } = await Axios.get(`/api/reply/${ticker}`);

    if (status >= 400) throw Error(statusText);

    const refined = refiner(results);
    return refined;
  } catch (e) {
    return console.error(e);
  }
};

/**
 * 좋아요 추가/취소
 * 서버에서 결과 응답 받을 필요 없이,
 * 클라이언트에서 UI (+ debounce) 처리만
 * @param replId 댓글 id
 */
export const toggleLikes = (replId: string) => {
  try {
    Axios.post(`/api/reply/likes`, { replId }, { withCredentials: true });
  } catch (e) {
    console.error(e);
  }
};
