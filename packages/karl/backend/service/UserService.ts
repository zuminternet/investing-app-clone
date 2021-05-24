import { User } from '../model'
import { Service } from 'zum-portal-core/backend/decorator/Alias'




@Service()
export default class UserService {
  constructor() {}


  public async createUser({name, password, email}) {
    const user = await User.findOne().or([{ name, email }])

    if (user) {
      throw new Error('user already exists')
    }

    return await User.create({name, password, email})
  }
}