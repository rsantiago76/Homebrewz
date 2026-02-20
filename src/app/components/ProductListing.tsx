import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './Button';
import { ProductCard } from './ProductCard';
import { products, Product, searchProducts, getProductsByType } from '../data/products';

interface ProductListingProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export function ProductListing({ onAddToCart, onViewProduct }: ProductListingProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'drink' | 'beans'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get counts for tabs
  const drinkCount = products.filter(p => p.type === 'drink').length;
  const beansCount = products.filter(p => p.type === 'beans').length;

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="mb-8 text-center text-[var(--espresso)]">Explore Our Menu</h3>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search drinks, beans, or flavors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-[var(--white)] border border-[var(--border)] rounded-xl text-[var(--espresso)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--caramel)] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
              <span className="text-sm font-semibold text-[var(--muted-foreground)]">Category:</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-[var(--espresso)] text-[var(--white)] shadow-md'
                    : 'bg-[var(--white)] text-[var(--espresso)] border border-[var(--border)] hover:border-[var(--caramel)]'
                }`}
              >
                All Products ({products.length})
              </button>
              <button
                onClick={() => setSelectedType('drink')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedType === 'drink'
                    ? 'bg-[var(--caramel)] text-[var(--white)] shadow-md'
                    : 'bg-[var(--white)] text-[var(--espresso)] border border-[var(--border)] hover:border-[var(--caramel)]'
                }`}
              >
                Drinks ({drinkCount})
              </button>
              <button
                onClick={() => setSelectedType('beans')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedType === 'beans'
                    ? 'bg-[var(--forest)] text-[var(--white)] shadow-md'
                    : 'bg-[var(--white)] text-[var(--espresso)] border border-[var(--border)] hover:border-[var(--caramel)]'
                }`}
              >
                Beans ({beansCount})
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-[var(--muted-foreground)]">
            Showing {filteredProducts.length} of {products.length} products
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewDetails={onViewProduct}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-4">
              <Search className="w-16 h-16 text-[var(--muted-foreground)] mx-auto opacity-30" />
            </div>
            <h4 className="mb-2 text-[var(--espresso)]">No products found</h4>
            <p className="text-[var(--muted-foreground)] mb-6">
              {searchQuery 
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No products match your current filters.'}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
