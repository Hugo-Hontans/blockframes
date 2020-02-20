import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ContractQuery, ContractService, Contract, ContractStatus, ContractType, createContract, createVersionMandate } from '@blockframes/contract/contract/+state';
import { getContractLastVersion } from '@blockframes/contract/version/+state/contract-version.model';
import { map, switchMap } from 'rxjs/operators';
import { MovieService } from '@blockframes/movie';
import { DistributionDealService } from '@blockframes/movie/distribution-deals';
import { Subscription, combineLatest } from 'rxjs';
import { OrganizationQuery } from '@blockframes/organization';
import { Router, ActivatedRoute } from '@angular/router';

interface Tab {
  name: string;
  statuses?: ContractStatus[];
}

interface ContractTab {
  name: string;
  contracts: Contract[]
}

const contractTab: Tab[] = [
  {
    name: 'All'
  },
  {
    name: 'Draft',
    statuses: [
      ContractStatus.draft,
      ContractStatus.submitted,
    ]
  },
  {
    name: 'Offers',
    statuses: [
      ContractStatus.submitted,
      ContractStatus.undernegotiation,
      ContractStatus.waitingsignature
    ]
  },
  {
    name: 'Ongoing Deals',
    statuses: [
      ContractStatus.accepted,
      ContractStatus.waitingpayment,
      ContractStatus.paid
    ]
  },
  {
    name: 'Aborted Offers',
    statuses: [ContractStatus.rejected]
  }
];


/**
 * Returns a filtered list of contracts according to their statuses.
 * @param contracts List of contract to filter
 * @param statuses List of status to filter onto
 */
function filterByStatus(contracts: Contract[], statuses?: ContractStatus[]) {
  if (statuses) {
    const lastVersionStatus = (contract: Contract) => getContractLastVersion(contract).status;
    return contracts.filter(contract => statuses.includes(lastVersionStatus(contract)));
  }
  return contracts;
}

/**
 * Transform the list of tabs above into a list of contract tabs
 * @param allContracts The list of contracts
 */
function createContractTab(allContracts: Contract[]): ContractTab[] {
  return contractTab.map(tab => {
    const contracts = filterByStatus(allContracts, tab.statuses);
    return { name: tab.name, contracts };
  }) 
}


@Component({
  selector: 'catalog-deal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public tabs$ = this.query.sales$.pipe(map(createContractTab));

  constructor(
    private orgQuery: OrganizationQuery,
    private query: ContractQuery,
    private service: ContractService,
    private movieService: MovieService,
    private dealService: DistributionDealService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe on Movie & Deals
    this.sub = this.query.sales$.pipe(
      switchMap(contracts => combineLatest([
        this.movieService.syncContractsMovie(contracts),
        this.dealService.syncContractsDeals(contracts),
      ]))
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /** Create a sale and redirect to tunnel */
  async createSale() {
    const contractId = await this.service.create({ type: ContractType.sale });
    this.router.navigate(['../tunnel/contract', contractId, 'sale'], { relativeTo: this.route })
  }

  /**
   * Create a mandate if organization doesn't have one yet
   * @note This method is not implemented yet because Mandate page doesn't exist yet
   */
  async createMandate() {
    const orgId = this.orgQuery.getActiveId();
    const mandate = await this.service.getMandate(orgId);
    if (mandate) {
      this.router.navigate([mandate.id], { relativeTo: this.route })
    } else {
      const contractId = await this.service.create({ type: ContractType.mandate });
      this.router.navigate(['../tunnel/contract', contractId, 'mandate'], { relativeTo: this.route })
    }
  }
}
