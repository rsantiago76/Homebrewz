import { motion } from 'motion/react';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';
import { CheckCircle2, Coffee, Mail, Calendar, Package, Gift, ArrowRight } from 'lucide-react';

interface MembershipConfirmationPageProps {
  subscriptionId: string;
  tier: 'basic' | 'premium' | 'elite';
  billingCycle: 'monthly' | 'annual';
  onBackToHome: () => void;
}

const membershipDetails = {
  basic: {
    name: 'Coffee Lover',
    color: 'from-[var(--caramel)] to-[var(--espresso)]',
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' }
    ]
  },
  premium: {
    name: 'Coffee Connoisseur',
    color: 'from-[var(--forest)] to-[var(--espresso)]',
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' },
      { name: 'Colombian Supremo', size: '12oz', roast: 'Medium' }
    ]
  },
  elite: {
    name: 'Coffee Master',
    color: 'from-[#8B6F47] to-[var(--espresso)]',
    products: [
      { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' },
      { name: 'Colombian Supremo', size: '12oz', roast: 'Medium' },
      { name: 'Sumatra Mandheling', size: '12oz', roast: 'Dark' },
      { name: 'Kenyan AA', size: '12oz', roast: 'Light' }
    ]
  }
};

export function MembershipConfirmationPage({ 
  subscriptionId, 
  tier,
  billingCycle,
  onBackToHome 
}: MembershipConfirmationPageProps) {
  const membership = membershipDetails[tier];
  const nextDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center mb-8"
      >
        <div className="w-24 h-24 bg-[var(--forest)] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h2 className="mb-4 text-[var(--espresso)]">Welcome to HomeBrewz!</h2>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Your {membership.name} membership is now active. Get ready for an amazing coffee journey!
        </p>
      </motion.div>

      {/* Subscription Details */}
      <Card className="mb-8">
        <div className={`h-32 bg-gradient-to-br ${membership.color} flex items-center justify-center`}>
          <div className="text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">
              {tier} Membership
            </p>
            <h3 className="text-white mb-2">{membership.name}</h3>
            <p className="text-sm opacity-90">
              Subscription ID: {subscriptionId}
            </p>
          </div>
        </div>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-[var(--espresso)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--espresso)] mb-1">Billing Cycle</p>
              <p className="text-sm text-[var(--muted-foreground)] capitalize">{billingCycle}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-[var(--espresso)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--espresso)] mb-1">First Delivery</p>
              <p className="text-sm text-[var(--muted-foreground)]">{nextDeliveryDate.split(',')[0]}, {nextDeliveryDate.split(',')[1]}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--cream)] rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-[var(--espresso)]" />
              </div>
              <p className="text-sm font-semibold text-[var(--espresso)] mb-1">Confirmation Sent</p>
              <p className="text-sm text-[var(--muted-foreground)]">Check your email</p>
            </div>
          </div>

          <div className="bg-[var(--cream)] rounded-xl p-6">
            <div className="flex gap-3 mb-4">
              <Gift className="w-6 h-6 text-[var(--caramel)] flex-shrink-0" />
              <div>
                <h4 className="text-[var(--espresso)] mb-2" style={{ fontSize: '1.125rem' }}>
                  Welcome Gift On the Way!
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">
                  As a new member, you'll receive a special welcome package with your first delivery including exclusive brewing tips and a HomeBrewz surprise gift.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="mb-8">
        <CardHeader>
          <h4 className="text-[var(--espresso)]">Your First Delivery Includes</h4>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {membership.products.map((product, index) => (
              <div key={index} className="p-4 bg-[var(--cream)] rounded-lg border border-[var(--border)]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--espresso)] text-sm mb-1">{product.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{product.size} • {product.roast} Roast</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[var(--white)] border-2 border-[var(--caramel)] rounded-lg text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              <strong className="text-[var(--espresso)]">{membership.products.length} bag{membership.products.length > 1 ? 's' : ''}</strong> of premium coffee • Freshly roasted • Delivered in 3-5 days
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="mb-8">
        <CardHeader>
          <h4 className="text-[var(--espresso)]">What Happens Next?</h4>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[var(--caramel)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-[var(--espresso)] mb-1">We'll Roast Your Beans</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Your coffee will be freshly roasted to order within the next 24 hours to ensure maximum freshness.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[var(--caramel)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <p className="font-semibold text-[var(--espresso)] mb-1">Shipping Confirmation</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  You'll receive tracking information via email once your package ships. Delivery typically takes 3-5 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[var(--caramel)] text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <p className="font-semibold text-[var(--espresso)] mb-1">Enjoy & Customize</p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Log in to your account to customize future deliveries, update your preferences, or manage your subscription.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--cream)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Coffee className="w-6 h-6 text-[var(--espresso)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[var(--espresso)] mb-2" style={{ fontSize: '1rem' }}>
                  Manage Your Subscription
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  Update preferences, pause deliveries, or change your plan anytime.
                </p>
                <Button variant="ghost" size="sm">
                  View Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[var(--cream)] rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-[var(--espresso)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[var(--espresso)] mb-2" style={{ fontSize: '1rem' }}>
                  Track Your Order
                </h4>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  Follow your first shipment from roastery to your doorstep.
                </p>
                <Button variant="ghost" size="sm">
                  Track Shipment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="primary" size="lg" onClick={onBackToHome}>
          Back to Home
        </Button>
        <Button variant="ghost" size="lg" onClick={() => window.print()}>
          Print Confirmation
        </Button>
      </div>

      {/* Support Info */}
      <Card className="mt-8 bg-[var(--cream)]">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Questions about your membership?{' '}
            <button className="text-[var(--espresso)] font-semibold hover:underline">
              Contact our support team
            </button>
            {' '}or visit our{' '}
            <button className="text-[var(--espresso)] font-semibold hover:underline">
              Help Center
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}