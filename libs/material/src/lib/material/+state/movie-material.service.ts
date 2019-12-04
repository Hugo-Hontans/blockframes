import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Material, createMaterial, MaterialStatus } from './material.model';
import { MaterialState, MaterialStore } from './material.store';
import { MovieQuery } from '@blockframes/movie';
import { Delivery } from '../../delivery/+state/delivery.model';

@Injectable({
  providedIn: 'root'
})
@CollectionConfig({ path: 'movies/:movieId/materials' })
export class MovieMaterialService extends CollectionService<MaterialState> {
  constructor(store: MaterialStore, private movieQuery: MovieQuery) {
    super(store);
  }

  get path() {
    const movieId = this.movieQuery.getActiveId();
    return `movies/${movieId}/materials`;
  }

  /** Returns a material to be pushed in a formGroup. */
  public createMaterial(): Material {
    const id = this.db.createId();
    return createMaterial({ id });
  }

  /** Deletes material of the movie sub-collection in firebase. */
  public async delete(materialId: string, delivery: Delivery) {
    const material = await this.getValue(`${materialId}`);

    // Checks if this material belongs to multiple delivery.
    // If so, update the deliveryIds, otherwise just delete it.
    if (material.deliveryIds.length === 1) {
      this.remove(material.id);
    } else {
      this.update(material.id, {
        deliveryIds: material.deliveryIds.filter(id => id !== delivery.id)
      });
    }
    this.db.doc(`deliveries/${delivery.id}`).update({ validated: [] });
  }

  /** Update materials of a movie (specific fields like 'owner', 'storage', 'stepId'). */
  public updateMovieMaterials(materials: Material[]) {
    // TODO: issue#1352 use a multiple update
    materials.forEach(material => this.update(material.id, material));
  }

  /** Update materials of a delivery (materials loaded from movie). */
  public async updateMaterials(materials: Material[], delivery: Delivery) {
    const movieMaterials = await this.getValue();

    materials.forEach(material => {
      const sameIdMaterial = movieMaterials.find(movieMaterial => movieMaterial.id === material.id);
      const sameValuesMaterial = movieMaterials.find(movieMaterial =>
        this.isTheSame(movieMaterial, material)
      );
      const isNewMaterial = !sameIdMaterial && !sameValuesMaterial;

      // If material from the list have no change and already exists, just return.
      const isPristine =
        !!sameIdMaterial && !!sameValuesMaterial && sameIdMaterial.id === sameValuesMaterial.id;
      if (isPristine) {
        return;
      }

      // We check if material is brand new. If so, we just add it to database and return.
      if (isNewMaterial) {
        this.setNewMaterial(material, delivery);
        return;
      }

      // If there already is a material with same properties (but different id), we merge this
      // material with existing one, and push the new deliveryId into deliveryIds.
      if (!!sameValuesMaterial) {
        this.updateMaterialDeliveryIds(sameValuesMaterial, delivery);
      }

      // If values are not the same, this material is considered as new and we have to create
      // and set a new material (with new Id).
      if (!sameValuesMaterial) {
        const newMaterial = createMaterial({ ...material, id: this.db.createId() });
        this.setNewMaterial(newMaterial, delivery);
      }

      // If the Id is the same that an other material, after had created or updated, we have to remove the old material
      if (!!sameIdMaterial) {
        this.removeMaterial(material, delivery, sameIdMaterial);
      }
    });
  }

  /** Create a material in a movie. */
  public setNewMaterial(material: Material, delivery: Delivery) {
    this.add({ ...material, deliveryIds: [delivery.id] });
  }

  /**  Checks properties of two material to tell if they are the same or not. */
  public isTheSame(matA: Material, matB: Material): boolean {
    const getProperties = ({ value, description, category, stepId }: Material) => ({
      value,
      description,
      category,
      stepId
    });
    return JSON.stringify(getProperties(matA)) === JSON.stringify(getProperties(matB));
  }

  /** Update deliveryIds of a material when this one has the same values that an other. */
  public updateMaterialDeliveryIds(sameValuesMaterial: Material, delivery: Delivery) {
    if (!sameValuesMaterial.deliveryIds.includes(delivery.id)) {
      this.update(sameValuesMaterial.id, {
        deliveryIds: [...sameValuesMaterial.deliveryIds, delivery.id]
      });
    }
  }

  /** Checks if the material belongs to multiple delivery, if so: update the deliveryIds, otherwise just delete it. */
  public removeMaterial(material: Material, delivery: Delivery, sameIdMaterial: Material) {
    if (sameIdMaterial.deliveryIds.length === 1) {
      return this.remove(material.id);
    } else {
      return this.update(material.id, {
        deliveryIds: sameIdMaterial.deliveryIds.filter(id => id !== delivery.id)
      });
    }
  }

  /** Update the property status of selected materials. */
  public updateStatus(materials: Material[], status: MaterialStatus) {
    materials.forEach(material => this.update(material.id, { status }));
  }

  /** Update the property isOrdered of selected materials. */
  public updateIsOrdered(materials: Material[]) {
    materials.forEach(material => this.update(material.id, { isOrdered: !material.isOrdered }));
  }

  public updateIsPaid(materials: Material[]) {
    materials.forEach(material => this.update(material.id, { isPaid: !material.isPaid }));
  }
}
