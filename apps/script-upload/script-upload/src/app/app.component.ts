import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthQuery, User } from '@blockframes/auth';
import { ScriptHashService } from '@blockframes/script';
import { Observable } from 'rxjs';
import { utils } from 'ethers';

@Component({
  selector: 'script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public user$: Observable<User>;

  constructor(
    private auth: AuthQuery,
    private snackBar: MatSnackBar,
    private scripts: ScriptHashService
  ) {}

  async ngOnInit() {
    this.user$ = this.auth.select(state => state.user);
  }

  public async uploaded(content: ArrayBuffer) {
    const bytes = new Uint8Array(content);
    const hash = utils.keccak256(bytes);
    this.snackBar.open(`Your hash: ${hash}`, 'close');

    const receipt = await this.scripts.addScript(hash);
    this.snackBar.open(`Your TX hash: ${receipt.hash}`, 'close');
  }
}
