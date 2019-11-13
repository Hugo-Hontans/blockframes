import { Injectable } from '@angular/core';
import { CollectionGuard, CollectionGuardConfig } from 'akita-ng-fire';
import { MaterialState, MaterialStore } from '../+state/material.store';
import { MaterialService } from '../+state/material.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DeliveryQuery } from '../../delivery/+state/delivery.query';

@Injectable({ providedIn: 'root' })
@CollectionGuardConfig({ awaitSync: true })
export class DeliveryMaterialsGuard extends CollectionGuard<MaterialState> {
  constructor(
    service: MaterialService,
    private store: MaterialStore,
    private deliveryQuery: DeliveryQuery
  ) {
    super(service);
  }

  sync(next: ActivatedRouteSnapshot) {
    this.store.reset();
    return this.deliveryQuery.getActive().mustBeSigned
      ? this.service.syncCollection(`deliveries/${next.params.deliveryId}/materials`)
      : this.service.syncCollection(`movies/${next.params.movieId}/materials`, ref =>
          ref.where('deliveryIds', 'array-contains', next.params.deliveryId)
          );
  }
}
