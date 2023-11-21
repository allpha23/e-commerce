import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type PaginationType = {
  limit: number,
  total: number,
  offset: number,
  setOffset: Function,
};

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export default function Pagination({
  limit, total, offset, setOffset,
}: PaginationType) {
  const currentPage = offset ? (offset / limit) + 1 : 1;
  const pages = Math.ceil(total / limit);
  const firstButton = Math.max(currentPage - MAX_LEFT, 1);

  function onPageChange(page: number) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="flex pt-7">
      <li className="border-2 rounded-md border-zinc-300 overflow-hidden">
        <button
          className="h-6 w-6 flex justify-center items-center hover:bg-zinc-300 md:h-9 md:w-9"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) }).map((_, index) => {
        const page = index + firstButton;
        if (page <= pages) {
          return (
            <li key={page} className="ml-3 border-2 rounded-md border-zinc-300 overflow-hidden">
              <button
                className={page === currentPage ? 'bg-zinc-950 h-6 w-6 text-zinc-50 md:h-9 md:w-9' : 'h-6 w-6 hover:bg-zinc-300 md:h-9 md:w-9'}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        }
        return null;
      })}
      <li className="ml-3 border-2 rounded-md border-zinc-300 overflow-hidden">
        <button
          className="h-6 w-6 flex justify-center items-center hover:bg-zinc-300 md:h-9 md:w-9"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages}
        >
          <FaArrowRight />
        </button>
      </li>
    </ul>
  );
}
