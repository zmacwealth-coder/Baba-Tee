import { getProducts } from '@/lib/db';
import { GadgetStoreApp } from '@/components/GadgetStoreApp';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const products = await getProducts();

  return <GadgetStoreApp initialProducts={products} />;
}
