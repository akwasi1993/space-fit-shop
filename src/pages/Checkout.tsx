import { useState, useRef } from "react";
import { CreditCard, Lock, CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import { MockPayPalButton } from "@/components/MockPayPalButton";
import { useUpdateStock } from "@/hooks/use-products";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderComplete, setOrderComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [orderId, setOrderId] = useState("");
  const updateStock = useUpdateStock();
  
  // Form refs for collecting shipping info
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const subtotal = totalPrice;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const getShippingInfo = () => ({
    firstName: firstNameRef.current?.value || "",
    lastName: lastNameRef.current?.value || "",
    email: emailRef.current?.value || "",
    address: addressRef.current?.value || "",
    city: cityRef.current?.value || "",
    state: stateRef.current?.value || "",
    zip: zipRef.current?.value || "",
    phone: phoneRef.current?.value || "",
  });

  const saveOrderToDatabase = async (txId: string) => {
    const shipping = getShippingInfo();
    
    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,
        status: "pending",
        total_amount: Math.round(total * 100), // Store in cents
        customer_email: shipping.email,
        customer_name: `${shipping.firstName} ${shipping.lastName}`,
        shipping_address: {
          street: shipping.address,
          city: shipping.city,
          state: shipping.state,
          zip: shipping.zip,
          phone: shipping.phone,
        },
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      price_at_purchase: Math.round(item.price * 100), // Store in cents
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order.id;
  };

  const decreaseStockForItems = async () => {
    const updates = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
    }));
    await updateStock.mutateAsync(updates);
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mockTransactionId = `CARD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Save order to database
      const newOrderId = await saveOrderToDatabase(mockTransactionId);
      
      // Decrease stock
      await decreaseStockForItems();
      
      setTransactionId(mockTransactionId);
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to process order. Please try again.");
    }
  };

  const handlePayPalSuccess = async (txId: string) => {
    try {
      // Save order to database
      const newOrderId = await saveOrderToDatabase(txId);
      
      // Decrease stock
      await decreaseStockForItems();
      
      setTransactionId(txId);
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      toast.success("PayPal payment successful!");
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to process order. Please try again.");
    }
  };

  // Order Confirmation Screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your order has been placed successfully.
            </p>

            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-mono font-semibold text-sm">{orderId}</p>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
              <p className="font-mono font-semibold text-sm">{transactionId}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                <Package className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold">Order Processing</p>
                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                <Truck className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={() => navigate("/shop")} size="lg" className="w-full">
                Continue Shopping
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" size="lg" className="w-full">
                Return to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto p-8 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before checking out.
            </p>
            <Button onClick={() => navigate("/shop")} size="lg">
              Browse Products
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input ref={firstNameRef} id="firstName" placeholder="John" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input ref={lastNameRef} id="lastName" placeholder="Doe" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input ref={emailRef} id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input ref={addressRef} id="address" placeholder="123 Main St" required />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input ref={cityRef} id="city" placeholder="New York" required />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input ref={stateRef} id="state" placeholder="NY" required />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input ref={zipRef} id="zip" placeholder="10001" required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input ref={phoneRef} id="phone" type="tel" placeholder="(555) 123-4567" required />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6 space-y-3">
                <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-5 w-5" />
                    Credit / Debit Card
                  </Label>
                </div>
                <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#003087]" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19a.774.774 0 0 0-.765.645l-.007.045-.699 4.432-.035.223a.643.643 0 0 1-.633.661z"/>
                    </svg>
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" maxLength={5} required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4">
                    Pay ${total.toFixed(2)}
                  </Button>
                </form>
              )}

              {paymentMethod === "paypal" && (
                <div className="py-4">
                  <MockPayPalButton
                    amount={total}
                    onSuccess={handlePayPalSuccess}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>✓ Free shipping on all orders</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 1-year warranty included</p>
                <p>✓ Secure payment processing</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
