import { axiosInstance, handleTryCatch } from "./apiCaller";

export type ImprovementDataType = {
  _id: string;
  title: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
};
export const getAllImprovements = async () => {
  return handleTryCatch<ImprovementDataType[]>(
    axiosInstance.get("/api/improvements")
  );
};
export const createImprovement = async (
  body: Omit<ImprovementDataType, "_id" | "updatedAt" | "createdAt">
) => {
  return handleTryCatch<ImprovementDataType>(
    axiosInstance.post("/api/improvements", body)
  );
};
export const updateImprovement = async (
  body: Omit<ImprovementDataType, "_id" | "updatedAt" | "createdAt"> & {
    id: string;
  }
) => {
  return handleTryCatch<ImprovementDataType>(
    axiosInstance.put("/api/improvements", body)
  );
};
export const deleteImprovement = async (id: string) => {
  const response = await handleTryCatch<ImprovementDataType>(
    axiosInstance.delete("/api/improvements?id=" + id)
  );
  return {
    ...response,
    data: {
      ...(response?.data ?? {}),
      _id: id,
    },
  };
};
