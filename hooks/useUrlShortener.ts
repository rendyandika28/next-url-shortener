/* eslint-disable react-hooks/rules-of-hooks */
import API_ENDPOINTS from "@/constant/api_endpoint";
import useFetch from "./useFetch";
import { UrlType } from "@/types/utils/url_type";
import { SWRResponse } from "swr";
import { SWRMutationResponse } from "swr/mutation";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";

const useUrlShortener = () => {
  const [urlStore, setUrlStore] = useLocalStorage<UrlType[]>("urls", []);
  const [copiedText, copy] = useCopyToClipboard();

  const isUrlHasSaved = (localUrl: string | undefined): UrlType | undefined => {
    return urlStore.find((u: UrlType) => u.original_url === localUrl);
  };

  const deleteUrl = (localUrl: UrlType) => {
    setUrlStore((prev) => [
      ...prev.filter((url) => url.original_url !== localUrl.original_url),
    ]);
  };

  const overwriteUrl = (localUrl: UrlType) => {
    setUrlStore((prev) => [
      ...prev.map((url) => {
        if (localUrl.original_url === url.original_url) {
          url = localUrl;
        }
        return {
          ...url,
        };
      }),
    ]);
  };

  const saveUrl = () => {
    return useFetch(API_ENDPOINTS.URL.SHORTEN, {
      isMutation: true,
      method: "POST",
    }) as SWRMutationResponse;
  };

  const copyUrl = (u: UrlType) => {
    copy(u?.full_url as string);
    setTimeout(() => {
      copy("");
    }, 3000);
  };

  const getUrl = (payload?: Record<string, unknown>) => {
    return useFetch(API_ENDPOINTS.URL.SHORTEN, {
      params: payload,
    }) as SWRResponse;
  };

  return {
    urlStore,
    copiedText,
    setUrlStore,
    saveUrl,
    copyUrl,
    getUrl,
    isUrlHasSaved,
    deleteUrl,
    overwriteUrl,
  };
};

export default useUrlShortener;
