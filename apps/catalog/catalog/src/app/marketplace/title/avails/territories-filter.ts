import { DistributionDeal, getDealTerritories } from '@blockframes/movie/distribution-deals/+state';
import { TerritoriesSlug } from '@blockframes/utils/static-model';
import { AvailsSearch } from '@blockframes/catalog';
import { getExclusiveDeals, getDealsInDateRange, getDealsWithMedias } from '@blockframes/movie/distribution-deals/create/availabilities.util';
import { Model } from '@blockframes/utils/static-model/staticModels';
import { inDateRange } from '@blockframes/utils/common-interfaces/terms';

/**
 * Returns an array of unlicensed territories to display on the world map.
 * @param mandateDeals Mandate deals from the movie
 * @param territories All the territories
 */
export function getNotLicensedTerritories(
  filter: AvailsSearch,
  mandateDeals: DistributionDeal[],
  territories: Model['TERRITORIES']
): Model['TERRITORIES'] {

  const licensedTerritorySlugs = getLicensedTerritorySlugs(mandateDeals, filter)

  return territories.filter(territory => !licensedTerritorySlugs.includes(territory.slug));
}

/**
 * Returns an array of unavailable territories to display on the world map.
 * If the territory is licensed and has at least one deal running for the filter
 * terms and medias, then it can be displayed.
 * @param mandateDeals Mandate deals from the movie
 * @param territories All the territories
 * @param deals Sales deals from the movie
 */
export function getRightsSoldTerritories(
  filter: AvailsSearch,
  mandateDeals: DistributionDeal[],
  territories: Model['TERRITORIES'],
  deals: DistributionDeal[]
): Model['TERRITORIES'] {
  // Grab the territorySlugs from all sales deals, filtered with licensed territories.
  const territorySlugsWithDeals = getTerritorySlugsWithDeals(filter, mandateDeals, deals)
  // Filter again to only keep territories with ongoing sales.
  return territories.filter(territory => territorySlugsWithDeals.includes(territory.slug));
}

/**
 * Returns an array of available territories to display on the world map.
 * If the territory is licensed and has no deals running for the filter
 * terms and medias, then it can be displayed.
 * @param mandateDeals Mandate deals from the movie
 * @param territories All the territories
 * @param deals Sales deals from the movie
 */
export function getAvailableTerritories(
  filter: AvailsSearch,
  mandateDeals: DistributionDeal[],
  territories: Model['TERRITORIES'],
  deals: DistributionDeal[]
): Model['TERRITORIES'] {
  // Grab the territorySlugs from all sales deals, filtered with licensed territories.
  const territorySlugsWithoutDeals = getTerritorySlugsWithoutDeals(filter, mandateDeals, deals)
  // Filter again to only keep territories without any ongoing deals.
  return territories.filter(territory => territorySlugsWithoutDeals.includes(territory.slug));
}

/**
 * Returns an array of sales deals licensed territories.
 * @param mandateDeals Mandate deals from the movie
 * @param territories All the territories
 * @param deals Sales deals from the movie
 */
function getTerritorySlugsWithDeals(filter: AvailsSearch, mandateDeals: DistributionDeal[], salesDeals: DistributionDeal[]): TerritoriesSlug[] {
  const licensedTerritorySlugs = getLicensedTerritorySlugs(mandateDeals, filter);

  const matchingExclusivityDeals = getExclusiveDeals(salesDeals, filter.exclusivity);
  const matchingRangeDeals = getDealsInDateRange(filter.terms, matchingExclusivityDeals);
  const matchingDeals = getDealsWithMedias(filter.medias, matchingRangeDeals);

  const territorySlugsFromDeals: TerritoriesSlug[] = [];
  matchingDeals.forEach(deal => {
    const filteredTerritories = getDealTerritories(deal);
    territorySlugsFromDeals.push(...filteredTerritories);
  });

  // Keep territorySlug only if it is included in licensedTerritorySlugs.
  return territorySlugsFromDeals.filter(territorySlug => licensedTerritorySlugs.includes(territorySlug));
}

/**
 * Returns an array of licensed territories without sales.
 * @param mandateDeals Mandate deals from the movie
 * @param territories All the territories
 * @param deals Sales deals from the movie
 */
function getTerritorySlugsWithoutDeals(filter: AvailsSearch, mandateDeals: DistributionDeal[], salesDeals: DistributionDeal[]): TerritoriesSlug[] {
  const licensedTerritorySlugs = getLicensedTerritorySlugs(mandateDeals, filter);

  const matchingExclusivityDeals = getExclusiveDeals(salesDeals, filter.exclusivity);
  const matchingRangeDeals = getDealsInDateRange(filter.terms, matchingExclusivityDeals);
  const matchingDeals = getDealsWithMedias(filter.medias, matchingRangeDeals);

  const territorySlugsFromDeals: TerritoriesSlug[] = [];
  matchingDeals.forEach(deal => {
    const filteredTerritories = getDealTerritories(deal);
    territorySlugsFromDeals.push(...filteredTerritories);
  });

  // Keep all licensed territory slugs with no deals.
  return licensedTerritorySlugs.filter(territorySlug => !territorySlugsFromDeals.includes(territorySlug));
}

/**
 * Returns an array of slugs of eligible territories for a specific movie.
 * @param deals Mandate deals from the movie
 */
function getLicensedTerritorySlugs(mandateDeals: DistributionDeal[], filter: AvailsSearch): TerritoriesSlug[] {
  const licensedTerritorySlugs: TerritoriesSlug[] = [];

  // Iterate on every mandate deals of the movie
  mandateDeals.forEach(deal => {
    const hasMedias = filter.medias.every(media => deal.licenseType.includes(media));
    const hasTermsInRange = inDateRange(filter.terms, deal.terms);

    // If mandate contain all filter medias and filter
    // terms are in date range, deal territories are licensed.
    if (hasMedias && hasTermsInRange) {
      const filteredTerritories = getDealTerritories(deal)
      licensedTerritorySlugs.push(...filteredTerritories);
    }
  })

  return licensedTerritorySlugs;
}
