import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  portable?: boolean;
  quiet?: boolean;
}

const ProductCard = ({ id, name, price, image, category, portable, quiet }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, price, image, category });
  };
  
  return (
    <Card 
      className="group overflow-hidden border-border hover:shadow-elevated transition-smooth cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-smooth"
        />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-card/80 backdrop-blur hover:bg-card"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          {portable && <Badge variant="secondary" className="text-xs">Portable</Badge>}
          {quiet && <Badge variant="secondary" className="text-xs">Quiet</Badge>}
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category}</p>
        <h3 className="font-semibold text-base mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${price}</span>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
