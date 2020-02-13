import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContractForm } from '../../form/contract.form';
import { Movie } from '@blockframes/movie';
import { ContractTunnelComponent, DealControls } from '../contract-tunnel.component';
import { Observable } from 'rxjs';
import { FormEntity } from '@blockframes/utils';
import { FormControl } from '@angular/forms';
import { ContractVersionPriceControl, ContractVersionForm } from '@blockframes/contract/version/form';
import { MovieCurrenciesSlug } from '@blockframes/utils/static-model';
import { displayPaymentSchedule, displayTerms } from '../utils';

@Component({
  selector: 'contract-tunnel-summary-mandate',
  templateUrl: './summary-mandate.component.html',
  styleUrls: ['./summary-mandate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryMandateComponent implements OnInit {

  public movies$: Observable<Movie[]>;
  public version: ContractVersionForm;
  public dealForms: FormEntity<DealControls>;
  public form: ContractForm;
  public parties: { licensee: FormControl[], licensor: { subRole: FormControl, displayName: FormControl}[] };
  public terms: string;
  public price: ContractVersionPriceControl;
  public deals: Record<string, string> = {}
  public currency: MovieCurrenciesSlug;
  public payments: { type: string, list: string[] } = { type: '', list: [] };

  constructor(private tunnel: ContractTunnelComponent) { }

  ngOnInit() {
    // Need to create it in the ngOnInit or it's not updated
    this.movies$ = this.tunnel.movies$;
    this.dealForms = this.tunnel.dealForms;
    this.form = this.tunnel.contractForm;
    this.version = this.form.get('versions').last();
    // Parties
    this.parties = { licensee: [], licensor: [] };
    for (const party of this.form.get('parties').controls) {
      if (party.value.party.role === 'licensee') {
        this.parties.licensee.push(party.get('party').get('displayName'));
      } else if (party.value.party.role === 'licensor') {
        this.parties.licensor.push({
          displayName: party.get('party').get('displayName'),
          subRole: party.get('childRoles')
        })
      }
    }

    this.terms = displayTerms(this.version.get('scope').value);
    this.price = this.version.get('price').controls;
    this.currency = this.price.currency.value;

    // Distribution fees
    const { price, titles } = this.version.value;
    for (const movieId in titles) {
      if (price.commission) {
        // Title Distribution Fee
        const { commission, commissionBase } = titles[movieId].price;
        this.deals[movieId] = `${commission} Distribution fee on ${commissionBase}.`;
      } else {
        // Common Distribution Fee
        const { commission } = price;
        const { commissionBase } = titles[movieId].price;
        this.deals[movieId] = `${commission} Distribution fee on ${commissionBase}.`;
      }
    }

    this.payments = displayPaymentSchedule(this.version.value);
  }

}
