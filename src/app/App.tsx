import { Button } from './components/Button';
import { Card, CardHeader, CardContent, CardFooter } from './components/Card';
import { Input } from './components/Input';
import { Badge } from './components/Badge';
import { Coffee, ShoppingCart, Heart, Search, Filter, X, Check, Clock, Droplet, Thermometer, Package } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart as ShoppingCartComponent, CartItem } from './components/ShoppingCart';
import { CoffeeQuiz } from './components/CoffeeQuiz';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { TechStack } from './components/TechStack';
import { SiteMap } from './components/SiteMap';
import { BrewingMethodModal, BrewingMethodType } from './components/BrewingMethodModal';
import { MembershipCheckoutPage, MembershipTier } from './components/MembershipCheckoutPage';
import { MembershipConfirmationPage } from './components/MembershipConfirmationPage';
import { MembershipBillingModal } from './components/MembershipBillingModal';

export default function App() {
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'subscription' | 'guide' | 'quiz' | 'product-detail' | 'checkout' | 'order-confirmation' | 'membership-checkout' | 'membership-confirmation'>('products');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const [brewingModalOpen, setBrewingModalOpen] = useState(false);
  const [selectedBrewingMethod, setSelectedBrewingMethod] = useState<BrewingMethodType | null>(null);
  const [selectedMembershipTier, setSelectedMembershipTier] = useState<MembershipTier>('basic');
  const [subscriptionId, setSubscriptionId] = useState<string>('');
  const [membershipBillingCycle, setMembershipBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);

  const membershipData = {
    basic: {
      name: 'Coffee Lover',
      monthlyPrice: 1200,
      annualPrice: 10200,
      products: [
        { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' }
      ]
    },
    premium: {
      name: 'Coffee Connoisseur',
      monthlyPrice: 2800,
      annualPrice: 23800,
      products: [
        { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' },
        { name: 'Colombian Supremo', size: '12oz', roast: 'Medium' }
      ]
    },
    elite: {
      name: 'Coffee Master',
      monthlyPrice: 4800,
      annualPrice: 40800,
      products: [
        { name: 'Ethiopian Yirgacheffe', size: '12oz', roast: 'Light' },
        { name: 'Colombian Supremo', size: '12oz', roast: 'Medium' },
        { name: 'Sumatra Mandheling', size: '12oz', roast: 'Dark' },
        { name: 'Kenyan AA', size: '12oz', roast: 'Light' }
      ]
    }
  };

  const addMembershipToCart = (tier: MembershipTier, billingCycle: 'monthly' | 'annual') => {
    const membership = membershipData[tier];
    const priceCents = billingCycle === 'monthly' ? membership.monthlyPrice : membership.annualPrice;
    
    const membershipItem: CartItem = {
      id: `membership-${tier}-${billingCycle}`,
      name: membership.name,
      priceCents,
      quantity: 1,
      type: 'membership',
      membershipTier: tier,
      billingCycle,
      includedProducts: membership.products
    };

    // Remove any existing memberships and add the new one
    setCartItems(prev => {
      const withoutMemberships = prev.filter(item => item.type !== 'membership');
      return [...withoutMemberships, membershipItem];
    });
    
    setCartOpen(true);
  };

  const products = [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe',
      roast: 'light',
      origin: 'ethiopia',
      notes: 'Light roast • Floral notes',
      description: 'Bright and fruity with hints of blueberry and jasmine. Perfect for pour-over brewing.',
      price: 18,
      badge: 'bestseller' as const,
    },
    {
      id: 2,
      name: 'Colombian Supremo',
      roast: 'medium',
      origin: 'colombia',
      notes: 'Medium roast • Balanced',
      description: 'Smooth and well-balanced with caramel sweetness and a nutty finish.',
      price: 16,
      badge: 'new' as const,
    },
    {
      id: 3,
      name: 'Sumatra Mandheling',
      roast: 'dark',
      origin: 'indonesia',
      notes: 'Dark roast • Bold',
      description: 'Full-bodied and earthy with chocolate undertones. Ideal for espresso.',
      price: 20,
      badge: null,
    },
    {
      id: 4,
      name: 'Costa Rican Tarrazu',
      roast: 'medium',
      origin: 'costa-rica',
      notes: 'Medium roast • Citrus',
      description: 'Vibrant acidity with notes of orange and honey. Great for cold brew.',
      price: 17,
      badge: 'new' as const,
    },
    {
      id: 5,
      name: 'Brazilian Santos',
      roast: 'dark',
      origin: 'brazil',
      notes: 'Dark roast • Nutty',
      description: 'Low acidity with chocolate and nut flavors. Perfect morning coffee.',
      price: 15,
      badge: null,
    },
    {
      id: 6,
      name: 'Kenyan AA',
      roast: 'light',
      origin: 'kenya',
      notes: 'Light roast  Bright',
      description: 'Complex fruit flavors with wine-like acidity. A true connoisseur\'s choice.',
      price: 22,
      badge: 'bestseller' as const,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesRoast = selectedRoast === 'all' || product.roast === selectedRoast;
    const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoast && matchesOrigin && matchesSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cartItems.find(item => item.id === product.id.toString());
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id.toString()
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { 
        id: product.id.toString(), 
        name: product.name, 
        priceCents: product.price * 100, // Convert dollars to cents
        quantity: 1,
        size: '12oz bag'
      }]);
    }
    setCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--white)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo Wordmark */}
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[var(--espresso)]" strokeWidth={2.5} />
              <h1 className="text-4xl text-[var(--espresso)]">HomeBrewz</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCartOpen(true)}>
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="primary" size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Checkout Preview */}
        {activeTab === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onBack={() => setActiveTab('products')}
            onComplete={(orderId: string) => {
              // Store the orderId from payment service
              setOrderNumber(orderId);
              setConfirmedItems([...cartItems]);
              // Clear cart and show confirmation
              setCartItems([]);
              setActiveTab('order-confirmation');
            }}
          />
        )}

        {/* Order Confirmation Preview */}
        {activeTab === 'order-confirmation' && (
          <OrderConfirmationPage
            orderNumber={orderNumber}
            items={confirmedItems}
            onBackToHome={() => setActiveTab('products')}
            onTrackOrder={() => {
              alert('Demo Mode: Order tracking feature coming soon!');
            }}
          />
        )}

        {/* Membership Checkout Preview */}
        {activeTab === 'membership-checkout' && (
          <MembershipCheckoutPage
            tier={selectedMembershipTier}
            onBack={() => setActiveTab('subscription')}
            onComplete={(subscriptionId: string, billingCycle: 'monthly' | 'annual') => {
              // Store the subscriptionId and billing cycle
              setSubscriptionId(subscriptionId);
              setMembershipBillingCycle(billingCycle);
              // Show confirmation
              setActiveTab('membership-confirmation');
            }}
          />
        )}

        {/* Membership Confirmation Preview */}
        {activeTab === 'membership-confirmation' && (
          <MembershipConfirmationPage
            subscriptionId={subscriptionId}
            tier={selectedMembershipTier}
            billingCycle={membershipBillingCycle}
            onBackToHome={() => setActiveTab('products')}
          />
        )}

        {/* All other content - only show when not in checkout/confirmation flows */}
        {!['checkout', 'order-confirmation', 'membership-checkout', 'membership-confirmation'].includes(activeTab) && (
          <>
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <Badge variant="new" className="mb-4">New Launch</Badge>
          <h2 className="mb-4 text-[var(--espresso)]">Premium Coffee, Delivered</h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
            Discover artisan-roasted beans from around the world. Crafted for home brewers who demand excellence.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant={activeTab === 'products' ? 'primary' : 'ghost'} 
              size="lg" 
              onClick={() => setActiveTab('products')}
            >
              Shop Collection
            </Button>
            <Button 
              variant={activeTab === 'guide' ? 'primary' : 'ghost'} 
              size="lg" 
              onClick={() => setActiveTab('guide')}
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="mb-12">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant={activeTab === 'products' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('products')}
            >
              Shop Products
            </Button>
            <Button
              variant={activeTab === 'subscription' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('subscription')}
            >
              Membership
            </Button>
            <Button
              variant={activeTab === 'guide' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('guide')}
            >
              Brewing Guide
            </Button>
            <Button
              variant={activeTab === 'quiz' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('quiz')}
            >
              Coffee Quiz
            </Button>
            <Button
              variant={activeTab === 'product-detail' ? 'primary' : 'ghost'}
              onClick={() => setActiveTab('product-detail')}
            >
              View Latte
            </Button>
          </div>
        </section>

        {/* Product Detail Page */}
        {activeTab === 'product-detail' && (
          <ProductDetailPage 
            onAddToCart={(product) => {
              addToCart(product);
            }}
            onBack={() => setActiveTab('products')}
          />
        )}

        {/* Products Section with Filtering */}
        {activeTab === 'products' && (
          <section className="mb-16">
            <h3 className="mb-8 text-center text-[var(--espresso)]">Explore Our Collection</h3>
            
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search coffee by name or flavor profile..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-[var(--white)] border border-[var(--border)] rounded-xl text-[var(--espresso)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--caramel)] focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--espresso)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
                  <span className="text-sm font-semibold text-[var(--muted-foreground)]">Filter by:</span>
                </div>
                
                {/* Roast Level Filter */}
                <div className="flex gap-2">
                  {['all', 'light', 'medium', 'dark'].map((roast) => (
                    <button
                      key={roast}
                      onClick={() => setSelectedRoast(roast)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                        selectedRoast === roast
                          ? 'bg-[var(--espresso)] text-[var(--white)]'
                          : 'bg-[var(--white)] text-[var(--espresso)] border border-[var(--border)] hover:border-[var(--caramel)]'
                      }`}
                    >
                      {roast === 'all' ? 'All Roasts' : `${roast} Roast`}
                    </button>
                  ))}
                </div>

                {/* Origin Filter */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: 'all', label: 'All Origins' },
                    { value: 'ethiopia', label: 'Ethiopia' },
                    { value: 'colombia', label: 'Colombia' },
                    { value: 'indonesia', label: 'Indonesia' },
                    { value: 'costa-rica', label: 'Costa Rica' },
                    { value: 'brazil', label: 'Brazil' },
                    { value: 'kenya', label: 'Kenya' },
                  ].map((origin) => (
                    <button
                      key={origin.value}
                      onClick={() => setSelectedOrigin(origin.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        selectedOrigin === origin.value
                          ? 'bg-[var(--forest)] text-[var(--white)]'
                          : 'bg-[var(--white)] text-[var(--espresso)] border border-[var(--border)] hover:border-[var(--caramel)]'
                      }`}
                    >
                      {origin.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-center text-sm text-[var(--muted-foreground)]">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id}>
                  <div className={`h-48 bg-gradient-to-br ${
                    product.roast === 'light' ? 'from-[var(--caramel)] to-[var(--espresso)]' :
                    product.roast === 'medium' ? 'from-[var(--forest)] to-[var(--espresso)]' :
                    'from-[#8B6F47] to-[var(--espresso)]'
                  } relative`}>
                    {product.badge && (
                      <Badge variant={product.badge} className="absolute top-4 left-4">
                        {product.badge === 'bestseller' ? 'Bestseller' : 'New'}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <h4 className="mb-1">{product.name}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{product.notes}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{product.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[var(--espresso)]">${product.price}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">/ 12oz bag</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" className="w-full" onClick={() => addToCart(product)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-[var(--muted-foreground)]">No products match your filters.</p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => {
                    setSelectedRoast('all');
                    setSelectedOrigin('all');
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Subscription/Membership Section */}
        {activeTab === 'subscription' && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-[var(--espresso)]">HomeBrewz Membership</h3>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Join our community of coffee enthusiasts and enjoy exclusive benefits, curated selections, and significant savings.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Basic Tier */}
              <Card>
                <CardHeader className="text-center">
                  <Badge variant="default" className="mb-4 mx-auto">Basic</Badge>
                  <h4 className="mb-2">Coffee Lover</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[var(--espresso)]">$12</span>
                    <span className="text-[var(--muted-foreground)]">/month</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">Perfect for getting started</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">1 bag of coffee per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">10% off all purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Free shipping on orders over $30</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Monthly brewing tips email</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setSelectedMembershipTier('basic');
                    setMembershipModalOpen(true);
                  }}>Get Started</Button>
                </CardFooter>
              </Card>

              {/* Premium Tier */}
              <Card className="border-2 border-[var(--caramel)] relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="new">Most Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <Badge variant="bestseller" className="mb-4 mx-auto">Premium</Badge>
                  <h4 className="mb-2">Coffee Connoisseur</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[var(--espresso)]">$28</span>
                    <span className="text-[var(--muted-foreground)]">/month</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">For serious coffee enthusiasts</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">2 bags of coffee per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">20% off all purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Free shipping on all orders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Access to limited edition roasts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Exclusive brewing masterclasses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Priority customer support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full" onClick={() => {
                    setSelectedMembershipTier('premium');
                    setMembershipModalOpen(true);
                  }}>Get Started</Button>
                </CardFooter>
              </Card>

              {/* Elite Tier */}
              <Card>
                <CardHeader className="text-center">
                  <Badge variant="new" className="mb-4 mx-auto">Elite</Badge>
                  <h4 className="mb-2">Coffee Master</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[var(--espresso)]">$48</span>
                    <span className="text-[var(--muted-foreground)]">/month</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">The ultimate coffee experience</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">4 bags of coffee per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">30% off all purchases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Free express shipping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Early access to all new releases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Personalized coffee recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Annual brewing equipment gift</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[var(--forest)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">VIP event invitations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full" onClick={() => {
                    setSelectedMembershipTier('elite');
                    setMembershipModalOpen(true);
                  }}>Get Started</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Membership Benefits */}
            <Card className="bg-gradient-to-br from-[var(--espresso)] to-[#1F1410] text-[var(--cream)]">
              <CardContent className="p-8">
                <h4 className="mb-6 text-center text-[var(--cream)]">Why Join HomeBrewz Membership?</h4>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-[var(--white)]" />
                    </div>
                    <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.25rem' }}>Curated Selections</h4>
                    <p className="text-sm text-[var(--cream)]/80">
                      Hand-picked beans from the world's finest coffee regions, delivered to your door.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Coffee className="w-8 h-8 text-[var(--white)]" />
                    </div>
                    <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.25rem' }}>Expert Guidance</h4>
                    <p className="text-sm text-[var(--cream)]/80">
                      Learn from master roasters and baristas through exclusive content and tutorials.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-[var(--white)]" />
                    </div>
                    <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.25rem' }}>Community</h4>
                    <p className="text-sm text-[var(--cream)]/80">
                      Join a passionate community of coffee lovers and share your brewing journey.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Brewing Guide Section */}
        {activeTab === 'guide' && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-[var(--espresso)]">Master the Art of Brewing</h3>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                From bean selection to the perfect cup, learn the techniques that elevate your home brewing experience.
              </p>
            </div>

            {/* Brewing Methods */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Pour Over */}
              <Card>
                <div className="h-48 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] flex items-center justify-center">
                  <Droplet className="w-16 h-16 text-[var(--white)]" />
                </div>
                <CardHeader>
                  <h4 className="mb-2">Pour Over</h4>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    <span>3-4 minutes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    A manual brewing method that produces a clean, flavorful cup with bright acidity.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--espresso)]">Perfect For:</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Light to medium roasts, floral and fruity notes</p>
                    <p className="text-sm font-semibold text-[var(--espresso)] mt-3">Recipe:</p>
                    <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                      <li>• 20g coffee (medium-fine grind)</li>
                      <li>• 300ml water at 200°F</li>
                      <li>• Bloom for 30 seconds</li>
                      <li>• Pour in circular motions</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setSelectedBrewingMethod('pour-over');
                    setBrewingModalOpen(true);
                  }}>Learn More</Button>
                </CardFooter>
              </Card>

              {/* French Press */}
              <Card>
                <div className="h-48 bg-gradient-to-br from-[var(--forest)] to-[var(--espresso)] flex items-center justify-center">
                  <Coffee className="w-16 h-16 text-[var(--white)]" />
                </div>
                <CardHeader>
                  <h4 className="mb-2">French Press</h4>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    <span>4-5 minutes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Full immersion brewing creates a rich, full-bodied cup with more oils and sediment.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--espresso)]">Perfect For:</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Medium to dark roasts, bold flavors</p>
                    <p className="text-sm font-semibold text-[var(--espresso)] mt-3">Recipe:</p>
                    <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                      <li>• 30g coffee (coarse grind)</li>
                      <li>• 500ml water at 200°F</li>
                      <li>• Steep for 4 minutes</li>
                      <li>• Press slowly and serve</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setSelectedBrewingMethod('french-press');
                    setBrewingModalOpen(true);
                  }}>Learn More</Button>
                </CardFooter>
              </Card>

              {/* Espresso */}
              <Card>
                <div className="h-48 bg-gradient-to-br from-[#8B6F47] to-[var(--espresso)] flex items-center justify-center">
                  <Thermometer className="w-16 h-16 text-[var(--white)]" />
                </div>
                <CardHeader>
                  <h4 className="mb-2">Espresso</h4>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    <span>25-30 seconds</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Concentrated coffee brewed under pressure, forming the base for many specialty drinks.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--espresso)]">Perfect For:</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Dark roasts, intense flavor profiles</p>
                    <p className="text-sm font-semibold text-[var(--espresso)] mt-3">Recipe:</p>
                    <ul className="text-sm text-[var(--muted-foreground)] space-y-1">
                      <li>• 18-20g coffee (fine grind)</li>
                      <li>• 9 bars of pressure</li>
                      <li>• 25-30 second extraction</li>
                      <li>• Yields 1.5-2oz shot</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setSelectedBrewingMethod('espresso');
                    setBrewingModalOpen(true);
                  }}>Learn More</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Coffee Basics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h4 className="text-[var(--espresso)]">Coffee 101: The Basics</h4>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Grind Size Matters</h4>
                    <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                      <li><strong>Coarse:</strong> French Press, Cold Brew</li>
                      <li><strong>Medium:</strong> Drip Coffee Makers</li>
                      <li><strong>Medium-Fine:</strong> Pour Over, Aeropress</li>
                      <li><strong>Fine:</strong> Espresso, Moka Pot</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Water Temperature</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      The ideal brewing temperature is between 195-205°F (90-96°C). Too hot extracts bitter compounds, too cool results in under-extraction.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Coffee-to-Water Ratio</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      A good starting point is 1:15 to 1:17 ratio (1g coffee to 15-17ml water). Adjust based on your taste preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h4 className="text-[var(--espresso)]">Storage & Freshness Tips</h4>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Proper Storage</h4>
                    <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                      <li>• Store in an airtight container</li>
                      <li>• Keep away from light, heat, and moisture</li>
                      <li>• Don't refrigerate or freeze whole beans</li>
                      <li>• Use within 2-3 weeks of opening</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Roast Date</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Coffee is best consumed 7-21 days after roasting. All HomeBrewz coffee is roasted to order and shipped within 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[var(--espresso)]" style={{ fontSize: '1.125rem' }}>Grind Fresh</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      For maximum flavor, grind your beans immediately before brewing. Pre-ground coffee loses flavor quickly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Coffee Quiz Section */}
        {activeTab === 'quiz' && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h3 className="mb-4 text-[var(--espresso)]">Test Your Coffee Knowledge</h3>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Take our coffee quiz to see how much you know about the world of coffee and discover new facts along the way.
              </p>
            </div>

            <CoffeeQuiz />
          </section>
        )}

        {/* Product Cards Demo & Tech Stack */}
        <section className="mb-16">
          {/* Product Cards */}
          <div className="mb-12">
            <h4 className="mb-6 text-[var(--espresso)]">Product Cards</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <div className="h-48 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] relative">
                  <Badge variant="bestseller" className="absolute top-4 left-4">Bestseller</Badge>
                </div>
                <CardHeader>
                  <h4 className="mb-1">Ethiopian Yirgacheffe</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">Light roast • Floral notes</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Bright and fruity with hints of blueberry and jasmine. Perfect for pour-over brewing.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--espresso)]">$18</span>
                    <span className="text-sm text-[var(--muted-foreground)]">/ 12oz bag</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>

              <Card>
                <div className="h-48 bg-gradient-to-br from-[var(--forest)] to-[var(--espresso)] relative">
                  <Badge variant="new" className="absolute top-4 left-4">New</Badge>
                </div>
                <CardHeader>
                  <h4 className="mb-1">Colombian Supremo</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">Medium roast • Balanced</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Smooth and well-balanced with caramel sweetness and a nutty finish.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--espresso)]">$16</span>
                    <span className="text-sm text-[var(--muted-foreground)]">/ 12oz bag</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>

              <Card>
                <div className="h-48 bg-gradient-to-br from-[#8B6F47] to-[var(--espresso)]"></div>
                <CardHeader>
                  <h4 className="mb-1">Sumatra Mandheling</h4>
                  <p className="text-sm text-[var(--muted-foreground)]">Dark roast • Bold</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Full-bodied and earthy with chocolate undertones. Ideal for espresso.</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[var(--espresso)]">$20</span>
                    <span className="text-sm text-[var(--muted-foreground)]">/ 12oz bag</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h4 className="mb-6 text-[var(--espresso)]">Tech Stack</h4>
            <TechStack />
          </div>
        </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 py-12 bg-[var(--espresso)] text-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-6 h-6" strokeWidth={2.5} />
            <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>HomeBrewz</span>
          </div>
          <p className="text-sm text-[var(--cream)]/70">Premium coffee for the modern home brewer</p>
        </div>
      </footer>

      {/* ShoppingCart */}
      <ShoppingCartComponent
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveItem={(id) => removeFromCart(id)}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          setCartOpen(false);
          setActiveTab('checkout');
        }}
      />

      {/* Brewing Method Modal */}
      <BrewingMethodModal
        isOpen={brewingModalOpen}
        method={selectedBrewingMethod}
        onClose={() => setBrewingModalOpen(false)}
      />

      {/* Membership Billing Modal */}
      <MembershipBillingModal
        isOpen={membershipModalOpen}
        tier={selectedMembershipTier}
        onClose={() => setMembershipModalOpen(false)}
        onSelectBilling={(tier, billingCycle) => {
          addMembershipToCart(tier, billingCycle);
        }}
      />
    </div>
  );
}