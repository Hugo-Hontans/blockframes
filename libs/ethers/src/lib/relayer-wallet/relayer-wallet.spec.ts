import { Provider } from '../provider/provider';
import { RelayerWallet } from './relayer-wallet';
import { Relayer } from '../relayer/relayer';
import { utils } from 'ethers';

describe('RelayerWallet', () => {
  let name: string;
  let relayer: Relayer;
  let provider: Provider;
  let keystore: string;
  let password: string;
  let mnemonic: string;
  let relayerWallet: RelayerWallet;

  beforeAll(() => {
    name = 'harrypotter';
    relayer = new Relayer();
    provider = new Provider();
    keystore =
      '{"address":"ba2b47917c4ece6d6eb7606a54228bf278614a00","id":"1b6ba023-e09a-48ca-beb4-a5a7dd74aaeb","version":3,"Crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"15ee2d42316e8b6ded2ed2f55509a779"},"ciphertext":"0cbed153a38e7259b62668eb7fba4dee6eb5ddadbcbd1b7ea0096b8fbfb5d963","kdf":"scrypt","kdfparams":{"salt":"36418bac9d2c87bd3da5885062950f1a6712c0fee2ce962239a8de1d09bc531e","n":131072,"dklen":32,"p":1,"r":8},"mac":"48ba5859a1699e86c22abb7d126ae55a5441fca5c520cd9bb13d6fd2bc6d072b"},"x-ethers":{"client":"ethers.js","gethFilename":"UTC--2019-04-02T09-19-37.0Z--ba2b47917c4ece6d6eb7606a54228bf278614a00","mnemonicCounter":"f3eee205849942fb5dea9c7433c238d0","mnemonicCiphertext":"2c828aec4703b4058e58f569a40b38ff","version":"0.1"}}';
    password = 'superPassword';
    mnemonic = 'library upon horse concert horse crunch copy dice flash design drastic cushion';
    relayerWallet = new RelayerWallet(provider, relayer);
  });

  describe('login', () => {
    test('from mnemonic', async () => {
      await relayerWallet.loginFromMnemonic(name, mnemonic);
      const address = await relayerWallet.getAddress();
      expect(relayerWallet).toBeDefined();
      expect(address).toBe('0xbA2b47917c4ecE6d6Eb7606A54228Bf278614a00');
    });
    test('from encrypted keystore', async () => {
      const relayerWalletK = new RelayerWallet(provider, relayer);
      await relayerWalletK.loginFromEncryptedJSON(name, keystore, password);
      const address = await relayerWalletK.getAddress();
      expect(relayerWalletK).toBeDefined();
      expect(address).toBe('0xbA2b47917c4ecE6d6Eb7606A54228Bf278614a00');
    });
  });

  describe('signMessage', () => {
    test('string message', async () => {
      const signature = await relayerWallet.signMessage(name);
      expect(signature).toBe(
        '0xbe82270cc1a16e1403a407a3e13a0b00616f6d83e0ef62261f06fbb6695d8ac372f08836b6d18428cece767bd33346b1d166d62431419ec3ee84e54a2e07d7701b'
      );
    });
    test('hex string message', async () => {
      const signature = await relayerWallet.signMessage('0x123456789');
      expect(signature).toBe(
        '0xc7502f37890d4c620a9584c4755a411cdebf57d85667ded154ce18d5f82db7477d8a97332273a6aebd122d23c9a61531ff417d26241d9593b21fe9fab70735b51c'
      );
    });
    test('arrayish message', async () => {
      const signature = await relayerWallet.signMessage(utils.arrayify('0x123456789'));
      expect(signature).toBe(
        '0xc7502f37890d4c620a9584c4755a411cdebf57d85667ded154ce18d5f82db7477d8a97332273a6aebd122d23c9a61531ff417d26241d9593b21fe9fab70735b51c'
      );
    });
  });

  describe('sendTransaction', () => {
    test('mock relayer : should be ok', async () => {
      const response = await relayerWallet.sendTransaction({});
      expect(response).toEqual({ data: 'mock erc1077 send' });
    });
  });
});
