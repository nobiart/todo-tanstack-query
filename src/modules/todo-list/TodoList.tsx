import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef, useState } from "react";

export const TodoList = () => {
  const [enabled, setEnabled] = useState(false);

  const {
    data,
    error,
    isLoading,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tasks", "list"],
    queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
    enabled: enabled,
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="my-10 px-5 mx-auto max-w-[1200]">
      <h1 className="text-3xl font-bold mb-5">To Do List</h1>
      <button onClick={() => setEnabled((e) => !e)}>Toggle Enabled</button>
      <div
        className={
          "flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")
        }
      >
        {data?.map((todo) => (
          <div key={todo.id} className="p-3 border border-slate-500 rounded-md">
            {todo.text}
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-5" ref={cursorRef}>
        {!hasNextPage && <div>No Data for Fetching</div>}
        {isFetchingNextPage && <div>...Loading</div>}
      </div>
    </div>
  );
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
