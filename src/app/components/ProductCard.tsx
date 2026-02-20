import { motion } from 'motion/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Product, formatPrice, getTagVariant } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const basePrice = formatPrice(product.basePriceCents);
  const hasMultipleSizes = product.sizes.length > 1;
  
  // Determine gradient based on product type and tag
  const gradientClass = product.type === 'drink'
    ? 'from-[var(--caramel)] to-[var(--espresso)]'
    : product.tag === "Roaster's Pick"
    ? 'from-[#8B6F47] to-[var(--espresso)]'
    : 'from-[var(--forest)] to-[var(--espresso)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        {/* Product Image */}
        <div className={`h-48 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
          {product.tag && (
            <Badge variant={getTagVariant(product.tag)} className="absolute top-4 left-4 z-10">
              {product.tag}
            </Badge>
          )}
          
          {/* Placeholder for product image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg
              className="w-24 h-24 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {product.type === 'drink' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Product Info */}
        <CardHeader className="flex-grow">
          <h4 className="mb-1">{product.name}</h4>
          <p className="text-sm text-[var(--muted-foreground)]">{product.shortDescription}</p>
        </CardHeader>

        {/* Pricing */}
        <CardContent>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-[var(--espresso)]">${basePrice}</span>
            {hasMultipleSizes && (
              <span className="text-sm text-[var(--muted-foreground)]">starting</span>
            )}
          </div>

          {/* Size/Option Info */}
          <div className="flex flex-wrap gap-2 text-xs text-[var(--muted-foreground)]">
            {product.sizes.length > 0 && (
              <span className="px-2 py-1 bg-[var(--muted)] rounded-md">
                {product.sizes.map(s => s.name).join(' • ')}
              </span>
            )}
            {product.options.milk && product.options.milk.length > 0 && (
              <span className="px-2 py-1 bg-[var(--muted)] rounded-md">
                {product.options.milk.length} milk options
              </span>
            )}
            {product.options.grind && (
              <span className="px-2 py-1 bg-[var(--muted)] rounded-md">
                {product.options.grind[0]}
              </span>
            )}
          </div>
        </CardContent>

        {/* Actions */}
        <CardFooter className="gap-2">
          <Button 
            variant="ghost" 
            className="flex-1"
            onClick={() => onViewDetails(product)}
          >
            Details
          </Button>
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
