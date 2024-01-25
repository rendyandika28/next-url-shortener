import { UrlType } from "@/types/utils/url_type";
import { useState } from "react";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";

const useUrlShortener = () => {
  const [url, setUrl] = useState<UrlType | null>(null);
  const [urlStore, setUrlStore] = useLocalStorage<UrlType[]>("urls", []);
  const [copiedText, copy] = useCopyToClipboard();

  const isUrlHasSaved = (localUrl: string): boolean => {
    return !!urlStore.find((u: UrlType) => u.original === localUrl);
  };

  const saveUrl = (u: UrlType) => {
    if (!isUrlHasSaved(u.original)) {
      setUrlStore((prev: UrlType[]) => [...prev, u]);
    }
    setUrl(u);
  };

  const copyUrl = (u: UrlType) => {
    copy(u?.shorten as string);
    setTimeout(() => {
      copy("");
    }, 3000);
  };

  return {
    url,
    urlStore,
    copiedText,
    setUrl,
    setUrlStore,
    saveUrl,
    copyUrl,
  };
};

export default useUrlShortener;
