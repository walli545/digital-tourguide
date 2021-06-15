import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'oneOfRequiredRole',
})
export class OneOfRequiredRolePipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  async transform(possibleRoles: string[]): Promise<boolean> {
    const role = await this.authService.getRole();
    return possibleRoles.includes(role);
  }
}
