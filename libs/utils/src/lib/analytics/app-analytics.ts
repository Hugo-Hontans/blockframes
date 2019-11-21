import { ANALYTICS, Analytics } from './analytics.module';
import { Inject } from '@angular/core';
import { AuthQuery } from '@blockframes/auth';

export class AppAnalytics {
  constructor(@Inject(ANALYTICS) public analytics: Analytics, private authQuery: AuthQuery) {}

  public event(name: string, params: Record<string, any>) {
    try {
      this.analytics.logEvent(name, { ...params, uid: this.authQuery.userId });
    } catch {
      this.analytics.logEvent(name, { ...params });
    }
  }
}
