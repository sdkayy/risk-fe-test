import { Layout } from '@risk/components/Layout';
import { OrderBook } from '@risk/components/OrderBook';
import { useAppState } from '@risk/hooks/useAppState';

export default function Home() {
  const { tokenOne, tokenTwo, bids, asks } = useAppState();

  const hasTokens = !!tokenOne?.address && !!tokenTwo?.address;

  return (
    <Layout>
      <main
        className={
          'flex min-h-screen flex-col items-center justify-between p-24'
        }
      >
        {hasTokens ? (
          <div className="w-full flex">
            <div className="flex-1">
              <OrderBook orders={bids} />
            </div>
            <div className="flex-1">
              <OrderBook orders={asks} />
            </div>
          </div>
        ) : (
          <p> Not yet fam bam</p>
        )}
      </main>
    </Layout>
  );
}
