"use client";
import { useState } from "react";

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
