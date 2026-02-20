import { useState } from 'react';
import { Button } from './Button';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Input } from './Input';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, CreditCard, Package, Mail, User, MapPin, Phone, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { 
  createPendingOrder, 
  createPaymentIntent, 
  confirmPayment, 
  getDemoModeInfo,
  type OrderData 
} from '../services/paymentService';
import { formatPrice } from '../data/products';

interface CheckoutItem {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
  size?: string;
  customization?: {
    milk?: string;
    sweetness?: string;
    grind?: string;
  };
}

interface CheckoutPageProps {
  items: CheckoutItem[];
  onBack: () => void;
  onComplete: (orderId: string) => void;
}

export function CheckoutPage({ items, onBack, onComplete }: CheckoutPageProps) {
  const [checkoutMode, setCheckoutMode] = useState<'select' | 'signin' | 'guest'>('select');
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string>('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardName, setCardName] = useState('');

  // Calculate totals in cents
  const subtotalCents = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
  const shippingCents = subtotalCents > 5000 ? 0 : 599; // Free shipping over $50
  const taxCents = Math.round(subtotalCents * 0.08); // 8% tax
  const totalCents = subtotalCents + shippingCents + taxCents;

  const demoInfo = getDemoModeInfo();

  /**
   * Complete Stripe checkout flow:
   * 1. Validate form data
   * 2. Create pending order in backend
   * 3. Create Stripe PaymentIntent
   * 4. Confirm payment with Stripe
   * 5. Webhook updates order status
   * 6. Redirect to success page
   */
  const handleComplete = async () => {
    setPaymentError('');
    
    // Validation
    if (!email || !firstName || !lastName || !address || !city || !state || !zipCode || !cardName) {
      setPaymentError('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Step 1: Create pending order
      setProcessingStep('Creating order...');
      const order = await createPendingOrder({
        customerEmail: email,
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          state,
          zipCode,
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.priceCents,
          quantity: item.quantity,
        })),
        amount: totalCents,
      });
      
      console.log('📦 Order created:', order.orderId);
      
      // Step 2: Create PaymentIntent
      setProcessingStep('Preparing payment...');
      const paymentIntent = await createPaymentIntent(order.orderId);
      
      console.log('💳 PaymentIntent created:', paymentIntent.id);
      
      // Step 3: Confirm payment with Stripe
      setProcessingStep('Processing payment...');
      const result = await confirmPayment(paymentIntent.clientSecret, {
        cardholderName: cardName,
      });
      
      if (!result.success) {
        setPaymentError(result.error || 'Payment failed. Please try again.');
        setIsProcessing(false);
        setProcessingStep('');
        return;
      }
      
      // Step 4: Payment successful
      setProcessingStep('Payment confirmed!');
      console.log('✅ Payment successful!');
      
      // Wait a moment to show success message
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 5: Redirect to success page
      // In production, webhook would update order status
      // Frontend redirects to success page with order ID
      onComplete(order.orderId);
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
      setIsProcessing(false);
      setProcessingStep('');
    }
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
        <span className="font-semibold">Back to Cart</span>
      </button>

      {/* Security Header */}
      <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-[var(--cream)] rounded-xl border border-[var(--border)]">
        <ShieldCheck className="w-6 h-6 text-[var(--forest)]" />
        <span className="text-sm font-semibold text-[var(--espresso)]">
          Secure Checkout
        </span>
        <Lock className="w-4 h-4 text-[var(--muted-foreground)]" />
      </div>

      {checkoutMode === 'select' ? (
        /* Checkout Mode Selection */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="mb-4 text-[var(--espresso)]">Choose How to Checkout</h2>
            <p className="text-[var(--muted-foreground)]">
              Sign in for faster checkout or continue as a guest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sign In Option */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[var(--caramel)]" onClick={() => setCheckoutMode('signin')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[var(--espresso)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-[var(--white)]" />
                </div>
                <h3 className="mb-3 text-[var(--espresso)]">Sign In</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Access your saved addresses, payment methods, and order history
                </p>
                <ul className="text-left space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>Faster checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>Track your orders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>Saved payment info</span>
                  </li>
                </ul>
                <Button variant="primary" className="w-full">
                  Sign In
                </Button>
              </CardContent>
            </Card>

            {/* Guest Checkout Option */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[var(--caramel)]" onClick={() => setCheckoutMode('guest')}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-[var(--white)]" />
                </div>
                <h3 className="mb-3 text-[var(--espresso)]">Continue as Guest</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Quick checkout without creating an account
                </p>
                <ul className="text-left space-y-2 text-sm text-[var(--muted-foreground)] mb-6">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>No account needed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>Quick & simple</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                    <span>Still secure</span>
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">
                  Continue as Guest
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Preview */}
          <Card className="mt-8">
            <CardHeader>
              <h4 className="text-[var(--espresso)]">Order Summary</h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-[var(--espresso)]">{item.name}</span>
                      <span className="text-[var(--muted-foreground)]"> × {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-[var(--espresso)]">
                      ${formatPrice(item.priceCents * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-[var(--border)] flex justify-between">
                  <span className="font-semibold text-[var(--espresso)]">Total</span>
                  <span className="text-xl font-bold text-[var(--espresso)]">
                    ${formatPrice(totalCents)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : checkoutMode === 'signin' ? (
        /* Sign In Form */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader>
              <h3 className="text-[var(--espresso)]">Sign In to Your Account</h3>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">
                Access your saved information for faster checkout
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-[var(--border)]" />
                  <span className="text-[var(--muted-foreground)]">Remember me</span>
                </label>
                <a href="#" className="text-[var(--caramel)] hover:underline">
                  Forgot password?
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button variant="primary" className="w-full">
                Sign In & Continue
              </Button>
              <button
                onClick={() => setCheckoutMode('select')}
                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--espresso)]"
              >
                Back to checkout options
              </button>
              <div className="text-center pt-4 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--muted-foreground)]">
                  Don't have an account?{' '}
                  <a href="#" className="text-[var(--caramel)] hover:underline font-semibold">
                    Sign up
                  </a>
                </p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        /* Guest Checkout Form */
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--espresso)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--white)]">1</span>
                  </div>
                  <div>
                    <h4 className="text-[var(--espresso)]">Contact Information</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Where should we send your order confirmation?
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-5 h-5" />}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Phone className="w-5 h-5" />}
                />
              </CardContent>
            </Card>

            {/* Shipping Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--espresso)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--white)]">2</span>
                  </div>
                  <div>
                    <h4 className="text-[var(--espresso)]">Shipping Address</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <Input
                  label="Street Address"
                  placeholder="123 Main Street"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  icon={<MapPin className="w-5 h-5" />}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    placeholder="San Francisco"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    label="State"
                    placeholder="CA"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <Input
                    label="ZIP Code"
                    placeholder="94102"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--espresso)] rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--white)]">3</span>
                  </div>
                  <div>
                    <h4 className="text-[var(--espresso)]">Payment Details</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      All transactions are secure and encrypted
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Demo Banner */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">
                      🧪 This is a demo checkout. No real charges will occur.
                    </p>
                    <p className="text-xs text-blue-700">
                      This checkout page is for demonstration purposes only. In production, all payment data would be securely processed by Stripe with full PCI compliance.
                    </p>
                  </div>
                </div>

                {/* Stripe Branding */}
                <div className="flex items-center justify-between p-4 bg-[var(--cream)] rounded-xl border border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[var(--forest)]" />
                    <span className="text-sm font-semibold text-[var(--espresso)]">
                      Secure payment powered by
                    </span>
                    <div className="px-3 py-1 bg-[#635bff] rounded text-white font-bold text-sm">
                      stripe
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--forest)]" />
                  </div>
                </div>

                {/* Stripe Card Elements */}
                <div className="space-y-4">
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                  
                  {/* Card Number - Stripe Element Mock */}
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                      Card Number
                    </label>
                    <div className="relative group">
                      <div className="w-full px-4 py-3 bg-[var(--white)] border-2 border-[var(--border)] rounded-xl text-[var(--espresso)] hover:border-[#635bff] focus-within:border-[#635bff] focus-within:shadow-lg focus-within:shadow-[#635bff]/20 transition-all">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="flex-1 bg-transparent outline-none text-[var(--espresso)] placeholder:text-[var(--muted-foreground)]"
                            maxLength={19}
                          />
                          <div className="flex gap-1.5">
                            <div className="w-8 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                              VISA
                            </div>
                            <div className="w-8 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                              MC
                            </div>
                            <div className="w-8 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                              AMEX
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiration Date - Stripe Element Mock */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        Expiration
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 bg-[var(--white)] border-2 border-[var(--border)] rounded-xl text-[var(--espresso)] placeholder:text-[var(--muted-foreground)] hover:border-[#635bff] focus:border-[#635bff] focus:shadow-lg focus:shadow-[#635bff]/20 focus:outline-none transition-all"
                        maxLength={7}
                      />
                    </div>

                    {/* CVC - Stripe Element Mock */}
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        CVC
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-[var(--white)] border-2 border-[var(--border)] rounded-xl text-[var(--espresso)] placeholder:text-[var(--muted-foreground)] hover:border-[#635bff] focus:border-[#635bff] focus:shadow-lg focus:shadow-[#635bff]/20 focus:outline-none transition-all"
                          maxLength={4}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                          <CreditCard className="w-5 h-5 text-[var(--muted-foreground)] cursor-help" />
                          <div className="absolute hidden group-hover:block right-0 top-full mt-2 w-48 p-3 bg-[var(--espresso)] text-white text-xs rounded-lg shadow-xl z-10">
                            3-digit security code on the back of your card
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test Card Helper */}
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-amber-900 mb-1">
                        Stripe Test Card
                      </p>
                      <p className="text-xs text-amber-700 mb-2">
                        Use this test card number for demo purposes:
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-white border border-amber-300 rounded text-xs font-mono text-amber-900 font-bold">
                          4242 4242 4242 4242
                        </code>
                        <span className="text-xs text-amber-600">• Any future expiry • Any CVC</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-green-900">
                        Secure & Encrypted Payment
                      </span>
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-700">PCI DSS Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Info Checkbox */}
                <label className="flex items-start gap-3 p-4 bg-[var(--cream)] rounded-xl cursor-pointer hover:bg-[var(--muted)] transition-colors">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="mt-1 rounded border-[var(--border)] text-[var(--caramel)] focus:ring-[var(--caramel)]"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[var(--espresso)] block">
                      Save my information for future orders
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      Securely store your details for faster checkout next time
                    </span>
                  </div>
                </label>
              </CardContent>
            </Card>

            {/* Additional Trust Signals */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                <ShieldCheck className="w-4 h-4 text-[var(--forest)]" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                <Package className="w-4 h-4 text-[var(--forest)]" />
                <span>Free returns on all orders</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                <Lock className="w-4 h-4 text-[var(--forest)]" />
                <span>Your data is protected & encrypted</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <h4 className="text-[var(--espresso)]">Order Summary</h4>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-[var(--cream)] rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-[var(--espresso)] truncate">
                            {item.name}
                          </h5>
                          {item.customization && (
                            <p className="text-xs text-[var(--muted-foreground)]">
                              {item.customization.size && `${item.customization.size} • `}
                              {item.customization.milk}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-[var(--muted-foreground)]">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-bold text-[var(--espresso)]">
                              ${formatPrice(item.priceCents * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 pt-4 border-t border-[var(--border)]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Subtotal</span>
                      <span className="font-semibold text-[var(--espresso)]">
                        ${formatPrice(subtotalCents)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Shipping</span>
                      <span className="font-semibold text-[var(--espresso)]">
                        {shippingCents === 0 ? 'Free' : `$${formatPrice(shippingCents)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted-foreground)]">Tax (8%)</span>
                      <span className="font-semibold text-[var(--espresso)]">
                        ${formatPrice(taxCents)}
                      </span>
                    </div>
                    {subtotalCents > 0 && subtotalCents < 5000 && (
                      <p className="text-xs text-[var(--caramel)] bg-[var(--cream)] p-2 rounded">
                        Add ${formatPrice(5000 - subtotalCents)} more for free shipping!
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                    <span className="text-lg font-bold text-[var(--espresso)]">Total</span>
                    <span className="text-2xl font-bold text-[var(--espresso)]">
                      ${formatPrice(totalCents)}
                    </span>
                  </div>

                  {/* Complete Purchase Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleComplete}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[var(--white)] border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Complete Purchase
                      </>
                    )}
                  </Button>

                  {/* Payment Error Message */}
                  {paymentError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-900 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      {paymentError}
                    </div>
                  )}

                  {/* Processing Step Indicator */}
                  {processingStep && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      {processingStep}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}