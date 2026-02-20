import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Droplet, Coffee, Thermometer, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { Card, CardHeader, CardContent } from './Card';

export type BrewingMethodType = 'pour-over' | 'french-press' | 'espresso';

interface BrewingMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: BrewingMethodType | null;
}

const brewingMethodContent = {
  'pour-over': {
    title: 'Pour Over Brewing Guide',
    icon: Droplet,
    gradient: 'from-[var(--caramel)] to-[var(--espresso)]',
    time: '3-4 minutes',
    difficulty: 'Intermediate',
    description: 'Pour over coffee is a manual brewing method that gives you complete control over the brewing process, resulting in a clean, complex cup that highlights the unique characteristics of your coffee beans.',
    equipment: [
      'Pour over dripper (V60, Chemex, Kalita Wave)',
      'Paper or metal filter',
      'Gooseneck kettle',
      'Coffee grinder',
      'Scale (optional but recommended)',
      'Timer'
    ],
    steps: [
      {
        title: 'Prepare Your Setup',
        description: 'Place the filter in your dripper and rinse with hot water. This removes paper taste and preheats your equipment. Discard the rinse water.'
      },
      {
        title: 'Measure & Grind',
        description: 'Weigh 20g of coffee beans and grind to a medium-fine consistency (similar to sea salt). The grind size affects extraction—adjust based on taste.'
      },
      {
        title: 'Heat Your Water',
        description: 'Bring water to 200°F (93°C). If you don\'t have a thermometer, let boiling water rest for 30-45 seconds.'
      },
      {
        title: 'Bloom Phase',
        description: 'Add coffee grounds to the filter. Pour 40-50ml of water in a circular motion to saturate all grounds. Wait 30-45 seconds as CO2 releases and the coffee "blooms".'
      },
      {
        title: 'Main Pour',
        description: 'Slowly pour the remaining water (to 300ml total) in concentric circles, starting from the center and spiraling outward. Avoid pouring directly on the filter.'
      },
      {
        title: 'Complete Extraction',
        description: 'The entire brew should take 3-4 minutes. If it\'s faster, try a finer grind; if slower, go coarser. Remove the dripper and enjoy!'
      }
    ],
    tips: [
      'Use fresh, high-quality beans roasted within the past 2-3 weeks',
      'Pour in a slow, steady stream—not too fast or too slow',
      'Keep water temperature consistent throughout the brew',
      'Experiment with grind size to find your perfect cup',
      'Try different pour patterns for varied flavor profiles'
    ],
    troubleshooting: [
      { problem: 'Bitter taste', solution: 'Water too hot or over-extracted. Lower temperature or use coarser grind.' },
      { problem: 'Weak/sour taste', solution: 'Under-extracted. Use finer grind or increase water temperature.' },
      { problem: 'Brew takes too long', solution: 'Grind is too fine. Adjust to a slightly coarser setting.' }
    ]
  },
  'french-press': {
    title: 'French Press Brewing Guide',
    icon: Coffee,
    gradient: 'from-[var(--forest)] to-[var(--espresso)]',
    time: '4-5 minutes',
    difficulty: 'Beginner',
    description: 'The French Press (or press pot) uses full immersion brewing to create a rich, full-bodied cup. It\'s simple, forgiving, and produces coffee with more oils and sediment for a robust flavor.',
    equipment: [
      'French Press (also called press pot or plunger pot)',
      'Coffee grinder',
      'Kettle',
      'Spoon for stirring',
      'Scale (optional)',
      'Timer'
    ],
    steps: [
      {
        title: 'Preheat the Press',
        description: 'Pour hot water into the French Press to warm it up. This maintains brewing temperature. Swirl and discard the water.'
      },
      {
        title: 'Measure & Grind Coffee',
        description: 'Weigh 30g of coffee beans and grind to a coarse consistency (similar to breadcrumbs). Coarse grind prevents over-extraction and excessive sediment.'
      },
      {
        title: 'Add Coffee & Water',
        description: 'Add ground coffee to the press. Pour 500ml of water at 200°F (93°C), ensuring all grounds are saturated. Start your timer immediately.'
      },
      {
        title: 'Stir & Cover',
        description: 'After 30 seconds, gently stir the crust that forms on top to ensure even extraction. Place the lid on with the plunger pulled all the way up.'
      },
      {
        title: 'Steep',
        description: 'Let the coffee steep for 4 minutes total. This is when the magic happens—the water extracts flavors, oils, and caffeine from the grounds.'
      },
      {
        title: 'Press & Pour',
        description: 'Slowly press the plunger down with steady, even pressure. Pour immediately into cups to prevent over-extraction and bitterness.'
      }
    ],
    tips: [
      'Always use coarse grind—fine grind creates bitter, over-extracted coffee',
      'Don\'t press too hard; gentle, steady pressure is best',
      'Pour all the coffee out immediately to prevent over-steeping',
      'Clean your French Press thoroughly after each use',
      'For stronger coffee, use more grounds rather than steeping longer'
    ],
    troubleshooting: [
      { problem: 'Too much sediment', solution: 'Use a coarser grind and avoid stirring too vigorously.' },
      { problem: 'Plunger hard to press', solution: 'Grind is too fine. Use a coarser setting.' },
      { problem: 'Weak coffee', solution: 'Increase coffee-to-water ratio or ensure water is hot enough.' }
    ]
  },
  'espresso': {
    title: 'Espresso Brewing Guide',
    icon: Thermometer,
    gradient: 'from-[#8B6F47] to-[var(--espresso)]',
    time: '25-30 seconds',
    difficulty: 'Advanced',
    description: 'Espresso is concentrated coffee brewed by forcing hot water through finely-ground coffee under high pressure. It requires precision and practice but rewards you with rich, complex shots.',
    equipment: [
      'Espresso machine with pump',
      'Burr grinder with fine settings',
      'Portafilter and basket',
      'Tamper',
      'Scale (highly recommended)',
      'Shot glass or demitasse cup',
      'Cleaning supplies'
    ],
    steps: [
      {
        title: 'Warm Up Machine',
        description: 'Turn on your espresso machine and let it heat up for 15-20 minutes. Run a blank shot through the group head to flush and preheat the portafilter.'
      },
      {
        title: 'Dose Coffee',
        description: 'Grind 18-20g of fresh coffee beans to a fine consistency (similar to table salt). Dose directly into a clean, dry portafilter basket.'
      },
      {
        title: 'Distribute & Level',
        description: 'Distribute the grounds evenly in the basket. Use your finger or a distribution tool to ensure there are no gaps or uneven spots.'
      },
      {
        title: 'Tamp Evenly',
        description: 'Apply 30 pounds of pressure with your tamper, keeping it level. The coffee bed should be flat and evenly compressed. Wipe any grounds from the rim.'
      },
      {
        title: 'Lock & Extract',
        description: 'Lock the portafilter into the group head. Start extraction immediately. The first drops should appear within 5-7 seconds.'
      },
      {
        title: 'Time Your Shot',
        description: 'Extract for 25-30 seconds to yield 1.5-2oz (40-60ml) of espresso. The flow should resemble warm honey. Stop when the color turns blonde.'
      }
    ],
    tips: [
      'Fresh beans are critical—espresso is unforgiving with stale coffee',
      'Dial in your grind: too fine = bitter/slow, too coarse = sour/fast',
      'Consistency is key: same dose, same tamp, same timing',
      'Watch the extraction: it should flow smooth and steady, not too fast or slow',
      'Clean your machine daily and backflush weekly',
      'The "golden rule": 1:2 ratio (18g in, 36g out in 25-30 seconds)'
    ],
    troubleshooting: [
      { problem: 'Shot too fast (under 20 sec)', solution: 'Grind finer or increase dose slightly.' },
      { problem: 'Shot too slow (over 35 sec)', solution: 'Grind coarser or decrease dose slightly.' },
      { problem: 'Bitter/burnt taste', solution: 'Water too hot, over-extracted, or grind too fine. Check temperature and grind.' },
      { problem: 'Sour taste', solution: 'Under-extracted. Grind finer or increase brew temperature.' },
      { problem: 'Channeling (uneven extraction)', solution: 'Improve distribution and ensure level tamp.' }
    ]
  }
};

export function BrewingMethodModal({ isOpen, onClose, method }: BrewingMethodModalProps) {
  if (!method || !isOpen) return null;

  const content = brewingMethodContent[method];
  const IconComponent = content.icon;

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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--white)] rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${content.gradient} p-8 text-white relative`}>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-white mb-2">{content.title}</h2>
                      <div className="flex gap-4 text-sm text-white/90">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{content.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Difficulty: {content.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-base leading-relaxed">
                    {content.description}
                  </p>
                </div>

                {/* Content */}
                <div className="p-8 max-h-[600px] overflow-y-auto">
                  {/* Equipment Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[var(--espresso)] mb-4">Equipment Needed</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {content.equipment.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-[var(--caramel)] flex-shrink-0 mt-0.5" />
                          <span className="text-[var(--muted-foreground)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[var(--espresso)] mb-4">Step-by-Step Instructions</h3>
                    <div className="space-y-4">
                      {content.steps.map((step, index) => (
                        <Card key={index} className="border-l-4 border-[var(--caramel)]">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-[var(--caramel)] text-white flex items-center justify-center font-bold text-sm">
                                  {index + 1}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-[var(--espresso)] mb-2">{step.title}</h4>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tips */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[var(--espresso)] mb-4">Pro Tips</h3>
                    <Card className="bg-[var(--cream)]">
                      <CardContent className="p-6">
                        <ul className="space-y-3">
                          {content.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-[var(--caramel)] font-bold">•</span>
                              <span className="text-[var(--muted-foreground)]">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Troubleshooting */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[var(--espresso)] mb-4">Troubleshooting</h3>
                    <div className="space-y-3">
                      {content.troubleshooting.map((item, index) => (
                        <div key={index} className="p-4 bg-[var(--muted)] rounded-lg">
                          <p className="font-semibold text-[var(--espresso)] text-sm mb-1">
                            ⚠️ {item.problem}
                          </p>
                          <p className="text-sm text-[var(--muted-foreground)]">
                            <strong>Solution:</strong> {item.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="flex justify-end">
                    <Button variant="primary" onClick={onClose}>
                      Got It!
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
