// Angular
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrganizationQuery, OrganizationDocumentWithDates } from '@blockframes/organization/+state';

@Component({
  selector: 'financiers-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  public org$ = this.orgQuery.selectActive();

  constructor(private orgQuery: OrganizationQuery) { }
}
