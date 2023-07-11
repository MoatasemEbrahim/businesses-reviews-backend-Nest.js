import { AuthUser } from '../../interfaces/user.interface';

export class SyncUserDto {
  secretKey: string;
  tenant: {
    id: string;
  };
  user: AuthUser;
}
