import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NotificationQuery } from '@blockframes/notification';
import { map } from 'rxjs/operators';
import { ActivityTab } from '@blockframes/notification/activity-feed/activity-tabs/activity-tabs.component';

@Component({
  selector: 'catalog-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent {

  // App specific tabs
  public applicationTabs: ActivityTab[] = [
    {
      label: 'Offers and Deals',
      filters: ['newContract', 'contractInNegotiation']
    }
  ]

  public hasNotifications$ = this.notificationQuery.selectCount().pipe(map(count => !!count))

  constructor(private notificationQuery: NotificationQuery) {}
}
