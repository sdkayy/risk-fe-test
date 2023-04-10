import { useAppState } from '@risk/hooks/useAppState';
import React from 'react';
import { TokenSelect } from '../TokenSelect';
import { Swap } from '../Icons/Swap';

export const Header = () => {
  const { tokenOne, tokenTwo, updateToken } = useAppState();

  return (
    <div
      className={
        'w-full text-white flex flex-row gap-2 items-center sticky top-0'
      }
    >
      <div className="flex-1">
        <TokenSelect token={tokenOne} updateToken={updateToken} slot={1} />
      </div>
      <Swap className={'w-5 h-5'} />
      <div className="flex-1">
        <TokenSelect token={tokenTwo} updateToken={updateToken} slot={2} />
      </div>
    </div>
  );
};
