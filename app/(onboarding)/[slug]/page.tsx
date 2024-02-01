'use client'

import { UrlType } from "@/types/utils/url_type";
import { redirect } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

const DynamicSlugPage = ({ params }: { params: { slug: string } }) => {
  const urls = useReadLocalStorage<UrlType[]>('urls')
  const url = urls?.find(url => url.shorten_url === params.slug)
  if (url) {
    redirect(url.original_url as string)
  }
}

export default DynamicSlugPage;
