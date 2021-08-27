import { useMemo } from "react";

export const useSortedData = (data, sort) => {
  const sortedData = useMemo(() => {
    if (Array.isArray(data) && sort && sort !== "default") {
      return [...data].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return data;
  }, [sort, data]);

  return sortedData;
};
