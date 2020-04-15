import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { InvitationStatus } from '../+state';
import { CommonModule } from '@angular/common';

/** Return the right icon name depending on the status */
@Pipe({
  name: 'statusIcon',
  pure: true
})
export class StatusIconPipe implements PipeTransform {

  transform(status: InvitationStatus): 'check_circle' | 'cross' | 'access_time' {
    switch (status) {
      case 'accepted': return 'check_circle';
      case 'declined': return 'cross';
      case 'pending': return 'access_time';
    }
  }
}
@Pipe({
  name: 'statusColor',
  pure: true
})
export class StatusColorPipe implements PipeTransform {

  transform(status: InvitationStatus): 'primary' | 'warn' | '' {
    switch (status) {
      case 'accepted': return 'primary';
      case 'declined': return 'warn';
      case 'pending': return '';
    }
  }
}


@NgModule({
  imports: [CommonModule],
  declarations: [StatusIconPipe, StatusColorPipe],
  exports: [StatusIconPipe, StatusColorPipe],
})
export class StatusModule {}