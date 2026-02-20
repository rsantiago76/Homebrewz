import { motion } from 'motion/react';
import { Code2, CreditCard, Server, ShieldCheck, Rocket, Gift, Smartphone, Package, Webhook, CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent } from './Card';

export function TechStack() {
  const builtWithItems = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'React + TypeScript',
      description: 'Modern, type-safe component architecture',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Stripe',
      description: 'Secure payment processing & PCI compliance',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'AWS Backend',
      description: 'Scalable cloud infrastructure (optional)',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Demo Guest Checkout',
      description: 'Frictionless user experience',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Secure Payment Flow',
      description: 'End-to-end encrypted transactions',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const futureEnhancements = [
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Subscription Ordering',
      description: 'Recurring deliveries with flexible plans',
      status: 'Planned',
      priority: 'High'
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: 'Loyalty Rewards',
      description: 'Points system and exclusive perks',
      status: 'In Design',
      priority: 'High'
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'Mobile App',
      description: 'Native iOS & Android experience',
      status: 'Research',
      priority: 'Medium'
    },
    {
      icon: <Package className="w-5 h-5" />,
      title: 'Real-time Inventory',
      description: 'Live stock tracking & notifications',
      status: 'Planned',
      priority: 'Medium'
    },
    {
      icon: <Webhook className="w-5 h-5" />,
      title: 'Stripe Webhooks',
      description: 'Automated order processing & updates',
      status: 'In Progress',
      priority: 'High'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-green-100 text-green-700';
      case 'In Design':
        return 'bg-purple-100 text-purple-700';
      case 'Planned':
        return 'bg-blue-100 text-blue-700';
      case 'Research':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-[var(--white)] to-[var(--cream)]">
      <div className="max-w-7xl mx-auto">
        {/* Built With Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--espresso)] rounded-full mb-4">
              <CheckCircle2 className="w-4 h-4 text-[var(--white)]" />
              <span className="text-sm font-semibold text-[var(--white)]">Production Ready</span>
            </div>
            <h2 className="mb-4 text-[var(--espresso)]">Built With</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Modern technologies powering a premium coffee shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {builtWithItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-[var(--caramel)]">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-[var(--espresso)] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="px-4 py-2 bg-[var(--white)] border-2 border-[var(--border)] rounded-full text-xs font-semibold text-[var(--espresso)] shadow-sm">
              Motion Animations
            </div>
            <div className="px-4 py-2 bg-[var(--white)] border-2 border-[var(--border)] rounded-full text-xs font-semibold text-[var(--espresso)] shadow-sm">
              Tailwind CSS v4
            </div>
            <div className="px-4 py-2 bg-[var(--white)] border-2 border-[var(--border)] rounded-full text-xs font-semibold text-[var(--espresso)] shadow-sm">
              Canvas Confetti
            </div>
            <div className="px-4 py-2 bg-[var(--white)] border-2 border-[var(--border)] rounded-full text-xs font-semibold text-[var(--espresso)] shadow-sm">
              Lucide Icons
            </div>
            <div className="px-4 py-2 bg-[var(--white)] border-2 border-[var(--border)] rounded-full text-xs font-semibold text-[var(--espresso)] shadow-sm">
              Responsive Design
            </div>
          </motion.div>
        </motion.div>

        {/* Future Enhancements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--caramel)] to-[var(--espresso)] rounded-full mb-4">
              <Rocket className="w-4 h-4 text-[var(--white)]" />
              <span className="text-sm font-semibold text-[var(--white)]">Coming Soon</span>
            </div>
            <h2 className="mb-4 text-[var(--espresso)]">Future Enhancements</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Product roadmap for the next generation of HomeBrewz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureEnhancements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--caramel)] to-[var(--espresso)] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-bold text-[var(--espresso)] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Roadmap Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-12 p-8 bg-gradient-to-r from-[var(--espresso)] to-[#1a120d] rounded-2xl text-center"
          >
            <h3 className="mb-4 text-[var(--white)]">Join the Journey</h3>
            <p className="text-[var(--cream)] mb-6 max-w-2xl mx-auto">
              We're constantly improving HomeBrewz to deliver the best coffee shopping experience. 
              These features represent our commitment to innovation and customer satisfaction.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-6 py-3 bg-[var(--white)] rounded-xl text-[var(--espresso)] font-semibold hover:bg-[var(--cream)] transition-colors cursor-pointer">
                View Full Roadmap
              </div>
              <div className="px-6 py-3 bg-transparent border-2 border-[var(--cream)] rounded-xl text-[var(--cream)] font-semibold hover:bg-[var(--cream)] hover:text-[var(--espresso)] transition-colors cursor-pointer">
                Request a Feature
              </div>
            </div>
          </motion.div>

          {/* Status Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-[var(--muted-foreground)]">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-[var(--muted-foreground)]">In Design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[var(--muted-foreground)]">Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-[var(--muted-foreground)]">Research</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
