"use client"

import useToaster from "@/hooks/useToaster";
import useUrlShortener from "@/hooks/useUrlShortener";
import { UrlType } from "@/types/utils/url_type";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import FormShortener from "./_component/form/shortener";

export default function Home() {
  const toaster = useToaster()
  const [url, setUrl] = useState<UrlType | null>(null);
  const [, setUrlStore] = useLocalStorage<UrlType[]>("urls", []);
  const { saveUrl, isUrlHasSaved } = useUrlShortener()
  const { trigger } = saveUrl()

  const onSubmit = async (data: UrlType) => {
    try {
      const response = await trigger(data as any)
      if (response) {
        const urlResult = response.data as UrlType
        setUrl(urlResult)

        if (!isUrlHasSaved(urlResult.original_url)) {
          setUrlStore((prevVal: UrlType[]) => ([...prevVal, urlResult]))
        } else {
          setUrlStore((prevVal: UrlType[]) => prevVal.map(prev => prev.original_url === urlResult.original_url ? urlResult : prev))
        }
        toaster.show('Success create shorten url!')
      }
    } catch (error: any) {
      // Handle custom error
    }
  }

  return (
    <section className="onboarding__content">
      <h1 className="title">Simplest way to share URL!</h1>
      <h6 className="description">Elevate your online presence with our cutting-edge URL Shortener, <br /> transforming lengthy links into sleek and impactful one-liners.</h6>

      <div className="form">
        <FormShortener onSubmit={onSubmit} url={url} setUrl={setUrl} />
      </div>
    </section >
  );
}
