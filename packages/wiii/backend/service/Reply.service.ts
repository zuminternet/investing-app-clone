import {
  getMongoRepository as getRepository,
  getMongoManager as getManager,
  MongoRepository,
  getConnection,
  getCustomRepository,
} from 'typeorm';
import { Service } from 'zum-portal-core/backend/decorator/Alias';
// import { User } from '../db/entity/User.entity';
// import { UserRepository } from '../db/repository/User.repository';
// import { getMongoConnection, getRedisConnection } from '../db';

/**
 * ReplyService
 * @description
 * - 댓글 CRUD
 */
@Service()
export class ReplyService {
  constructor() {}
}
