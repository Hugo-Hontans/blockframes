import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvitationService } from '../+state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvitationDocument } from '../+state/invitation.firestore';

@Component({
  selector: 'invitation-item',
  templateUrl: './invitation-item.component.html',
  styleUrls: ['./invitation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitationItemComponent {
  @Input() invitation: InvitationDocument;
  @Input() inWidget: boolean;
  @Input() placeholderUrl: string;

  constructor(private service: InvitationService, private snackBar: MatSnackBar) { }

  /** Creates a message based on the invitation.type. */
  public get message(): string {
    switch (this.invitation.type) {
      case 'toWorkOnDocument':
        return 'You have been invited to work on a delivery.';
      case 'fromUserToOrganization':
        // TODO #1140 Put message in an other file dedicated to that
        return `${this.invitation.user.name} ${this.invitation.user.surname} wants to join your organization`;
      case 'fromOrganizationToUser':
        return `Your organization sent an invitation to this user email: ${this.invitation.user.email}`;
    }
  }

  public acceptInvitation(invitation: InvitationDocument) {
    try {
      this.service.acceptInvitation(invitation);
      this.snackBar.open('You accepted the invitation!', 'close', { duration: 5000 });
    } catch (error) {
      this.snackBar.open(error.message, 'close', { duration: 5000 });
    }
  }

  public declineInvitation(invitation: InvitationDocument) {
    try {
      this.service.declineInvitation(invitation);
      this.snackBar.open('You declined the invitation.', 'close', { duration: 5000 });
    } catch (error) {
      this.snackBar.open(error.message, 'close', { duration: 5000 });
    }
  }

  public get displayInvitationButtons(): boolean {
    return (
      this.invitation.type === 'fromUserToOrganization' &&
      this.invitation.status === 'pending'
    );
  }
}
