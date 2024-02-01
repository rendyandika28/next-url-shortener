/* eslint-disable react-hooks/rules-of-hooks */
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import useToaster from "./useToaster";

type AxiosReqConfig = AxiosRequestConfig<any> | undefined;

type FetchOptsType = AxiosReqConfig & {
  excludeInterceptor?: number[];
  keepOriginalResp?: boolean;
  isMutation?: boolean;
  watch?: string[] | boolean;
  args?: unknown;
};

const fetcher = async (
  url: string,
  opts?: FetchOptsType,
  data?: any
): Promise<any> => {
  try {
    if (data) {
      opts!.data = data;
    }

    const options: AxiosReqConfig = {
      ...opts,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    const response = await axios(url, options);

    if (!opts?.keepOriginalResp) {
      return response.data;
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export function useFetch(url: string, opts?: FetchOptsType) {
  const toaster = useToaster();

  const defaults = {
    onError(error: AxiosError) {
      const excludedInterceptor = (statusCode: number): boolean => {
        if (!opts?.excludeInterceptor) return false;
        return opts?.excludeInterceptor.includes(statusCode);
      };

      if (!excludedInterceptor(error?.response?.status as number)) {
        if (error?.status === 401) {
          if (typeof window !== "undefined") window.location.reload();
        }
      }

      toaster.show(error?.response?.data?.message as string, { type: "error" });
    },
    revalidateOnFocus: false,
  };

  if (typeof opts?.watch === "undefined") opts!.watch = true;

  let key = [url];
  if (typeof opts?.watch === "object") {
    key.push(...opts?.watch);
  } else if (!!opts?.watch) {
    key.push(opts?.params);
  }

  if (opts?.isMutation) {
    return useSWRMutation(
      url,
      (url, { arg: data }) => fetcher(url, opts, data),
      defaults
    );
  }

  return useSWR(key, ([urlKey]) => fetcher(urlKey, opts), defaults);
}

export default useFetch;
