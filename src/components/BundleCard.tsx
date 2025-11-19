import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface BundleItem {
  id: string;
  name: string;
  price: number;
}

interface BundleCardProps {
  id: string;
  name: string;
  description: string;
  targetCustomer: string;
  items: BundleItem[];
  totalPrice: number;
  savings: number;
}

const BundleCard = ({ id, name, description, targetCustomer, items, totalPrice, savings }: BundleCardProps) => {
  const { addItem } = useCart();

  const handleAddBundle = () => {
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "",
        category: "Bundle"
      });
    });
    toast.success(`${name} added to cart!`);
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-elevated transition-smooth border-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="secondary" className="shrink-0">Save ${savings}</Badge>
        </div>
        <CardDescription className="text-sm">
          <span className="font-semibold text-primary">Perfect for:</span> {targetCustomer}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Includes:</p>
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-4 border-t border-border">
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">${totalPrice}</p>
            <p className="text-xs text-muted-foreground line-through">
              ${items.reduce((sum, item) => sum + item.price, 0)}
            </p>
          </div>
          <Button onClick={handleAddBundle} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add Bundle
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BundleCard;
