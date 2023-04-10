import { Layout } from '@risk/components/Layout';
import { useAppState } from '@risk/hooks/useAppState';

export default function Home() {
  const { tokenOne, tokenTwo } = useAppState();

  const hasTokens = !!tokenOne?.address && !!tokenTwo?.address;

  return (
    <Layout>
      <main
        className={
          'flex min-h-screen flex-col items-center justify-between p-24'
        }
      >
        {hasTokens ? <p>Do compare cuh</p> : <p> Not yet fam bam</p>}
      </main>
    </Layout>
  );
}
