import { Pipe, PipeTransform } from '@angular/core';
import {
  ADMIN,
  CONTENT_CREATOR,
  MODERATOR,
  PROMOTER,
  USER,
} from '../services/auth.service';

@Pipe({
  name: 'displayRole',
})
export class DisplayRolePipe implements PipeTransform {
  transform(role: string): string {
    switch (role) {
      case ADMIN:
        return 'Admin';
      case CONTENT_CREATOR:
        return 'Content Creator';
      case PROMOTER:
        return 'Promoter';
      case USER:
        return 'User';
      case MODERATOR:
        return 'Moderator';
      case '':
        return '';
      default:
        throw new Error(`Can not display role ${role}`);
    }
  }
}
