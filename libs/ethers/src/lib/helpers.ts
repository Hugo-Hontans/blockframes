import { toASCII } from "punycode";
import { keccak256 } from '@ethersproject/keccak256'
import { BigNumber } from '@ethersproject/bignumber'
import { Filter } from '@ethersproject/abstract-provider'
import { Provider, InfuraProvider } from '@ethersproject/providers'

import { toUtf8Bytes } from '@ethersproject/strings'
import { bytecode as ERC1077_BYTECODE } from '@blockframes/smart-contracts/ERC1077.json';

/** instantiate a Fallback provider from the wanted network */
export function getProvider(network: string) {

  // we only use these providers, because the other doesn't supports Goerli
  const infura = new InfuraProvider(network);

  // A Fallback provider is composed of an array of providers
  // for each query, every providers will be queried,
  // then we wait until a quorum (second params) is reached between these providers,
  // we can also (optionally) assign weight to each providers

  // this Fallback provider is optimized for speed, it will return the first answer it get back
  // if needed we could instead optimized it for consensus (i.e. wait until at least 2 providers agree on the answer)
  return infura;
}

/** Get first part of an ens domain : `alice.blockframes.eth` -> `alice` */
export function getNameFromENS(ensDomain: string) {
  return ensDomain.split('.')[0];
}

/**
 * Convert email to username and sanitize it:
 * convert to lower case punycode and replace special chars by their ASCII code
 * then add base ens domain
 * @example `漢micHel+9@example.com` -> `xn--michel439-2c2s.blockframes.eth`
 */
export function emailToEnsDomain(email: string, baseEnsDomain: string) {
  return toASCII(email.split('@')[0]).toLowerCase()
    .split('')
    .map(char => /[^\w\d-.]/g.test(char) ? char.charCodeAt(0) : char) // replace every non a-z or 0-9 chars by their ASCII code : '?' -> '63'
    .join('') + '.' + baseEnsDomain;
}

/** same as `emailToEnsDomain` but for org name
 * @see `emailToEnsDomain(email: string): string`
 */
export function orgNameToEnsDomain(orgName: string, baseEnsDomain: string) {
  return emailToEnsDomain(orgName.replace(' ', '-'), baseEnsDomain);
}

/**
 * This function precompute a contract address as defined in the EIP 1014 (Skinny Create 2)
 * @param ensDomain this is use as a salt (salt need to be unique for each user)
 * @param provider ethers provider
 */
export async function precomputeAddress(ensDomain: string, provider: Provider, factoryContract: string) {
  const factoryAddress = await provider.resolveName(factoryContract).then(address => address.substr(2));
  const salt = keccak256(toUtf8Bytes(getNameFromENS(ensDomain))).substr(2);
  const byteCodeHash = keccak256(`0x${ERC1077_BYTECODE}`).substr(2);

  const payload = `0xff${factoryAddress}${salt}${byteCodeHash}`;

  return `0x${keccak256(payload).slice(-40)}`; // first 40 bytes of the hash of the payload
}

/**
 * Transform a number into an hex string with a `0x` prefix
 * @example numberToHexString(1337) = '0x539'
 */
export function numberToHexString(num: number) {
  return BigNumber.from(num).toHexString();
}

/**
 * Transform a `0x` prefixed hex string into a 256 bits padded with 0
 * @param hexString a `0x` prefixed hex string
 */
export function padTo256Bits(hexString: string) {
  const hex = hexString.replace('0x', '');

  if (hex.length > 64) {
    throw new Error('The hex string cannot be more than 256 bits (\'0x\' + 64 hex chars)');
  }
  return `0x${hex.padStart(64, '0')}`; // pad with '0' until it has a length of 64 nibbles (32 bytes) (256 bits)
}

/**
 * Transform a number into an hex string with a `0x` prefix and pad it to 256bit
 */
export function numberTo256Bits(num: number) {
  const hex = numberToHexString(num);
  return padTo256Bits(hex);
}

/** instantiate an ethers event filter from some eth event topic */
export function getFilterFromTopics(address: string, topics: string[]): Filter {
  return {
    address,
    fromBlock: 0, toBlock: 'latest',
    topics
  }
}
