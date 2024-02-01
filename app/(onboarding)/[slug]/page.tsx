'use client'

import Loader from "@/components/loader";
import useUrlShortener from "@/hooks/useUrlShortener";
import { redirect } from "next/navigation";

const DynamicSlugPage = ({ params }: { params: { slug: string } }) => {
  const { getUrl } = useUrlShortener()
  const { data, error } = getUrl(params.slug as string)

  if (error) throw new Error

  if (data) {
    redirect(data.data.original_url)
  } else {
    return <Loader />
  }
}

export default DynamicSlugPage;
