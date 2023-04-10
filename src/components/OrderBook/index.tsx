import { IOrder } from '@risk/hooks/useAppState';
import { normalize } from '@risk/utils/token';

export const OrderBook = ({ orders }: { orders: Map<string, IOrder> }) => {
  return (
    <div className="w-full flex flex-col">
      {[...orders.keys()].map((orderHash: string) => {
        const order: IOrder | undefined = orders.get(orderHash);
        console.log(order);
        if (!order) {
          return null;
        }

        return (
          <div className="w-full flex items-center">
            <p className="text-white">
              {normalize(order?.makerAmount) / normalize(order?.takerAmount)}
            </p>
          </div>
        );
      })}
    </div>
  );
};
