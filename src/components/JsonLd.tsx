import React from 'react';
import { PRODUCTS, STORE_INFO } from '@/lib/mock-data';

export function JsonLd() {
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: STORE_INFO.name,
    description: STORE_INFO.tagline,
    url: 'https://babateeglobal.com',
    telephone: STORE_INFO.phone,
    email: STORE_INFO.email,
    priceRange: '₦₦₦',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Online Payment',
    currenciesAccepted: 'NGN',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STORE_INFO.address,
      addressLocality: STORE_INFO.city,
      addressRegion: STORE_INFO.state,
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.1333,
      longitude: 4.25,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:30',
        closes: '19:30',
      },
    ],
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PRODUCTS.slice(0, 15).map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: prod.name,
        image: prod.imageUrl,
        description: prod.description,
        brand: {
          '@type': 'Brand',
          name: prod.brand,
        },
        offers: {
          '@type': 'Offer',
          url: `https://babateeglobal.com/#product-${prod.slug}`,
          priceCurrency: 'NGN',
          price: prod.priceNGN,
          itemCondition:
            prod.condition === 'brand_new'
              ? 'https://schema.org/NewCondition'
              : 'https://schema.org/RefurbishedCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: STORE_INFO.name,
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
    </>
  );
}
