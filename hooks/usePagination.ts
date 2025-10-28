import { useState, useMemo, useCallback } from "react";

export type PaginationDataType = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type UsePaginationProps = {
  initialPage?: number;
  pageSize?: number;
};

export function usePagination({ initialPage = 1, pageSize = 10 }: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const pagination: PaginationDataType = useMemo(() => {
    return {
      currentPage,
      totalItems,
      totalPages,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1,
    };
  }, [currentPage, totalItems, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(() => {
        if (page < 1) return 1;
        if (page > totalPages) return totalPages;
        return page;
      });
    },
    [totalPages]
  );

  const handlePageSizeChange = useCallback((size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // reset to first page when size changes
  }, []);

  /**
   * Update pagination parameters from API response
   */
  const setPaginationFromApi = useCallback(
    (apiPagination: Partial<PaginationDataType>) => {
      if (apiPagination.currentPage !== undefined) {
        setCurrentPage(apiPagination.currentPage);
      }
      if (apiPagination.totalItems !== undefined) {
        setTotalItems(apiPagination.totalItems);
      }
      if (apiPagination.totalPages !== undefined) {
        // totalPages is derived from totalItems normally, 
        // but if API gives it, you can trust API value
        // and override totalItems accordingly.
        const newTotalPages = apiPagination.totalPages;
        if (newTotalPages > 0) {
          setTotalItems(newTotalPages * itemsPerPage);
        }
      }
    },
    [itemsPerPage]
  );

  return {
    ...pagination,
    itemsPerPage,
    handlePageChange,
    handlePageSizeChange,
    setPaginationFromApi, // << expose setter from API
  };
}
