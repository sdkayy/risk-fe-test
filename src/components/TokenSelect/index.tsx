import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from '../Icons/ChevronDown';
import { IToken } from '@risk/hooks/useAppState';
import { useSpring, animated } from 'react-spring';
import { TOKEN_LIST } from '@risk/utils/tokenList';
import { TokenIcon } from '../Icons/icon';

interface TokenSelectProps {
  token: Partial<IToken>;
  updateToken: (newToken: Partial<IToken>, tokenIndex: number) => void;
  slot: number;
}

export const TokenSelect = ({ token, updateToken, slot }: TokenSelectProps) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const [style, animate] = useSpring(() => ({ height: '0px' }), []);
  const ref = useRef<HTMLDivElement>(null);
  const fragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (fragRef.current && !fragRef.current.contains(event.target)) {
        setIsShowingOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setIsShowingOptions]);

  useEffect(() => {
    animate({
      height: (isShowingOptions ? ref?.current?.offsetHeight : 0) + 'px',
    });
  }, [animate, ref, isShowingOptions]);

  return (
    <div ref={fragRef} className="relative bg-[#131313]/[75]">
      <span
        onClick={() => {
          setIsShowingOptions(!isShowingOptions);
        }}
        className="w-full px-2 py-1 items-center font-bold text-white flex justify-between hover:text-black hover:bg-white transition-all cursor-pointer"
      >
        <div className={'flex gap-2 items-center'}>
          <TokenIcon symbol={token?.symbol || 'none'} className={'w-4 h-4'} />
          <p>{token?.name || 'Token Name Here'}</p>
        </div>
        <div>
          <ChevronDown className={'w-4 h-4'} />
        </div>
      </span>

      {isShowingOptions && (
        <animated.div
          className="absolute overflow-hidden min-w-[6.5rem] z-50 bg-black border border-white w-full"
          style={{
            ...style,
          }}
        >
          <div ref={ref} className="flex flex-col w-full">
            {TOKEN_LIST.map((token: IToken) => {
              return (
                <a
                  key={token.address}
                  className="px-4 py-2 font-bold text-white transition-all bg-black cursor-pointer hover:text-black hover:bg-white flex gap-2 items-center"
                  onClick={() => {
                    setIsShowingOptions(false);
                    updateToken(token, slot);
                  }}
                >
                  <TokenIcon symbol={token.symbol} className={'w-4 h-4'} />
                  <span className="flex gap-2 items-center">
                    {token.name}
                    <span className="opacity-50 text-xs">{token.symbol}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </animated.div>
      )}
    </div>
  );
};
