import { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export interface IToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface IOrder {
  chainId: number;
  verifyingContract: string;
  makerToken: string;
  takerToken: string;
  makerAmount: string;
  takerAmount: string;
  takerTokenFeeAmount: string;
  maker: string;
  taker: string;
  sender: string;
  feeRecipient: string;
  pool: string;
  expiry: string;
  salt: string;
  signature: {
    signatureType: number;
    v: number;
    r: string;
    s: string;
  };
}

export interface AppStateContext {
  tokenOne: Partial<IToken>;
  tokenTwo: Partial<IToken>;
  updateToken: (newToken: Partial<IToken>, tokenIndex: number) => void;
  asks: Map<string, IOrder>;
  bids: Map<string, IOrder>;
}

const AppStateContext = createContext<any>({});

export const useAppState = () => {
  const { tokenOne, tokenTwo, updateToken, asks, bids } =
    useContext<AppStateContext>(AppStateContext);

  return { tokenOne, tokenTwo, updateToken, asks, bids };
};

export const AppStateProvider = ({ children }: any) => {
  const [tokenOne, setTokenOne] = useState<Partial<IToken>>({});
  const [tokenTwo, setTokenTwo] = useState<Partial<IToken>>({});
  const [bids, setBids] = useState<Map<string, IOrder>>(
    new Map<string, IOrder>()
  );
  const [asks, setAsks] = useState<Map<string, IOrder>>(
    new Map<string, IOrder>()
  );

  const updateToken = (token: Partial<IToken>, tokenIndex: number) => {
    if (tokenIndex === 1) setTokenOne(token);
    if (tokenIndex === 2) setTokenTwo(token);
  };

  const setupOrderBook = async () => {
    const resp = await fetch(
      `https://api.0x.org/orderbook/v1?quoteToken=${tokenOne.address}&baseToken=${tokenTwo.address}`
    );

    const json = await resp.json();

    for (const _record of json.bids.records) {
      bids.set(_record.metaData.orderHash, _record.order);
    }

    for (const _record of json.asks.records) {
      asks.set(_record.metaData.orderHash, _record.order);
    }

    console.log(bids, asks);
  };

  useEffect(() => {
    if (tokenOne.address && tokenTwo.address) {
      // Do API CALL and setup websocket listener and maintain orders
      setupOrderBook();
    }
  }, [tokenOne, tokenTwo]);

  return (
    <AppStateContext.Provider
      value={{
        tokenOne,
        tokenTwo,
        updateToken,
        bids,
        asks,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
