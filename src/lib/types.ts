export type DeviceCategory = string;

export type DeviceCondition = 'brand_new' | 'uk_used_a_plus' | 'uk_used_a';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Dell' | 'HP' | 'Lenovo';
  category: DeviceCategory;
  productType?: 'phones' | 'tablets' | 'laptops' | 'audio' | 'watches';
  condition: DeviceCondition;
  conditionLabel: string;
  priceNGN: number;
  originalPriceNGN?: number;
  storage: string; // e.g. "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"
  ram?: string;
  processor?: string;
  batteryHealth?: number; // e.g. 88, 94, 100 for UK Used / Brand New
  colors: string[];
  colorHexes: string[];
  imageUrl: string;
  tagline: string;
  description: string;
  isFeatured?: boolean;
  isHero?: boolean;
  warranty: string;
  inStock: boolean;
  specs: {
    display: string;
    camera?: string;
    battery?: string;
    os: string;
    warrantyStatus: string;
  };
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  dispatch: string;
}

export const STORE_INFO: StoreInfo = {
  name: "BABA TEE GLOBAL",
  tagline: "Premium Flagship Tech. UK Used & Brand New Certified.",
  address: "UnderG Junction, Adjacent LAUTECH Campus",
  landmark: "UnderG Area",
  city: "Ogbomoso",
  state: "Oyo State",
  country: "Nigeria",
  phone: "+234 812 345 6789",
  whatsapp: "+2348123456789",
  email: "sales@babateeglobal.com",
  dispatch: "Nationwide Insured Delivery (South-West, Lagos, Abuja, Port Harcourt & All States)"
};
