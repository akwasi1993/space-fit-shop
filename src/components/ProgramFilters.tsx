import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ProgramFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  level: string;
  onLevelChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export const ProgramFilters = ({
  searchTerm,
  onSearchChange,
  level,
  onLevelChange,
  category,
  onCategoryChange,
}: ProgramFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={level} onValueChange={onLevelChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Fitness">Fitness</SelectItem>
          <SelectItem value="Mindset">Mindset</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Nutrition">Nutrition</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
