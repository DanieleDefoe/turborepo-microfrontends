import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

import type { IResponse } from "../types/response.type";

interface ISystemConfig {
  description?: string;
  key: string;
  value: string; // JSON string
}

const mockData: ISystemConfig[] = [
  {
    description:
      "Appearance configuration for the application, including theme color, border radius, and content layout.",
    key: "appearance_config",
    value: JSON.stringify({ font: "inter", theme: "dark" }),
  },
];

function generateReturnData(
  data: ISystemConfig,
  success = true
): IResponse<ISystemConfig> {
  return {
    code: 200,
    data,
    extra: {},
    message: "success",
    success,
  };
}

export function useGetSystemConfigByKeyQuery(key: string) {
  return useQuery<IResponse<ISystemConfig>, Error>({
    queryFn: async () => {
      const response = await new Promise<ISystemConfig | undefined>(
        (resolve, reject) => {
          setTimeout(() => {
            const config = mockData.find((item) => item.key === key);
            if (!config) {
              reject(new Error("Config not found"));
            }
            resolve(config);
          }, 1000);
        }
      );
      if (!response) {
        throw new Error("Config not found");
      }
      return generateReturnData(response);
    },
    queryKey: ["useGetSystemConfigByKeyQuery", key],
  });
}

export function useUpdateSystemConfigByKeyMutation(key: string) {
  const queryClient = useQueryClient();

  return useMutation<IResponse<ISystemConfig>, Error, ISystemConfig>({
    mutationFn: async (data: ISystemConfig) =>
      await new Promise<IResponse<ISystemConfig>>((resolve) => {
        setTimeout(() => {
          resolve(generateReturnData(data));
        }, 100);
      }),
    mutationKey: ["useUpdateSystemConfigByKeyMutation", key],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetSystemConfigByKeyQuery", key],
      });
    },
  });
}

export function useCreateSystemMutation() {
  const queryClient = useQueryClient();

  return useMutation<IResponse<ISystemConfig>, Error, ISystemConfig>({
    mutationFn: async (data: ISystemConfig) =>
      new Promise<IResponse<ISystemConfig>>((resolve) => {
        setTimeout(() => {
          resolve(generateReturnData(data));
        }, 100);
      }),
    mutationKey: ["useCreateTaskMutation"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["useGetSystemConfigByKeyQuery"],
      });
    },
  });
}
