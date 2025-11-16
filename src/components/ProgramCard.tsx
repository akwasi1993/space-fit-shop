import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgramCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  duration: string;
  level: string;
  category?: string;
  viewCount?: number;
}

export const ProgramCard = ({
  slug,
  title,
  shortDescription,
  coverImageUrl,
  duration,
  level,
  category,
  viewCount,
}: ProgramCardProps) => {
  return (
    <Link to={`/programs/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex gap-2 mb-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {level}
            </Badge>
            {category && (
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {shortDescription}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          {viewCount !== undefined && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{viewCount} views</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
