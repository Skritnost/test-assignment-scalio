import { TableInterface } from '../interfaces/table.interface';
import { UserInterface } from '../interfaces/user.interface';

export class UserTableModel {
  id: TableInterface<number> = { value: null, label: 'Id', isHidden: true };
  login: TableInterface<string> = { value: null, label: 'Login'};
  type: TableInterface<string> = { value: null, label: 'Type'};
  avatarUrl: TableInterface<string> = { value: null, label: 'Avatar URL', isUrl: true };

  constructor ({ id, login, avatar_url, type }: UserInterface) {
    this.id.value = id;
    this.avatarUrl.value = avatar_url;
    this.login.value = login;
    this.type.value = type;
  }
}
