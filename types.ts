
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  badge?: string;
  badgeColor?: string;
}

export type ViewType = 'HOME' | 'PRODUCTS';

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
