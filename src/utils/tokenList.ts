import { IToken } from '@risk/hooks/useAppState';

export const TOKEN_LIST: IToken[] = [
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    name: 'Dai',
    symbol: 'DAI',
    decimals: 18,
  },
  {
    address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
    name: 'Maker',
    symbol: 'MKR',
    decimals: 18,
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    name: 'Wrapped Ethereum',
    symbol: 'WETH',
    decimals: 18,
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
  },
];
