import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService, AuthQuery } from '../../+state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordControl } from '@blockframes/utils/form/controls/password.control';
import { InvitationStatus } from '@blockframes/notification/invitation/+state/invitation.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'auth-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityComponent {
  public form = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl({ value: this.query.user.email, disabled: true }),
    generatedPassword: new FormControl(''),
    newPassword: new PasswordControl()
  });

  public isTermsChecked: boolean;

  constructor(
    private service: AuthService,
    private db: AngularFirestore,
    private query: AuthQuery,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public async update() {
    if (this.form.invalid) {
      this.snackBar.open('Please enter valid name and surname', 'close', { duration: 2000 });
      return;
    }
    try {
      await this.service.updatePassword(
        this.form.get('generatedPassword').value,
        this.form.get('newPassword').value
      );
      await this.service.update({
        name: this.form.get('name').value,
        surname: this.form.get('surname').value,
      });

      // Accept the invitation from the organization.
      // Don't use invitationService to avoid circulars dependencies between invitation, organization and auth service.
      const invitationsSnapshot = await this.db.firestore.collection('invitations').where('user.uid', '==', this.query.userId).get();
      const invitations = invitationsSnapshot.docs.map(doc => doc.data());
      const pendingInvitation = invitations.find(invitation => invitation.status === InvitationStatus.pending);
      await this.db.doc(`invitations/${pendingInvitation.id}`).update({ status: InvitationStatus.accepted });

      this.router.navigate(['/c'], { relativeTo: this.route });
    } catch (error) {
      this.snackBar.open(error.message, 'close', { duration: 5000 });
    }
  }

  /** Check the value of the boolean outputed by TermsAndConditionsComponent */
  public checkTermsOfUse(checked: boolean) {
    this.isTermsChecked = checked;
  }
}
