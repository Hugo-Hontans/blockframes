import { Injectable } from '@angular/core';
import { createMovieStakeholder, StakeholderService, Stakeholder } from '../../stakeholder/+state';
import { Movie, createMovie } from './movie.model';
import { FireQuery } from '@blockframes/utils';
import { PermissionsService, OrganizationQuery, Organization } from '@blockframes/organization';
import { MovieStore } from './movie.store';

@Injectable({ providedIn: 'root' })

export class MovieService {

  constructor(
  private db: FireQuery,
  private shService: StakeholderService,
  private organizationQuery: OrganizationQuery,
  private permissionsService: PermissionsService,
  private store: MovieStore,
  ) {}

  public async addMovie(original: string): Promise<Movie> {
    const id = this.db.createId();
    const organization = this.organizationQuery.getValue().org;
    const organizationDoc = this.db.doc<Organization>(`orgs/${organization.id}`);
    const movie: Movie = createMovie({ id, title: { original }});

    await this.db.firestore.runTransaction(async (tx: firebase.firestore.Transaction) => {
      const organizationSnap = await tx.get(organizationDoc.ref);
      const movieIds = organizationSnap.data().movieIds || [];

      // Create movie document and permissions
      await this.permissionsService.createDocAndPermissions<Movie>(movie, organization);

      // Create the first stakeholder in sub-collection
      await this.shService.addStakeholder(movie, organization, true);

      // Update the organization movieIds
      if (movieIds.includes(movie.id)) {
        return tx.update(organizationDoc.ref, {}); // every document read in a transaction must be written.
      }
      const nextMovieIds = [...movieIds, movie.id];
      tx.update(organizationDoc.ref, { movieIds: nextMovieIds })

    });
    return movie;
  }

  public update(id: string, movie: any) : Promise<void>{
    // we don't want to keep orgId in our Movie object
    if (movie.organization) delete movie.organization;
    if (movie.stakeholders) delete movie.stakeholders;
    if (movie.errors) delete movie.errors;

    return this.db.doc<Movie>(`movies/${id}`).update(movie);
  }

  public remove(movieId: string): Promise<void> {
    const organization = this.organizationQuery.getValue().org;
    const movieIds = organization.movieIds.filter(id => id !== movieId);
    const organizationDoc = this.db.doc<Organization>(`orgs/${organization.id}`);
    const movieDoc = this.db.doc<Movie>(`movies/${movieId}`);

    const batch = this.db.firestore.batch();
    // Delete the movie in movies collection
    batch.delete(movieDoc.ref);
    // Delete the movie id in organization.movieIds
    batch.update(organizationDoc.ref, { movieIds });
    // Remove the movie from the movies store
    // TODO: Wait for firestore response before removing the movie. => ISSUE#611
    this.store.remove(movieId);

    return batch.commit();
  }

}
