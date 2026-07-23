import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import { apiFetch } from "@/lib/api-client";

import type { IResponse } from "../types/response.type";

export interface ITask {
  description: string;
  status: "pending" | "in-progress" | "completed";
  title: string;
}

export function useGetTasksQuery() {
  return useQuery<IResponse<ITask[]>, Error>({
    queryFn: async () =>
      await apiFetch<IResponse<ITask[]>>("/tasks", {
        method: "get",
      }),
    queryKey: ["useGetTasksQuery"],
  });
}

export function useGetTaskByIdQuery(id: number) {
  return useQuery<IResponse<ITask>, Error>({
    queryFn: async () =>
      await apiFetch<IResponse<ITask>>(`/tasks/${id}`, {
        method: "get",
      }),
    queryKey: ["useGetTaskQuery", id],
  });
}

export function useUpdateTaskMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation<IResponse<boolean>, Error, Partial<ITask>>({
    mutationFn: async (data: Partial<ITask>) =>
      await apiFetch<IResponse<boolean>>(`/tasks/${id}`, {
        body: data,
        method: "put",
      }),
    mutationKey: ["useUpdateTaskMutation", id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTaskQuery", id] });
      queryClient.invalidateQueries({ queryKey: ["useGetTasksQuery"] });
    },
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation<IResponse<ITask>, Error, ITask>({
    mutationFn: async (data: ITask) =>
      await apiFetch<IResponse<ITask>>("/tasks", {
        body: data,
        method: "post",
      }),
    mutationKey: ["useCreateTaskMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTasksQuery"] });
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation<IResponse<boolean>, Error, number>({
    mutationFn: async (id: number) =>
      await apiFetch<IResponse<boolean>>(`/tasks/${id}`, {
        method: "delete",
      }),
    mutationKey: ["useDeleteTaskMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetTasksQuery"] });
    },
  });
}
