import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Bookmark from '../model/BookmarkModel';

interface QueryProps {
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
  public async createBookmark({ email, symbol, name, category }: QueryProps) {
    const bookmark = await Bookmark.findOne({ email, symbol, name, category });

    if (bookmark) {
      throw new Error('Bookmark already exists');
    }

    return Bookmark.create({ email, symbol, name, category });
  }

  /**
   * @description email을 받아 Bookmark documents 들을 리턴하는 service
   * @param email string
   * @returns BookmarkDocument
   */

  public async getBookmarks(email: string) {
    const bookmarks = await Bookmark.find({ email });

    if (bookmarks) {
      return bookmarks;
    }

    throw new Error('Getting bookmarks was failed in bookmark service');
  }
}
