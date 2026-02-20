import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card, CardContent } from './Card';
import { motion } from 'motion/react';
import { Plus, Minus, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductDetailPageProps {
  onAddToCart: (product: any) => void;
  onBack: () => void;
}

const sizeOptions = [
  { value: 'small', label: 'Small', size: '12 oz', price: 4.50 },
  { value: 'medium', label: 'Medium', size: '16 oz', price: 5.25 },
  { value: 'large', label: 'Large', size: '20 oz', price: 5.95 },
];

const milkOptions = [
  { value: 'whole', label: 'Whole Milk', calories: 150 },
  { value: 'skim', label: 'Skim Milk', calories: 100 },
  { value: 'oat', label: 'Oat Milk', calories: 130, extra: 0.75 },
  { value: 'almond', label: 'Almond Milk', calories: 80, extra: 0.75 },
  { value: 'soy', label: 'Soy Milk', calories: 110, extra: 0.75 },
  { value: 'coconut', label: 'Coconut Milk', calories: 90, extra: 0.75 },
];

const relatedProducts: RelatedProduct[] = [
  { 
    id: 1, 
    name: 'Cappuccino', 
    price: 4.75,
    imageUrl: 'https://images.unsplash.com/photo-1544737601-0f0029425384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
  },
  { 
    id: 2, 
    name: 'Mocha', 
    price: 5.50,
    imageUrl: 'https://images.unsplash.com/photo-1649023384041-555d35454897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
  },
  { 
    id: 3, 
    name: 'Americano', 
    price: 3.75,
    imageUrl: 'https://images.unsplash.com/photo-1663683462505-c12f9445d2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
  },
  { 
    id: 4, 
    name: 'Macchiato', 
    price: 4.25,
    imageUrl: 'https://images.unsplash.com/photo-1679148404766-a8bf879695e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400'
  },
];

export function ProductDetailPage({ onAddToCart, onBack }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[1]); // Default to Medium
  const [selectedMilk, setSelectedMilk] = useState(milkOptions[0]); // Default to Whole Milk
  const [quantity, setQuantity] = useState(1);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const basePrice = selectedSize.price;
  const milkExtra = selectedMilk.extra || 0;
  const totalPrice = (basePrice + milkExtra) * quantity;

  const selectedMilkCalories = selectedMilk.calories;
  const totalCalories = selectedMilkCalories;

  const handleAddToCart = () => {
    onAddToCart({
      id: Date.now(),
      name: `Signature Latte (${selectedSize.label})`,
      price: basePrice + milkExtra,
      quantity,
      roast: 'espresso',
      customization: {
        size: selectedSize.label,
        milk: selectedMilk.label,
      }
    });
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % relatedProducts.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + relatedProducts.length) % relatedProducts.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-semibold">Back to Products</span>
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Product Details */}
        <div>
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-gradient-to-br from-[var(--cream)] to-[var(--white)] rounded-2xl p-12 mb-8 relative overflow-hidden"
          >
            <Badge variant="bestseller" className="absolute top-6 left-6 z-10">
              Bestseller
            </Badge>
            <img
              src="https://images.unsplash.com/photo-1631477024455-72829c5a8022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Signature Latte"
              className="w-full h-96 object-contain"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="mb-4 text-[var(--espresso)]">Signature Latte</h2>
            <p className="text-lg text-[var(--muted-foreground)] mb-8">
              Our classic latte made with rich espresso and perfectly steamed milk, 
              topped with delicate microfoam. A smooth, creamy favorite for any time of day.
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block mb-3 text-[var(--espresso)]">Select Size</label>
              <div className="grid grid-cols-3 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize.value === size.value
                        ? 'border-[var(--caramel)] bg-[var(--caramel)]/10'
                        : 'border-[var(--border)] hover:border-[var(--caramel)]/50'
                    }`}
                  >
                    <div className="font-semibold text-[var(--espresso)]">{size.label}</div>
                    <div className="text-sm text-[var(--muted-foreground)]">{size.size}</div>
                    <div className="text-sm font-semibold text-[var(--caramel)] mt-1">
                      ${size.price.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Options Dropdown */}
            <div className="mb-6">
              <label className="block mb-3 text-[var(--espresso)]">Milk Choice</label>
              <select
                value={selectedMilk.value}
                onChange={(e) => setSelectedMilk(milkOptions.find(m => m.value === e.target.value) || milkOptions[0])}
                className="w-full px-4 py-3 bg-[var(--white)] border border-[var(--border)] rounded-xl text-[var(--espresso)] focus:outline-none focus:ring-2 focus:ring-[var(--caramel)] focus:border-transparent transition-all"
              >
                {milkOptions.map((milk) => (
                  <option key={milk.value} value={milk.value}>
                    {milk.label} {milk.extra ? `(+$${milk.extra.toFixed(2)})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block mb-3 text-[var(--espresso)]">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-[var(--cream)] rounded-xl p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-[var(--white)] rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5 text-[var(--espresso)]" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg text-[var(--espresso)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-[var(--white)] rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5 text-[var(--espresso)]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart • ${totalPrice.toFixed(2)}
            </Button>
          </motion.div>
        </div>

        {/* Right Column - Summary & Nutrition */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="sticky top-6 space-y-6"
          >
            {/* Nutrition Badge */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-[var(--caramel)]" />
                  <h4 className="text-[var(--espresso)]">Nutritional Information</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--espresso)]">{totalCalories}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--espresso)]">8g</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--espresso)]">6g</div>
                    <div className="text-xs text-[var(--muted-foreground)]">Fat</div>
                  </div>
                </div>
                <div className="text-xs text-[var(--muted-foreground)] bg-[var(--cream)] rounded-lg p-3">
                  <strong>Note:</strong> Nutritional values based on {selectedSize.label} size with {selectedMilk.label}. 
                  Values may vary with customizations.
                </div>
              </CardContent>
            </Card>

            {/* Customization Summary */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-[var(--espresso)] mb-4">Your Customization</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                    <span className="text-[var(--muted-foreground)]">Size</span>
                    <span className="font-semibold text-[var(--espresso)]">
                      {selectedSize.label} ({selectedSize.size})
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                    <span className="text-[var(--muted-foreground)]">Milk Type</span>
                    <span className="font-semibold text-[var(--espresso)]">{selectedMilk.label}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                    <span className="text-[var(--muted-foreground)]">Quantity</span>
                    <span className="font-semibold text-[var(--espresso)]">{quantity}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold text-[var(--espresso)]">Total Price</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[var(--caramel)]">
                        ${totalPrice.toFixed(2)}
                      </div>
                      {milkExtra > 0 && (
                        <div className="text-xs text-[var(--muted-foreground)]">
                          includes ${(milkExtra * quantity).toFixed(2)} milk upgrade
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-[var(--espresso)] mb-4">What's Inside</h4>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--caramel)] mt-1">•</span>
                    <span>Double shot of our signature espresso blend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--caramel)] mt-1">•</span>
                    <span>Perfectly steamed milk of your choice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--caramel)] mt-1">•</span>
                    <span>Topped with delicate microfoam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--caramel)] mt-1">•</span>
                    <span>Made fresh to order by our expert baristas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Related Items Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-16"
      >
        <h3 className="mb-8 text-[var(--espresso)]">You Might Also Like</h3>
        <div className="relative">
          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-[var(--white)] rounded-full shadow-lg hover:bg-[var(--cream)] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--espresso)]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-[var(--white)] rounded-full shadow-lg hover:bg-[var(--cream)] transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-[var(--espresso)]" />
          </button>

          {/* Carousel Items */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: -carouselIndex * (100 / 3) + '%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[33.333%] px-3"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-48 overflow-hidden rounded-t-2xl bg-[var(--cream)]">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[var(--espresso)]">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {relatedProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === carouselIndex
                    ? 'w-6 bg-[var(--caramel)]'
                    : 'bg-[var(--muted)]'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
