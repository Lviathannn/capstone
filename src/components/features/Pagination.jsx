import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ currentPage, lastPage }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchParams] = useSearchParams();

  return (
    <div className="mt-2 flex items-center justify-center gap-14">
      <Button
        size="icon"
        variant="outline"
        className="shadow-xs group rounded-xl border-none"
        disabled={currentPage === 1}
        onClick={() => setSearchParams({ page: currentPage - 1 })}
      >
        <ChevronLeft
          size={16}
          className="text-neutral-600 group-hover:text-white"
        />
      </Button>
      <p className="text-sm font-bold text-neutral-600">
        Page {currentPage} of {lastPage}
      </p>
      <Button
        size="icon"
        variant="outline"
        disabled={currentPage === lastPage}
        className="shadow-xs group rounded-xl border-none"
        onClick={() => setSearchParams({ page: currentPage + 1 })}
      >
        <ChevronRight
          size={16}
          className="text-neutral-600 group-hover:text-white"
        />
      </Button>
    </div>
  );
}
