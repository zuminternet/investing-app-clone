import { Service } from 'zum-portal-core/backend/decorator/Alias';
import Bookmark from '../model/BookmarkModel';

interface QueryProps {
  email: string;
  symbol: string;
}

@Service()
export default class BookmarkService {
  /**
   * @description Bookmark document를 추가하는 service
   * @param param0
   * @returns
   */
  public async createBookmark({ email, symbol }: QueryProps) {
    const bookmark = await Bookmark.findOne({ email, symbol });

    if (bookmark) {
      throw new Error('Bookmark already exists');
    }

    return Bookmark.create({ email, symbol });
  }
}
