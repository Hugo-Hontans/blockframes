import { ContractFunction } from 'ethers';

export interface INgContract {
  [methods: string]: ContractFunction;
}

export interface Addresses {
  mainnet?: string;
  ropsten?: string;
  kovan?: string;
  rinkeby?: string;
  local?: string;
}

/** Regular Ethereum transaction */
export interface Tx {
  to: string; // address
  value: string; // uint256
  data: string; // bytes
}

/** A Meta Transaction that encapsulate a regular tx (it will need a signatures before being sent)*/
export interface MetaTx extends Tx {
  nonce: string; // uint256
  gasPrice: string; // uint256
  gasToken: string; // address
  gasLimit: string; // uint256
  operationType: string; // uint8
}

/** A Meta Transaction with the user signature (ready to be sent) */
export interface SignedMetaTx extends MetaTx {
  signatures: string; // bytes
}

/** A message to display to the user at the end of a tunnel */
export interface InformationMessage {
  headline: string;
  subline: string;
  isError: boolean;
}

export interface LocalTx extends Tx {
  message: InformationMessage;
  callback: (...args) => void;
}

/** The Wallet structure in the state
* (**DO NOT CONFUSE WITH ETHERS'S WALLET**,
* in Blockframes ethers's wallet will always be called `EthersWallet`)
*/
export interface Wallet {
  ensDomain: string,
  address: string,
  hasERC1077: boolean,
  tx: LocalTx,
}