import { motion } from 'motion/react';
import { 
  Home, 
  Coffee, 
  ShoppingCart, 
  CreditCard, 
  CheckCircle2, 
  XCircle,
  Info,
  MapPin,
  HelpCircle,
  Mail,
  User,
  Package,
  Lock,
  LayoutDashboard,
  Settings,
  Tag,
  FileText,
  ChevronRight,
  Globe,
  Shield,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './Card';

export function SiteMap() {
  const publicRoutes = [
    {
      path: '/',
      name: 'Home',
      icon: <Home className="w-4 h-4" />,
      description: 'Hero, featured drinks, beans, value props, testimonials, CTA',
      status: 'Live'
    },
    {
      path: '/menu',
      name: 'Menu',
      icon: <Coffee className="w-4 h-4" />,
      description: 'Tabs: Drinks / Beans / Merch',
      status: 'Live'
    },
    {
      path: '/product/:slug',
      name: 'Product Detail',
      icon: <FileText className="w-4 h-4" />,
      description: 'Customizations, add to cart',
      status: 'Live'
    },
    {
      path: '/cart',
      name: 'Cart',
      icon: <ShoppingCart className="w-4 h-4" />,
      description: 'Edit quantities, promo code, checkout CTA',
      status: 'Live'
    },
    {
      path: '/checkout',
      name: 'Checkout',
      icon: <CreditCard className="w-4 h-4" />,
      description: 'Guest or Sign in, Stripe Elements',
      status: 'Live'
    },
    {
      path: '/checkout/success',
      name: 'Success',
      icon: <CheckCircle2 className="w-4 h-4" />,
      description: 'Order summary, "Track order" demo',
      status: 'Live'
    },
    {
      path: '/checkout/cancelled',
      name: 'Cancelled',
      icon: <XCircle className="w-4 h-4" />,
      description: 'Return to cart',
      status: 'Planned'
    },
    {
      path: '/about',
      name: 'About',
      icon: <Info className="w-4 h-4" />,
      description: 'History + mission',
      status: 'Planned'
    },
    {
      path: '/locations',
      name: 'Locations',
      icon: <MapPin className="w-4 h-4" />,
      description: 'Coming soon',
      status: 'Planned'
    },
    {
      path: '/faq',
      name: 'FAQ',
      icon: <HelpCircle className="w-4 h-4" />,
      description: 'Shipping, refunds, subscriptions',
      status: 'Planned'
    },
    {
      path: '/contact',
      name: 'Contact',
      icon: <Mail className="w-4 h-4" />,
      description: 'Contact form',
      status: 'Planned'
    }
  ];

  const accountRoutes = [
    {
      path: '/account',
      name: 'Profile',
      icon: <User className="w-4 h-4" />,
      description: 'Profile + saved addresses',
      status: 'Planned'
    },
    {
      path: '/account/orders',
      name: 'Order History',
      icon: <Package className="w-4 h-4" />,
      description: 'View past orders',
      status: 'Planned'
    },
    {
      path: '/account/payment-methods',
      name: 'Payment Methods',
      icon: <CreditCard className="w-4 h-4" />,
      description: 'Saved cards (demo)',
      status: 'Planned'
    }
  ];

  const adminRoutes = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      description: 'Analytics & overview',
      status: 'Planned'
    },
    {
      path: '/admin/products',
      name: 'Manage Products',
      icon: <Coffee className="w-4 h-4" />,
      description: 'Add, edit, delete products',
      status: 'Planned'
    },
    {
      path: '/admin/orders',
      name: 'Manage Orders',
      icon: <Package className="w-4 h-4" />,
      description: 'Order fulfillment',
      status: 'Planned'
    },
    {
      path: '/admin/promos',
      name: 'Promotions',
      icon: <Tag className="w-4 h-4" />,
      description: 'Discount codes & campaigns',
      status: 'Planned'
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'Live') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">
          Live
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
        Planned
      </span>
    );
  };

  return (
    <div className="py-16 bg-gradient-to-b from-[var(--cream)] to-[var(--white)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--espresso)] rounded-full mb-4">
            <Globe className="w-4 h-4 text-[var(--white)]" />
            <span className="text-sm font-semibold text-[var(--white)]">Full Site Architecture</span>
          </div>
          <h2 className="mb-4 text-[var(--espresso)]">HomeBrewz Site Map</h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            A complete e-commerce platform with public pages, user accounts, and admin dashboard
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[var(--espresso)] mb-2">
                {publicRoutes.length}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">Public Pages</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[var(--espresso)] mb-2">
                {accountRoutes.length}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">Account Pages</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[var(--espresso)] mb-2">
                {adminRoutes.length}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">Admin Pages</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-[var(--espresso)] mb-2">
                {publicRoutes.filter(r => r.status === 'Live').length}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">Live Routes</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Public Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[var(--espresso)]">Public Routes</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      Customer-facing pages accessible to all visitors
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {publicRoutes.map((route, index) => (
                    <motion.div
                      key={route.path}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-[var(--cream)] rounded-xl hover:bg-[var(--muted)] transition-colors group"
                    >
                      <div className="w-8 h-8 bg-[var(--white)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <div className="text-[var(--espresso)]">
                          {route.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[var(--espresso)] text-sm">
                              {route.name}
                            </h4>
                            <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          {getStatusBadge(route.status)}
                        </div>
                        <code className="text-xs text-[var(--caramel)] font-mono block mb-1">
                          {route.path}
                        </code>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {route.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account & Admin Routes */}
          <div className="space-y-8">
            {/* Account Routes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--forest)] to-[#2d5a42] rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[var(--espresso)]">Account</h4>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Authenticated user pages
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {accountRoutes.map((route, index) => (
                      <motion.div
                        key={route.path}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-3 bg-[var(--cream)] rounded-lg hover:bg-[var(--muted)] transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-[var(--espresso)]">
                            {route.icon}
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <h4 className="font-semibold text-[var(--espresso)] text-sm">
                              {route.name}
                            </h4>
                            {getStatusBadge(route.status)}
                          </div>
                        </div>
                        <code className="text-xs text-[var(--forest)] font-mono block mb-1">
                          {route.path}
                        </code>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {route.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Admin Routes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-2 border-[var(--espresso)]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[var(--espresso)] to-[#1a120d] rounded-xl flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[var(--espresso)]">Admin</h4>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Enterprise dashboard
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {adminRoutes.map((route, index) => (
                      <motion.div
                        key={route.path}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-3 bg-[var(--espresso)]/5 rounded-lg hover:bg-[var(--espresso)]/10 transition-colors group border border-[var(--espresso)]/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-[var(--espresso)]">
                            {route.icon}
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <h4 className="font-semibold text-[var(--espresso)] text-sm">
                              {route.name}
                            </h4>
                            {getStatusBadge(route.status)}
                          </div>
                        </div>
                        <code className="text-xs text-[var(--espresso)] font-mono block mb-1 opacity-80">
                          {route.path}
                        </code>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {route.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Key Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-[var(--espresso)] to-[#1a120d] border-2 border-[var(--espresso)]">
            <CardContent className="p-8">
              <h3 className="mb-6 text-center text-[var(--cream)]">Complete E-Commerce Platform</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.125rem' }}>
                    Full Shopping Flow
                  </h4>
                  <p className="text-sm text-[var(--cream)]/80">
                    Product browsing, cart management, checkout, and order confirmation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.125rem' }}>
                    User Accounts
                  </h4>
                  <p className="text-sm text-[var(--cream)]/80">
                    Profile management, order history, and saved payment methods
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[var(--caramel)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-[var(--cream)]" style={{ fontSize: '1.125rem' }}>
                    Admin Dashboard
                  </h4>
                  <p className="text-sm text-[var(--cream)]/80">
                    Product, order, and promotion management for enterprise use
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Implementation Roadmap</h4>
              <p className="text-sm text-blue-800 mb-3">
                This site map represents the complete architecture for a production-ready e-commerce platform. 
                Currently implemented pages are marked as "Live", while planned features show the future roadmap.
              </p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>Live Routes:</strong> Fully functional with animations and interactions</li>
                <li>• <strong>Planned Routes:</strong> Designed and ready for implementation</li>
                <li>• <strong>Admin Section:</strong> Enterprise-grade management capabilities</li>
                <li>• <strong>SEO Ready:</strong> Each route optimized for search engines</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
