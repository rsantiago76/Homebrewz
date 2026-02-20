import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { useState } from 'react';

export type MembershipTier = 'basic' | 'premium' | 'elite';

interface MembershipBillingModalProps {
  isOpen: boolean;
  tier: MembershipTier;
  onClose: () => void;
  onSelectBilling: (tier: MembershipTier, billingCycle: 'monthly' | 'annual') => void;
}

const membershipDetails = {
  basic: {
    name: 'Coffee Lover',
    monthlyPrice: 12,
    annualPrice: 102,
    products: 1
  },
  premium: {
    name: 'Coffee Connoisseur',
    monthlyPrice: 28,
    annualPrice: 238,
    products: 2
  },
  elite: {
    name: 'Coffee Master',
    monthlyPrice: 48,
    annualPrice: 408,
    products: 4
  }
};

export function MembershipBillingModal({ isOpen, tier, onClose, onSelectBilling }: MembershipBillingModalProps) {
  const membership = membershipDetails[tier];
  const [selectedCycle, setSelectedCycle] = useState<'monthly' | 'annual'>('monthly');
  const savings = (membership.monthlyPrice * 12) - membership.annualPrice;

  const handleAddToCart = () => {
    onSelectBilling(tier, selectedCycle);
    onClose();
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <Card className="w-full max-w-md pointer-events-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-[var(--espresso)] mb-1">{membership.name}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">Choose your billing cycle</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-[var(--cream)] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[var(--espresso)]" />
                  </button>
                </div>

                {/* Billing Options */}
                <div className="space-y-3 mb-6">
                  {/* Monthly */}
                  <button
                    onClick={() => setSelectedCycle('monthly')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left ${
                      selectedCycle === 'monthly'
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
                          ${membership.monthlyPrice}/month • Cancel anytime
                        </p>
                      </div>
                      {selectedCycle === 'monthly' && (
                        <CheckCircle2 className="w-5 h-5 text-[var(--caramel)] flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Annual */}
                  <button
                    onClick={() => setSelectedCycle('annual')}
                    className={`w-full p-4 border-2 rounded-xl transition-all text-left relative ${
                      selectedCycle === 'annual'
                        ? 'border-[var(--caramel)] bg-[var(--cream)]'
                        : 'border-[var(--border)] hover:border-[var(--caramel)]'
                    }`}
                  >
                    <div className="absolute -top-2 right-4 bg-[var(--forest)] text-white text-xs px-2 py-1 rounded-full font-bold">
                      Save ${savings}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[var(--espresso)] mb-1">
                          <RefreshCw className="w-4 h-4 inline mr-2" />
                          Annual Billing
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          ${membership.annualPrice}/year • 15% discount
                        </p>
                      </div>
                      {selectedCycle === 'annual' && (
                        <CheckCircle2 className="w-5 h-5 text-[var(--caramel)] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                </div>

                {/* Summary */}
                <div className="p-4 bg-[var(--cream)] rounded-lg mb-6">
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">
                    <strong className="text-[var(--espresso)]">Includes:</strong> {membership.products} bag{membership.products > 1 ? 's' : ''} of coffee per month
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    <strong className="text-[var(--espresso)]">First charge:</strong> ${selectedCycle === 'monthly' ? membership.monthlyPrice : membership.annualPrice}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleAddToCart} className="flex-1">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
