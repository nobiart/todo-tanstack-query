import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef } from "react";

export const useTodoList = () => {
  const {
    data: todoItems,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfinityQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage().then();
  });

  const cursor = (
    <div className="flex gap-3 mt-5" ref={cursorRef}>
      {!hasNextPage && <div>No Data for Fetching</div>}
      {isFetchingNextPage && <div>...Loading</div>}
    </div>
  );

  return { error, todoItems, isLoading, cursor };
};

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect],
  );
};
