import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Bookmark from '../model/BookmarkModel';
import { investing } from 'investing-com-api';

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
  /**
   * @description Bookmark document를 추가하는 service
   * @param param0
   * @returns Promise
   */
  public async createBookmark({ email, symbol, name, category }: createBookmarkQueryProps) {
    const bookmark = await Bookmark.findOne({ email, symbol, name, category });

    if (bookmark) {
      return false;
    }

    return Bookmark.create({ email, symbol, name, category });
  }

  public async deleteBookmark({ email, symbol, name, category }: deleteBookmarkQueryProps) {
    const bookmark = await Bookmark.findOneAndRemove({ email, symbol, name, category });

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

    if (bookmarks !== null) {
      return bookmarks;
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
