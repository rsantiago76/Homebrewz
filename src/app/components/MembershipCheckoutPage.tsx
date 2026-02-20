import { useState } from 'react';
import { Button } from './Button';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Input } from './Input';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, CreditCard, Package, Mail, User, ChevronLeft, CheckCircle2, AlertCircle, Calendar, RefreshCw } from 'lucide-react';

export type MembershipTier = 'basic' | 'premium' | 'elite';

interface MembershipCheckoutPageProps {
  tier: MembershipTier;
  onBack: () => void;
  onComplete: (subscriptionId: string, billingCycle: 'monthly' | 'annual') => void;
}

const membershipDetails = {
  basic: {
    name: 'Coffee Lover',
    price: 12,
    features: [
      '1 bag of coffee per month',
      '10% off all purchases',
      'Free shipping on orders over $30',
      'Monthly brewing tips email'
    ],
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light', price: 18 }
    ]
  },
  premium: {
    name: 'Coffee Connoisseur',
    price: 28,
    features: [
      '2 bags of coffee per month',
      '20% off all purchases',
      'Free shipping on all orders',
      'Access to limited edition roasts',
      'Exclusive brewing masterclasses',
      'Priority customer support'
    ],
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light', price: 18 },
      { name: 'Colombian Supremo', size: '12oz', roast: 'Medium', price: 16 }
    ]
  },
  elite: {
    name: 'Coffee Master',
    price: 48,
    features: [
      '4 bags of coffee per month',
      '30% off all purchases',
      'Free express shipping',
      'Early access to all new releases',
      'Personalized coffee recommendations',
      'Annual brewing equipment gift',
      'VIP event invitations'
    ],
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light', price: 18 },
      { name: 'Colombian Supremo', size: '12oz', roast: 'Medium', price: 16 },
      { name: 'Sumatra Mandheling', size: '12oz', roast: 'Dark', price: 20 },
      { name: 'Kenyan AA', size: '12oz', roast: 'Light', price: 22 }
    ]
  }
};

export function MembershipCheckoutPage({ tier, onBack, onComplete }: MembershipCheckoutPageProps) {
  const [checkoutMode, setCheckoutMode] = useState<'select' | 'signin' | 'guest'>('select');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string>('');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const membership = membershipDetails[tier];
  const monthlyPrice = membership.price;
  const annualPrice = Math.round(monthlyPrice * 12 * 0.85); // 15% discount for annual
  const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
  const savings = billingCycle === 'annual' ? (monthlyPrice * 12 - annualPrice) : 0;

  /**
   * Demo subscription checkout flow
   */
  const handleComplete = async () => {
    setPaymentError('');
    
    // Validation
    if (!email || !firstName || !lastName || !cardName || !cardNumber || !cardExpiry || !cardCvc) {
      setPaymentError('Please fill in all required fields.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Step 1: Validate subscription details
      setProcessingStep('Validating membership details...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 2: Create subscription
      setProcessingStep('Creating your subscription...');
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Step 3: Process first payment
      setProcessingStep('Processing payment...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 4: Activate membership
      setProcessingStep('Activating your membership...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate demo subscription ID
      const subscriptionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Success - complete checkout
      onComplete(subscriptionId, billingCycle);
      
    } catch (error) {
      setPaymentError('Demo Error: Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ChevronLeft className="w-4 h-4" />
        Back to Memberships
      </Button>

      {/* Processing Overlay */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <Card className="max-w-md w-full mx-4">
            <CardContent className="p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-[var(--caramel)] border-t-transparent rounded-full mx-auto mb-4"
              />
              <h4 className="mb-2 text-[var(--espresso)]">Processing Your Subscription</h4>
              <p className="text-sm text-[var(--muted-foreground)]">{processingStep}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Demo Mode Notice */}
          <Card className="bg-[var(--cream)] border-[var(--caramel)]">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-[var(--caramel)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[var(--espresso)] text-sm mb-1">Demo Mode</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    This is a demonstration checkout. No real subscription will be created or charged.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Selection */}
          {checkoutMode === 'select' && (
            <Card>
              <CardHeader>
                <h4 className="text-[var(--espresso)]">Choose Your Account Option</h4>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setCheckoutMode('signin')}
                  className="w-full p-4 border-2 border-[var(--border)] rounded-xl hover:border-[var(--caramel)] transition-colors text-left"
                >
                  <p className="font-semibold text-[var(--espresso)] mb-1">Sign In</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Already have an account?</p>
                </button>
                <button
                  onClick={() => setCheckoutMode('guest')}
                  className="w-full p-4 border-2 border-[var(--border)] rounded-xl hover:border-[var(--caramel)] transition-colors text-left"
                >
                  <p className="font-semibold text-[var(--espresso)] mb-1">Continue as Guest</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Create account later</p>
                </button>
              </CardContent>
            </Card>
          )}

          {/* Sign In Form */}
          {checkoutMode === 'signin' && (
            <Card>
              <CardHeader>
                <h4 className="text-[var(--espresso)]">Sign In to Your Account</h4>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" className="flex-1" onClick={() => {
                    setFirstName('Demo');
                    setLastName('User');
                  }}>
                    Sign In
                  </Button>
                  <Button variant="ghost" onClick={() => setCheckoutMode('select')}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guest Checkout Form */}
          {checkoutMode === 'guest' && (
            <>
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <h4 className="text-[var(--espresso)]">Contact Information</h4>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name
                      </label>
                      <Input
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        Last Name
                      </label>
                      <Input
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="save-info"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="save-info" className="text-sm text-[var(--muted-foreground)]">
                      Create an account to manage your subscription
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Cycle Selection */}
              <Card>
                <CardHeader>
                  <h4 className="text-[var(--espresso)]">Billing Cycle</h4>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      billingCycle === 'monthly'
                        ? 'border-[var(--caramel)] bg-[var(--cream)]'
                        : 'border-[var(--border)] hover:border-[var(--caramel)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[var(--espresso)] mb-1">
                          <Calendar className="w-4 h-4 inline mr-2" />
                          Monthly Billing
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          ${monthlyPrice}/month • Cancel anytime
                        </p>
                      </div>
                      {billingCycle === 'monthly' && (
                        <CheckCircle2 className="w-5 h-5 text-[var(--caramel)]" />
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left relative ${
                      billingCycle === 'annual'
                        ? 'border-[var(--caramel)] bg-[var(--cream)]'
                        : 'border-[var(--border)] hover:border-[var(--caramel)]'
                    }`}
                  >
                    <div className="absolute -top-2 right-4 bg-[var(--caramel)] text-white text-xs px-2 py-1 rounded-full font-bold">
                      Save 15%
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[var(--espresso)] mb-1">
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Annual Billing
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          ${annualPrice}/year • Save ${savings}
                        </p>
                      </div>
                      {billingCycle === 'annual' && (
                        <CheckCircle2 className="w-5 h-5 text-[var(--caramel)]" />
                      )}
                    </div>
                  </button>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h4 className="text-[var(--espresso)]">Payment Information</h4>
                    <div className="flex gap-2">
                      <div className="w-8 h-6 bg-[var(--espresso)] rounded text-[var(--white)] text-[10px] font-bold flex items-center justify-center">
                        VISA
                      </div>
                      <div className="w-8 h-6 bg-[var(--caramel)] rounded text-[var(--white)] text-[10px] font-bold flex items-center justify-center">
                        MC
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Cardholder Name
                    </label>
                    <Input
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                      Card Number
                    </label>
                    <Input
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--espresso)] mb-2">
                        CVC
                      </label>
                      <Input
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error Message */}
              {paymentError && (
                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-600">{paymentError}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Complete Button */}
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full" 
                onClick={handleComplete}
                disabled={isProcessing}
              >
                <Lock className="w-5 h-5 mr-2" />
                Start Membership - ${displayPrice}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure checkout • Cancel anytime • No commitment</span>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <h4 className="text-[var(--espresso)]">Membership Summary</h4>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Membership Tier */}
              <div className="p-4 bg-[var(--cream)] rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--caramel)] uppercase tracking-wide mb-1">
                      {tier} Tier
                    </p>
                    <h4 className="text-[var(--espresso)]" style={{ fontSize: '1.25rem' }}>
                      {membership.name}
                    </h4>
                  </div>
                  <Package className="w-8 h-8 text-[var(--caramel)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--espresso)] mb-1">
                  ${displayPrice}
                  <span className="text-base font-normal text-[var(--muted-foreground)] ml-2">
                    / {billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-[var(--forest)] font-semibold">
                    💰 You save ${savings}/year
                  </p>
                )}
              </div>

              {/* Membership Features */}
              <div>
                <p className="text-sm font-semibold text-[var(--espresso)] mb-3">
                  Your Benefits:
                </p>
                <ul className="space-y-2">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--muted-foreground)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Included Products */}
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--espresso)] mb-3">
                  {billingCycle === 'monthly' ? 'This Month' : 'First Month'}'s Coffee Selection:
                </p>
                <div className="space-y-3">
                  {membership.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-start p-3 bg-[var(--white)] border border-[var(--border)] rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--espresso)]">{product.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {product.size} • {product.roast} Roast
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--muted-foreground)] line-through">${product.price}</p>
                        <p className="text-xs font-semibold text-[var(--forest)]">Included</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-[var(--cream)] rounded-lg">
                  <p className="text-xs text-[var(--muted-foreground)]">
                    <strong className="text-[var(--espresso)]">Value:</strong> $
                    {membership.products.reduce((sum, p) => sum + p.price, 0)} worth of coffee for ${displayPrice}/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </p>
                </div>
              </div>

              {/* Billing Details */}
              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Today's Charge</span>
                  <span className="font-semibold text-[var(--espresso)]">
                    ${displayPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Renewal Date</span>
                  <span className="font-semibold text-[var(--espresso)]">
                    {new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--forest)]" />
                  <span>Cancel anytime, no questions asked</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--forest)]" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--forest)]" />
                  <span>Pause or skip deliveries anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}