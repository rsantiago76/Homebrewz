import { X, Plus, Minus, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../data/products';

export interface CartItem {
  id: string;
  name: string;
  priceCents: number; // Price in cents
  quantity: number;
  size?: string;
  customization?: {
    milk?: string;
    sweetness?: string;
    grind?: string;
  };
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout?: () => void;
}

export function ShoppingCart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : subtotal > 0 ? 599 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--white)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-[var(--espresso)]" />
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--caramel)] rounded-full flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-[var(--white)]">{itemCount}</span>
                    </motion.div>
                  )}
                </div>
                <div>
                  <h3 className="text-[var(--espresso)]">Your Cart</h3>
                  {itemCount > 0 && (
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--cream)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[var(--espresso)]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-20 h-20 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-10 h-10 text-[var(--muted-foreground)]" />
                    </div>
                    <h4 className="mb-2 text-[var(--espresso)]">Your cart is empty</h4>
                    <p className="text-sm text-[var(--muted-foreground)] mb-6">
                      Add some delicious coffee to get started!
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--caramel)] hover:text-[var(--espresso)] transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, x: -100 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[var(--cream)] rounded-xl p-4 hover:shadow-md transition-shadow group"
                      >
                        <div className="flex gap-4">
                          <motion.div 
                            className={`w-20 h-20 flex-shrink-0 rounded-lg bg-gradient-to-br shadow-sm from-[var(--caramel)] to-[var(--espresso)]`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1 min-w-0 pr-2">
                                <h4 className="text-[var(--espresso)] truncate" style={{ fontSize: '1rem' }}>{item.name}</h4>
                                {item.size && (
                                  <p className="text-sm text-[var(--muted-foreground)]">{item.size}</p>
                                )}
                                {item.customization && (
                                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                                    {item.customization.milk && `${item.customization.milk}`}
                                    {item.customization.milk && item.customization.sweetness && ' • '}
                                    {item.customization.sweetness && `${item.customization.sweetness}`}
                                    {item.customization.grind && `${item.customization.grind}`}
                                  </p>
                                )}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onRemoveItem(item.id)}
                                className="p-1.5 hover:bg-[var(--white)] rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4 text-[var(--muted-foreground)] hover:text-red-500" />
                              </motion.button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-[var(--white)] rounded-lg p-1 shadow-sm">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                  className="p-1 hover:bg-[var(--cream)] rounded transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-[var(--espresso)]" />
                                </motion.button>
                                <span className="w-8 text-center font-semibold text-[var(--espresso)]">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-[var(--cream)] rounded transition-colors"
                                >
                                  <Plus className="w-4 h-4 text-[var(--espresso)]" />
                                </motion.button>
                              </div>
                              <motion.span 
                                key={item.priceCents * item.quantity}
                                initial={{ scale: 1.2, color: 'var(--caramel)' }}
                                animate={{ scale: 1, color: 'var(--espresso)' }}
                                className="font-bold"
                              >
                                ${formatPrice(item.priceCents * item.quantity)}
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-[var(--border)] p-6 bg-[var(--cream)]"
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Subtotal</span>
                    <span className="font-semibold text-[var(--espresso)]">${formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Shipping</span>
                    <span className="font-semibold text-[var(--espresso)]">
                      {shipping === 0 ? 'Free' : `$${formatPrice(shipping)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">Tax</span>
                    <span className="font-semibold text-[var(--espresso)]">${formatPrice(Math.round(tax))}</span>
                  </div>
                  {subtotal > 0 && subtotal < 5000 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[var(--caramel)] bg-[var(--caramel)]/10 rounded-lg p-2"
                    >
                      🎉 Add ${formatPrice(5000 - subtotal)} more for free shipping!
                    </motion.p>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[var(--border)]">
                    <span className="font-semibold text-[var(--espresso)]">Total</span>
                    <span className="text-xl font-bold text-[var(--espresso)]">${formatPrice(Math.round(total))}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full" size="lg" onClick={onCheckout}>
                    Proceed to Checkout
                  </Button>
                  <button
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] hover:text-[var(--espresso)] transition-colors py-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}