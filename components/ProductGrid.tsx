
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductGridProps {
  activeCategory: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ activeCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = new URL('http://localhost:3002/api/products');
        if (activeCategory && activeCategory !== '全部') {
          url.searchParams.append('category', activeCategory);
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-500">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-rose-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      <div className="relative aspect-[4/3] mb-6 bg-slate-100 overflow-hidden rounded-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
          style={{ backgroundImage: `url("${product.image}")` }}
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 ${product.badgeColor || 'bg-primary-500'} text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg`}>
              {product.badge}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/10 transition-colors" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <span className="text-[10px] font-mono font-bold text-slate-300 mt-1">{product.sku}</span>
        </div>
        
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="pt-4 flex items-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button className="flex-1 bg-slate-900 hover:bg-primary-500 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:shadow-primary-500/20">
            查看规格说明
          </button>
          <button className="p-3 border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
