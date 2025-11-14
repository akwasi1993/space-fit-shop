import { useState } from "react";
import { CreditCard, Building2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Forms Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" required />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                  <div className="flex items-center space-x-2 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-smooth">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-smooth">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 className="h-5 w-5" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4">
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
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You will be redirected to PayPal to complete your payment
                    </p>
                    <Button variant="outline" size="lg">
                      Continue with PayPal
                    </Button>
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
                
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary rounded-lg"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Adjustable Dumbbell Set</p>
                      <p className="text-sm text-muted-foreground">Qty: 1</p>
                      <p className="font-semibold text-sm">$299</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$299.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-primary">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">$23.92</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">$322.92</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mb-3">
                  Place Order
                </Button>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>✓ Free shipping on all orders</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ 1-year warranty included</p>
                  <p>✓ Secure payment processing</p>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
