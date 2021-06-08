import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Bookmark from '../model/BookmarkModel';
import { investing } from 'investing-com-api';

export interface InvestingData {
  date: number;
  value: number;
}

export interface InvestingApiResponse {
  key: string;
  value: number;
  diff: number;
  growthRate: number;
  date: string;
}

const fakeTickersMap = {
  TSLA: true,
  NVDA: true,
  NFLX: true,
  BAC: true,
  GOOGL: true,
  BABA: true,
};

enum bookmarkSymbols {
  AAPL = 'equities/apple-computer-inc', // 애플
  AMZN = 'equities/amazon-com-inc', // 아마존
  FB = 'equities/facebook-inc', // 페이스북
  JPM = 'equities/jp-morgan-chase', // JP 모건
  TSLA = 'indices/us-30', // 다우 존스
  NVDA = 'indices/nq-100', // 나스닥
  BABA = 'indices/japan-ni225', // 니케이
  NFLX = 'crypto/bitcoin/btc-usd', // 비트코인
  GOOGL = 'crypto/ethereum/eth-usd?c997650', // 이더리움
  BAC = 'crypto/litecoin/ltc-usd?c1010798', // 라이트코인
}

interface createBookmarkQueryProps {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

interface getIsBookmarkedQueryProps {
  email: string;
  symbols: string;
}

interface deleteBookmarkQueryProps {
  email: string;
  symbol: string;
  name: string;
  category: string;
}

@Service()
export default class BookmarkService {
  private callInvesting(key, investingId) {
    return new Promise<InvestingApiResponse>((resolve, reject) => {
      investing(investingId)
        .then((result: InvestingData[]) => {
          const { value: newValue, date } = result.pop();
          const { value: oldValue } = result.pop();
          const diff = newValue - oldValue;
          const growthRate = (diff / newValue) * 100;
          resolve({ key, value: newValue, diff, growthRate, date: this.getDateString(date) });
        })
        .catch(reject);
    });
  }

  private getDateString(timeStamp: number) {
    const date = new Date(timeStamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  /**
   * @description Bookmark document를 추가하는 service
   * @param param0
   * @returns Promise
   */
  public async createBookmark({ email, symbol, name, category }: createBookmarkQueryProps) {
    const bookmark = await Bookmark.findOne({ email, symbol, name });

    if (bookmark) {
      return false;
    }

    return Bookmark.create({ email, symbol, name, category: fakeTickersMap[symbol] ? 'zum-investing-app' : category });
  }

  public async deleteBookmark({ email, symbol, name, category }: deleteBookmarkQueryProps) {
    const bookmark = await Bookmark.findOneAndRemove({ email, symbol, name });

    if (bookmark !== null) {
      return true;
    }

    return false;
  }

  /**
   * @description email을 받아 Bookmark documents 들을 리턴하는 service
   * @param email string
   * @returns BookmarkDocument
   */

  public async getBookmarks(email: string) {
    const bookmarks = await Bookmark.find({ email });
    const displayedBookmarks = [];

    for (let i = 0; i < bookmarks.length; i++) {
      const key = bookmarks[i].symbol;

      const investingId = bookmarkSymbols[key];
      const investingData = await this.callInvesting(key, investingId);
      const { email, symbol, name, category } = bookmarks[i];

      displayedBookmarks.push({ email, symbol, name, category, ...investingData });
    }

    if (displayedBookmarks) {
      return displayedBookmarks;
    }

    return false;
  }

  public async getIsBookmarked({ email, symbols }: getIsBookmarkedQueryProps) {
    const bookmarks = await Bookmark.findOne({ email, symbol: symbols });

    if (bookmarks !== null) {
      return true;
    }

    return false;
  }
}
