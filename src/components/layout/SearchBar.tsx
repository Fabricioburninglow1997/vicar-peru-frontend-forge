
import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Buscar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-md border border-gray-300 w-full"
      />
      <Search
        size={18}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
