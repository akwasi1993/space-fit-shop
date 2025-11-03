import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import productDumbbells from "@/assets/product-dumbbells.jpg";

const Cart = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={productDumbbells}
                    alt="Adjustable Dumbbell Set"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">
                        Adjustable Dumbbell Set
                      </h3>
                      <p className="text-sm text-muted-foreground">Strength</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">1</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-lg">$299</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$299.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-primary">FREE</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-primary">$299.00</span>
                </div>
              </div>
              <Button size="lg" className="w-full gap-2 mb-3">
                <CreditCard className="h-5 w-5" />
                Checkout
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Continue Shopping
              </Button>
              <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                <p>✓ Free shipping on all orders</p>
                <p>✓ 30-day return policy</p>
                <p>✓ 1-year warranty included</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
