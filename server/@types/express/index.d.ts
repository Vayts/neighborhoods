import { SimpleUserDto } from '../../src/dto/user.dto';


export {};

declare global {
  namespace Express {
    interface Request {
      user: SimpleUserDto;
    }
  }
}
