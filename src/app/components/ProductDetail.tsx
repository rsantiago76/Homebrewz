import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Minus, Check, Info } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardHeader, CardContent } from './Card';
import { Product, formatPrice, calculateProductPrice, getTagVariant } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, customization: ProductCustomization) => void;
}

export interface ProductCustomization {
  size: string;
  milk?: string;
  sweetness?: string;
  grind?: string;
  quantity: number;
  totalPriceCents: number;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  // Default selections
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.name || '');
  const [selectedMilk, setSelectedMilk] = useState(product.options.milk?.[0] || '');
  const [selectedSweetness, setSelectedSweetness] = useState(product.options.sweetness?.[0] || '');
  const [selectedGrind, setSelectedGrind] = useState(product.options.grind?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Calculate price
  const totalPriceCents = calculateProductPrice(product, selectedSize) * quantity;
  const unitPrice = calculateProductPrice(product, selectedSize);

  const handleAddToCart = () => {
    const customization: ProductCustomization = {
      size: selectedSize,
      milk: selectedMilk,
      sweetness: selectedSweetness,
      grind: selectedGrind,
      quantity,
      totalPriceCents,
    };
    onAddToCart(product, customization);
  };

  // Determine gradient
  const gradientClass = product.type === 'drink'
    ? 'from-[var(--caramel)] to-[var(--espresso)]'
    : product.tag === "Roaster's Pick"
    ? 'from-[#8B6F47] to-[var(--espresso)]'
    : 'from-[var(--forest)] to-[var(--espresso)]';

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Menu
        </Button>
      </motion.div>

      {/* Product Detail Grid */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className={`h-96 lg:h-[500px] bg-gradient-to-br ${gradientClass} relative`}>
              {product.tag && (
                <Badge variant={getTagVariant(product.tag)} className="absolute top-6 left-6 z-10">
                  {product.tag}
                </Badge>
              )}
              
              {/* Placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg
                  className="w-48 h-48 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {product.type === 'drink' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  )}
                </svg>
              </div>
            </div>
          </Card>

          {/* Product Description Card */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-[var(--caramel)] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-2">About This {product.type === 'drink' ? 'Drink' : 'Product'}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Right: Customization & Add to Cart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="sticky top-6">
            {/* Product Title */}
            <div className="mb-6">
              <h2 className="mb-2 text-[var(--espresso)]">{product.name}</h2>
              <p className="text-lg text-[var(--muted-foreground)]">{product.shortDescription}</p>
            </div>

            {/* Customization Form */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-3">
                      Size {product.sizes.length > 1 && <span className="text-[var(--muted-foreground)]">(Required)</span>}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {product.sizes.map((size) => {
                        const sizePrice = product.basePriceCents + size.priceDeltaCents;
                        const isSelected = selectedSize === size.name;
                        return (
                          <button
                            key={size.name}
                            onClick={() => setSelectedSize(size.name)}
                            className={`p-4 rounded-xl border-2 transition-all text-center ${
                              isSelected
                                ? 'border-[var(--caramel)] bg-[var(--caramel)]/10'
                                : 'border-[var(--border)] hover:border-[var(--caramel)]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-sm text-[var(--espresso)]">{size.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-[var(--caramel)]" />}
                            </div>
                            <span className="text-xs text-[var(--muted-foreground)]">
                              ${formatPrice(sizePrice)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Milk Selection */}
                {product.options.milk && product.options.milk.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-3">
                      Milk Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.options.milk.map((milk) => {
                        const isSelected = selectedMilk === milk;
                        return (
                          <button
                            key={milk}
                            onClick={() => setSelectedMilk(milk)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              isSelected
                                ? 'border-[var(--forest)] bg-[var(--forest)]/10 text-[var(--espresso)]'
                                : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--forest)]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{milk}</span>
                              {isSelected && <Check className="w-4 h-4 text-[var(--forest)]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sweetness Level */}
                {product.options.sweetness && product.options.sweetness.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-3">
                      Sweetness
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {product.options.sweetness.map((sweetness) => {
                        const isSelected = selectedSweetness === sweetness;
                        return (
                          <button
                            key={sweetness}
                            onClick={() => setSelectedSweetness(sweetness)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              isSelected
                                ? 'border-[var(--caramel)] bg-[var(--caramel)]/10 text-[var(--espresso)]'
                                : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--caramel)]/50'
                            }`}
                          >
                            {sweetness}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Grind Type */}
                {product.options.grind && product.options.grind.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-3">
                      Grind Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.options.grind.map((grind) => {
                        const isSelected = selectedGrind === grind;
                        return (
                          <button
                            key={grind}
                            onClick={() => setSelectedGrind(grind)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              isSelected
                                ? 'border-[var(--espresso)] bg-[var(--espresso)]/10 text-[var(--espresso)]'
                                : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--espresso)]/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{grind}</span>
                              {isSelected && <Check className="w-4 h-4 text-[var(--espresso)]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-semibold text-[var(--espresso)] mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-2xl font-bold text-[var(--espresso)] min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="pt-6 border-t border-[var(--border)]">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-sm text-[var(--muted-foreground)]">Unit Price:</span>
                    <span className="text-lg font-semibold text-[var(--espresso)]">
                      ${formatPrice(unitPrice)}
                    </span>
                  </div>
                  {quantity > 1 && (
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-sm text-[var(--muted-foreground)]">
                        Quantity: {quantity}
                      </span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        × ${formatPrice(unitPrice)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-lg font-semibold text-[var(--espresso)]">Total:</span>
                    <span className="text-3xl font-bold text-[var(--espresso)]">
                      ${formatPrice(totalPriceCents)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    Add {quantity} to Cart • ${formatPrice(totalPriceCents)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
