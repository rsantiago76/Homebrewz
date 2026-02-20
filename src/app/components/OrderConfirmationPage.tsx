import { useEffect } from 'react';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { motion } from 'motion/react';
import { CheckCircle2, Package, MapPin, Calendar, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  roast?: string;
  customization?: {
    size?: string;
    milk?: string;
  };
}

interface OrderConfirmationPageProps {
  orderNumber: string;
  items: OrderItem[];
  onBackToHome: () => void;
  onTrackOrder: () => void;
}

export function OrderConfirmationPage({ orderNumber, items, onBackToHome, onTrackOrder }: OrderConfirmationPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Confetti effect on mount
  useEffect(() => {
    // Subtle confetti burst
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 25, 
      spread: 360, 
      ticks: 50, 
      zIndex: 0,
      colors: ['#C88A3D', '#2B1E16', '#1F3A2E', '#F5EFE6']
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 3;

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Get estimated delivery date (5 business days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        {/* Success Icon with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: 'spring', 
            stiffness: 200, 
            damping: 15 
          }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                delay: 0.3, 
                duration: 1, 
                repeat: 2,
                repeatDelay: 0.5
              }}
              className="absolute inset-0 bg-[var(--forest)] rounded-full"
            />
            <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--forest)] to-[#2d5a42] rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-14 h-14 text-[var(--white)]" strokeWidth={2.5} />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="mb-4 text-[var(--espresso)]">
            Your brew is on its way! ☕
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-6">
            Thank you for your order. We've received your order and we're getting it ready.
          </p>
          
          {/* Order Number */}
          <div className="inline-block bg-[var(--cream)] px-6 py-3 rounded-xl border border-[var(--border)]">
            <p className="text-sm text-[var(--muted-foreground)] mb-1">Order Number</p>
            <p className="text-xl font-bold text-[var(--espresso)] font-mono">
              #{orderNumber}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Order Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        <Card className="border-2 border-[var(--forest)]">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--forest)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-[var(--white)]" />
            </div>
            <h4 className="text-sm font-semibold text-[var(--espresso)] mb-1">Order Confirmed</h4>
            <p className="text-xs text-[var(--muted-foreground)]">We've received your order</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--caramel)]/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-[var(--caramel)]" />
            </div>
            <h4 className="text-sm font-semibold text-[var(--espresso)] mb-1">In Transit</h4>
            <p className="text-xs text-[var(--muted-foreground)]">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-[var(--muted-foreground)]" />
            </div>
            <h4 className="text-sm font-semibold text-[var(--espresso)] mb-1">Estimated Delivery</h4>
            <p className="text-xs text-[var(--muted-foreground)]">{getEstimatedDelivery()}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-6 text-[var(--espresso)]">Order Summary</h3>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="flex gap-4 p-4 bg-[var(--cream)] rounded-xl"
                  >
                    <div className={`w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br shadow-sm ${
                      item.roast === 'light' ? 'from-[var(--caramel)] to-[var(--espresso)]' :
                      item.roast === 'medium' ? 'from-[var(--forest)] to-[var(--espresso)]' :
                      item.roast === 'espresso' ? 'from-[#8B6F47] to-[var(--espresso)]' :
                      'from-[#8B6F47] to-[var(--espresso)]'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[var(--espresso)]">{item.name}</h4>
                          {item.roast && (
                            <p className="text-sm text-[var(--muted-foreground)] capitalize">
                              {item.roast} roast
                            </p>
                          )}
                          {item.customization && (
                            <p className="text-xs text-[var(--muted-foreground)] mt-1">
                              {item.customization.size && `${item.customization.size}`}
                              {item.customization.size && item.customization.milk && ' • '}
                              {item.customization.milk && `${item.customization.milk}`}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[var(--espresso)]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-semibold text-[var(--espresso)]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Shipping</span>
                  <span className="font-semibold text-[var(--espresso)]">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Tax</span>
                  <span className="font-semibold text-[var(--espresso)]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--border)]">
                  <span className="text-lg font-bold text-[var(--espresso)]">Total</span>
                  <span className="text-2xl font-bold text-[var(--espresso)]">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6">
              <h4 className="mb-4 text-[var(--espresso)]">What's Next?</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--forest)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[var(--white)]">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--espresso)]">Order Confirmation</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Check your email for order details
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--caramel)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[var(--white)]">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--espresso)]">Preparing Your Order</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      We'll carefully package your items
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--espresso)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[var(--white)]">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--espresso)]">Shipped & Delivered</p>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Tracking info sent to your email
                    </p>
                  </div>
                </li>
              </ul>

              <div className="space-y-3">
                <Button variant="primary" className="w-full" onClick={onTrackOrder}>
                  <Package className="w-4 h-4 mr-2" />
                  Track Your Order
                </Button>
                <Button variant="ghost" className="w-full" onClick={onBackToHome}>
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-4">
            <CardContent className="p-6">
              <h4 className="mb-3 text-[var(--espresso)]">Need Help?</h4>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                Our support team is here to assist you with any questions about your order.
              </p>
              <a 
                href="mailto:support@homebrewz.com" 
                className="text-sm font-semibold text-[var(--caramel)] hover:text-[var(--espresso)] transition-colors inline-flex items-center gap-1"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-gradient-to-r from-[var(--cream)] to-[var(--white)] rounded-2xl p-8 border border-[var(--border)]"
      >
        <div className="text-center">
          <h3 className="mb-3 text-[var(--espresso)]">Thank You for Choosing HomeBrewz!</h3>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
            We're passionate about delivering the finest coffee experience to your doorstep. 
            Your order has been received and we're already working on getting it to you as quickly as possible.
          </p>
        </div>
      </motion.div>

      {/* Demo Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-[var(--muted-foreground)] bg-[var(--cream)] inline-block px-4 py-2 rounded-lg">
          ✨ Demo Mode: This is a demonstration order confirmation. No actual order has been placed.
        </p>
      </motion.div>
    </div>
  );
}
