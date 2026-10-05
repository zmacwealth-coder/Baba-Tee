import { neon } from '@neondatabase/serverless';
import { PRODUCTS } from './mock-data';
import { Product } from './types';

// Connect to Neon Postgres if DATABASE_URL is provided, otherwise serve verified catalog
export async function getProducts(filters?: {
  category?: string;
  condition?: string;
  storage?: string;
  search?: string;
  sortBy?: string;
}): Promise<Product[]> {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    try {
      const sql = neon(databaseUrl);
      const rows = await sql`SELECT * FROM products ORDER BY id DESC`;
      if (rows && rows.length > 0) {
        return rows as unknown as Product[];
      }
    } catch (error) {
      console.warn('Neon DB query fallback to local catalog:', error);
    }
  }

  // In-memory filtered catalog
  let filtered = [...PRODUCTS];

  if (filters?.category && filters.category !== 'all') {
    const cat = filters.category.toLowerCase();
    if (cat === 'apple') {
      filtered = filtered.filter(p => p.brand === 'Apple');
    } else if (cat === 'samsung') {
      filtered = filtered.filter(p => p.brand === 'Samsung');
    } else if (cat === 'pixel') {
      filtered = filtered.filter(p => p.brand === 'Google');
    } else if (cat === 'laptops') {
      filtered = filtered.filter(p => p.category === 'laptops' || p.category === 'macbooks' || p.productType === 'laptops');
    } else {
      filtered = filtered.filter(p => p.category === cat || p.productType === cat);
    }
  }

  if (filters?.condition && filters.condition !== 'all') {
    filtered = filtered.filter(p => p.condition === filters.condition);
  }

  if (filters?.storage && filters.storage !== 'all') {
    filtered = filtered.filter(p => p.storage.toLowerCase() === filters.storage?.toLowerCase());
  }

  if (filters?.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (filters?.sortBy === 'price-low') {
    filtered.sort((a, b) => a.priceNGN - b.priceNGN);
  } else if (filters?.sortBy === 'price-high') {
    filtered.sort((a, b) => b.priceNGN - a.priceNGN);
  } else if (filters?.sortBy === 'battery') {
    filtered.sort((a, b) => (b.batteryHealth ?? 0) - (a.batteryHealth ?? 0));
  }

  return filtered;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) || null;
}
