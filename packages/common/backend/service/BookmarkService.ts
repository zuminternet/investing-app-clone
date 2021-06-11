import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Bookmark from '../model/BookmarkModel';
import { investing } from 'investing-com-api';

import { tickerMap } from '../../domain';

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
  category?: string;
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

    return Bookmark.create({ email, symbol, name, category: tickerMap.stock[symbol] ? category : 'zum-investing-app' });
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
      const { email, symbol, name, category } = bookmarks[i];
      let investingId;

      if (tickerMap.index[symbol]) {
        investingId = tickerMap.index[symbol].investingId;
      }

      if (tickerMap.stock[symbol]) {
        investingId = tickerMap.stock[symbol].investingId;
      }

      if (tickerMap.crypto[symbol]) {
        investingId = tickerMap.crypto[symbol].investingId;
      }

      const investingData = await this.callInvesting(symbol, investingId);

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
