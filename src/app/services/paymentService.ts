/**
 * Payment Service - Handles Stripe integration logic
 * 
 * This demonstrates a realistic Stripe checkout flow in demo mode.
 * In production, this would make real API calls to your backend.
 */

export interface OrderData {
  orderId: string;
  status: 'PENDING_PAYMENT' | 'PAID' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
  amount: number;
  currency: string;
  customerEmail: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
  paymentIntentId?: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  metadata: {
    orderId: string;
    userEmail: string;
  };
}

// Demo mode flag - in production, this would be an environment variable
const DEMO_MODE = true;

/**
 * Step 1: Create a pending order in the backend
 * This returns an order ID before payment processing begins
 */
export async function createPendingOrder(orderData: {
  customerEmail: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  amount: number;
}): Promise<OrderData> {
  // In production: POST /api/orders/create
  // Backend creates order record with status PENDING_PAYMENT
  
  if (DEMO_MODE) {
    // Simulate API delay
    await simulateDelay(800);
    
    const orderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const order: OrderData = {
      orderId,
      status: 'PENDING_PAYMENT',
      amount: orderData.amount,
      currency: 'usd',
      customerEmail: orderData.customerEmail,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Store in localStorage for demo persistence
    localStorage.setItem(`order_${orderId}`, JSON.stringify(order));
    
    console.log('✅ Order created:', order);
    return order;
  }
  
  // Production code:
  // const response = await fetch('/api/orders/create', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orderData)
  // });
  // return response.json();
  
  throw new Error('Production mode not implemented');
}

/**
 * Step 2: Create Stripe PaymentIntent
 * Backend creates a PaymentIntent and returns client_secret
 */
export async function createPaymentIntent(orderId: string): Promise<PaymentIntent> {
  // In production: POST /api/payments/create-intent
  // Backend calls Stripe API to create PaymentIntent
  
  if (DEMO_MODE) {
    // Simulate API delay
    await simulateDelay(1000);
    
    // Retrieve order from storage
    const orderJson = localStorage.getItem(`order_${orderId}`);
    if (!orderJson) {
      throw new Error('Order not found');
    }
    
    const order: OrderData = JSON.parse(orderJson);
    
    const paymentIntentId = 'pi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const clientSecret = 'pi_' + Date.now() + '_secret_' + Math.random().toString(36).substr(2, 16);
    
    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      clientSecret,
      amount: Math.round(order.amount * 100), // Convert to cents
      currency: order.currency,
      status: 'requires_payment_method',
      metadata: {
        orderId: order.orderId,
        userEmail: order.customerEmail,
      },
    };
    
    // Update order with payment intent ID
    order.paymentIntentId = paymentIntentId;
    localStorage.setItem(`order_${orderId}`, JSON.stringify(order));
    
    console.log('💳 PaymentIntent created:', paymentIntent);
    return paymentIntent;
  }
  
  // Production code:
  // const response = await fetch('/api/payments/create-intent', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ orderId })
  // });
  // return response.json();
  
  throw new Error('Production mode not implemented');
}

/**
 * Step 3: Confirm payment with Stripe Elements
 * In production, this uses Stripe.js to confirm the payment
 */
export async function confirmPayment(
  clientSecret: string,
  paymentMethod: {
    cardholderName: string;
    // In production, Stripe Elements would handle the actual card data
  }
): Promise<{ success: boolean; error?: string; paymentIntentId?: string }> {
  // In production: stripe.confirmCardPayment(clientSecret, { payment_method: {...} })
  
  if (DEMO_MODE) {
    // Simulate payment processing
    await simulateDelay(2000);
    
    // Demo: 95% success rate (can fail for testing)
    const shouldSucceed = Math.random() > 0.05;
    
    if (shouldSucceed) {
      // Extract payment intent ID from client secret
      const paymentIntentId = clientSecret.split('_secret_')[0];
      
      console.log('✅ Payment confirmed successfully:', paymentIntentId);
      
      // Simulate webhook by updating order status
      await simulateWebhookUpdate(paymentIntentId, 'succeeded');
      
      return {
        success: true,
        paymentIntentId,
      };
    } else {
      console.log('❌ Payment failed - card declined');
      return {
        success: false,
        error: 'Your card was declined. Please try a different payment method.',
      };
    }
  }
  
  // Production code:
  // const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  // const result = await stripe.confirmCardPayment(clientSecret, {
  //   payment_method: {
  //     card: cardElement,
  //     billing_details: {
  //       name: paymentMethod.cardholderName,
  //     }
  //   }
  // });
  // 
  // if (result.error) {
  //   return { success: false, error: result.error.message };
  // }
  // return { success: true, paymentIntentId: result.paymentIntent.id };
  
  throw new Error('Production mode not implemented');
}

/**
 * Step 4: Webhook simulation
 * In production, Stripe sends webhooks to your backend
 * Backend updates order status based on payment_intent.succeeded or payment_intent.payment_failed
 */
async function simulateWebhookUpdate(
  paymentIntentId: string,
  eventType: 'succeeded' | 'failed'
): Promise<void> {
  if (DEMO_MODE) {
    // Simulate webhook delay
    await simulateDelay(500);
    
    // Find order by payment intent ID
    const orders = Object.keys(localStorage)
      .filter(key => key.startsWith('order_'))
      .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
      .filter((order: OrderData) => order.paymentIntentId === paymentIntentId);
    
    if (orders.length > 0) {
      const order: OrderData = orders[0];
      
      if (eventType === 'succeeded') {
        order.status = 'PAID';
        order.updatedAt = new Date().toISOString();
        
        // In production, backend would also send confirmation email
        console.log('📧 Webhook: payment_intent.succeeded - Order marked as PAID');
        
        // Additional processing (e.g., inventory update, fulfillment)
        setTimeout(() => {
          order.status = 'CONFIRMED';
          order.updatedAt = new Date().toISOString();
          localStorage.setItem(`order_${order.orderId}`, JSON.stringify(order));
          console.log('📦 Order confirmed and ready for fulfillment');
        }, 1000);
      } else {
        order.status = 'FAILED';
        order.updatedAt = new Date().toISOString();
        console.log('❌ Webhook: payment_intent.payment_failed - Order marked as FAILED');
      }
      
      localStorage.setItem(`order_${order.orderId}`, JSON.stringify(order));
    }
  }
  
  // Production: This happens on your backend
  // app.post('/webhooks/stripe', async (req, res) => {
  //   const sig = req.headers['stripe-signature'];
  //   const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  //   
  //   if (event.type === 'payment_intent.succeeded') {
  //     const paymentIntent = event.data.object;
  //     await updateOrderStatus(paymentIntent.metadata.orderId, 'PAID');
  //   } else if (event.type === 'payment_intent.payment_failed') {
  //     const paymentIntent = event.data.object;
  //     await updateOrderStatus(paymentIntent.metadata.orderId, 'FAILED');
  //   }
  //   
  //   res.json({ received: true });
  // });
}

/**
 * Step 5: Fetch order summary for success page
 */
export async function getOrderSummary(orderId: string): Promise<OrderData | null> {
  if (DEMO_MODE) {
    await simulateDelay(300);
    
    const orderJson = localStorage.getItem(`order_${orderId}`);
    if (!orderJson) {
      return null;
    }
    
    return JSON.parse(orderJson);
  }
  
  // Production code:
  // const response = await fetch(`/api/orders/${orderId}`);
  // return response.json();
  
  throw new Error('Production mode not implemented');
}

/**
 * Cart management with localStorage persistence
 */
export interface CartItem {
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

export function saveCart(items: CartItem[]): void {
  localStorage.setItem('homebrewz_cart', JSON.stringify(items));
  console.log('💾 Cart saved to localStorage:', items.length, 'items');
}

export function loadCart(): CartItem[] {
  const cartJson = localStorage.getItem('homebrewz_cart');
  if (!cartJson) {
    return [];
  }
  
  try {
    const items = JSON.parse(cartJson);
    console.log('📥 Cart loaded from localStorage:', items.length, 'items');
    return items;
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
}

export function clearCart(): void {
  localStorage.removeItem('homebrewz_cart');
  console.log('🗑️ Cart cleared');
}

/**
 * Demo mode configuration
 */
export function isDemoMode(): boolean {
  return DEMO_MODE;
}

export function getDemoModeInfo(): {
  enabled: boolean;
  testCardNumber: string;
  description: string;
} {
  return {
    enabled: DEMO_MODE,
    testCardNumber: '4242 4242 4242 4242',
    description: 'Demo mode enabled - No real charges will occur. All payments are simulated.',
  };
}

/**
 * Utility function to simulate API delays
 */
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Production implementation notes:
 * 
 * Backend (Node.js/Express example):
 * 
 * 1. Install Stripe SDK: npm install stripe
 * 
 * 2. Initialize Stripe:
 *    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
 * 
 * 3. Create PaymentIntent endpoint:
 *    app.post('/api/payments/create-intent', async (req, res) => {
 *      const { orderId } = req.body;
 *      const order = await db.orders.findById(orderId);
 *      
 *      const paymentIntent = await stripe.paymentIntents.create({
 *        amount: Math.round(order.amount * 100),
 *        currency: 'usd',
 *        metadata: { orderId: order.id, userEmail: order.customerEmail }
 *      });
 *      
 *      await db.orders.update(orderId, { 
 *        paymentIntentId: paymentIntent.id 
 *      });
 *      
 *      res.json({ 
 *        clientSecret: paymentIntent.client_secret 
 *      });
 *    });
 * 
 * 4. Handle webhooks:
 *    app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
 *      const sig = req.headers['stripe-signature'];
 *      let event;
 *      
 *      try {
 *        event = stripe.webhooks.constructEvent(
 *          req.body, 
 *          sig, 
 *          process.env.STRIPE_WEBHOOK_SECRET
 *        );
 *      } catch (err) {
 *        return res.status(400).send(`Webhook Error: ${err.message}`);
 *      }
 *      
 *      switch (event.type) {
 *        case 'payment_intent.succeeded':
 *          const paymentIntent = event.data.object;
 *          await db.orders.update(
 *            { paymentIntentId: paymentIntent.id },
 *            { status: 'PAID' }
 *          );
 *          // Send confirmation email
 *          await sendOrderConfirmationEmail(paymentIntent.metadata.orderId);
 *          break;
 *        case 'payment_intent.payment_failed':
 *          const failedIntent = event.data.object;
 *          await db.orders.update(
 *            { paymentIntentId: failedIntent.id },
 *            { status: 'FAILED' }
 *          );
 *          break;
 *      }
 *      
 *      res.json({ received: true });
 *    });
 * 
 * Frontend (React with Stripe Elements):
 * 
 * 1. Install Stripe libraries:
 *    npm install @stripe/stripe-js @stripe/react-stripe-js
 * 
 * 2. Setup Stripe provider:
 *    import { Elements } from '@stripe/react-stripe-js';
 *    import { loadStripe } from '@stripe/stripe-js';
 *    
 *    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
 *    
 *    <Elements stripe={stripePromise}>
 *      <CheckoutForm />
 *    </Elements>
 * 
 * 3. Use CardElement and confirm payment:
 *    import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
 *    
 *    const stripe = useStripe();
 *    const elements = useElements();
 *    
 *    const handleSubmit = async (e) => {
 *      e.preventDefault();
 *      
 *      const { error, paymentIntent } = await stripe.confirmCardPayment(
 *        clientSecret,
 *        {
 *          payment_method: {
 *            card: elements.getElement(CardElement),
 *            billing_details: { name: cardholderName }
 *          }
 *        }
 *      );
 *      
 *      if (error) {
 *        setError(error.message);
 *      } else if (paymentIntent.status === 'succeeded') {
 *        // Redirect to success page
 *      }
 *    };
 */
