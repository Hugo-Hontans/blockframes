import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Key, KeyManagerService, KeyManagerQuery } from "../../key-manager/+state";
import { WalletQuery, InputMessage } from "../+state";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

enum steps {
  import,
  password,
  end
}

@Component({
  selector: 'wallet-import-key',
  templateUrl: './wallet-import-key.component.html',
  styleUrls: ['./wallet-import-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletImportKeyComponent implements OnInit {

  steps = steps;
  step = this.steps.import;
  mnemonic: string;
  message = <InputMessage> {
    headline: 'Congratulation !',
    subline: 'Your key was successfully imported',
    isError: false,
  };
  isEncrypting$ = new Observable<boolean>();

  constructor(
    private router: Router,
    private walletQuery: WalletQuery,
    private keyQuery: KeyManagerQuery,
    private service: KeyManagerService,
  ) {}

  ngOnInit() {
    this.isEncrypting$ = this.keyQuery.selectLoading();
  }

  handleImportKey(key: Key) {
    this.service.storeKey(key);
    this.step = this.steps.end;
  }

  handleImportMnemonic(mnemonic: string) {
    this.mnemonic = mnemonic;
    this.step = this.steps.password;
  }

  async handlePassword(encryptionPassword: string) {
    const { ensDomain } = this.walletQuery.getValue();
    const keyName = this.service.getDefaultKeyName(ensDomain);
    this.service.importFromMnemonic(keyName, ensDomain, this.mnemonic, encryptionPassword)
      .then(key => this.service.storeKey(key));
    this.step = this.steps.end;
  }

  handleRedirection() {
    this.router.navigateByUrl('/layout/o/account/wallet'); // TODO handle dynamic redirect from state : issue#617
  }
}