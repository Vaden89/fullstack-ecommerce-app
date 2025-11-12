"use client";
import { useState } from "react";

// NOTE: the pageIndex is zero based because tanstack table makes use of zero based data

export const usePagination = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const { pageSize, pageIndex } = pagination;

  return {
    pagination,
    setPagination,
    limit: pageSize,
    page: pageIndex + 1,
  };
};
