import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSnackBarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatChipsModule,
  MatMenuModule,
} from '@angular/material';

import { BlockieModule } from '@blockframes/ui';

import { AskPasswordComponent } from './ask-password/ask-password.component';
import { WalletRecoverComponent } from './recover/recover.component';
import { WalletViewComponent } from './wallet-view/wallet-view.component';
import { WalletWidgetComponent } from './wallet-widget/wallet-widget.component';
import { EncryptingChipsComponent } from './encrypting-chips/encrypting-chips.component';


export const walletRoutes: Routes = [
  { path: '', component: WalletViewComponent },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlockieModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatChipsModule,
    MatMenuModule,
    RouterModule.forChild(walletRoutes),
  ],
  entryComponents: [
    AskPasswordComponent,
    WalletRecoverComponent,
    WalletViewComponent,
    WalletWidgetComponent,
    EncryptingChipsComponent,
  ],
  declarations: [
    AskPasswordComponent,
    WalletRecoverComponent,
    WalletViewComponent,
    WalletWidgetComponent,
    EncryptingChipsComponent,
  ],
  exports: [
    AskPasswordComponent,
    WalletRecoverComponent,
    WalletViewComponent,
    WalletWidgetComponent,
    EncryptingChipsComponent,
  ],
})
export class WalletModule {}
