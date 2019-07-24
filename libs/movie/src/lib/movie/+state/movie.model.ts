import { Organization } from "@blockframes/organization";
import { Material } from "@blockframes/material";
import { Stakeholder } from "../../stakeholder/+state";

export interface MovieAvailability { //@todo #643 rename into movieSales
  movieId? : string;
  movie?: Partial<Movie>
  territories: string[];
  rights: string[];
  start: Date;
  end: Date;
  languages?: string[];
  exclusivity: boolean;
}

export interface Title {
  original: string;
  international?: string;
}

export interface Credit {
  firstName: string,
  lastName?: string,
  creditRole?: string,
}

export interface MovieMain {
  internalRef?: string,
  title: Title,
  directors?: Credit[],
  poster?: string,
  productionYear?: number,
  genres?: string[],
  originCountry?: string,
  languages?: string[],
  status?: string,
  productionCompanies?: Credit[],
  length?: number,
  shortSynopsis?: string,
}

export interface MoviePromotionalElements {
  images: string[],
  promotionalElements: {label: string, url: string}[],
}

export interface MoviePromotionalDescription {
  keyAssets: string[],
  keywords: string[],
}

export interface MovieSalesCast {
  credits: Credit[],
}

export interface MovieStory {
  synopsis: string,
  logline: string,
}

export interface Movie {
   // @todo #643 add new fields to Draw.io
  _type: 'movies',
  id: string,
  organization?: Organization,
  materials?: Material[];
  stakeholders?: Stakeholder[];
  availabilities: MovieAvailability[],

  // @todo #643 not main movie attributes WIP
  scoring: string,
  isan: string,
  broadcasterCoproducers: string[],
  color: string;
  certifications: string[],
  pegi: string,
  internationalPremiere: { name: string, year: number},
  originCountryReleaseDate: Date,
  prizes: {name: string, year: string, prize: string}[]
  dubbings: string[],
  subtitles: string[],

  ipId: string,
  directorNote: string,
  producerNote: string,
  goalBudget: number,
  movieCurrency: string,
  fundedBudget: number,
  breakeven: number,
  backendProfit: number,
  potentialRevenues: number,
  selectionCategories: string,
  deliveryIds: string[],


  // Sections
  main : MovieMain,
  story: MovieStory,
  promotionalElements: MoviePromotionalElements,
  promotionalDescription: MoviePromotionalDescription,
  salesCast: MovieSalesCast,
}

/**
 * A factory function that creates Movie
 */
export function createMovie(params?: Partial<Movie>) {
  return {
    deliveryIds: [],
    _type: 'movies',
    ...params
  } as Movie;
}
