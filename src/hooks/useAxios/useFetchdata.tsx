import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./axios";

export const fetchManagers = async (status?: string) => {
  const token = Cookies.get("token");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/staff/all-managers`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: status && status !== "all" ? { status } : undefined,
    }
  );

  return response.data;
};





interface QueryHandlerType {
  url: string;
  pathname: string; 
  param?: object;
}

export const useQueryHandler = ({ url, pathname, param }: QueryHandlerType) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [pathname, param], 
    queryFn: () => axios({ url, param }),
  });
};
