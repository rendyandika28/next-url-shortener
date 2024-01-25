'use client'

import useToaster from "@/hooks/useToaster";
import useUrlShortener from "@/hooks/useUrlShortener";
import FormShortener from "./_component/form/shortener";

export default function Home() {
  const toaster = useToaster()

  const { url, setUrl, saveUrl } = useUrlShortener()

  const onSubmit = async (data: { url: string }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/3')
      const result = await response.json()
      saveUrl({
        original: data.url,
        shorten: result.title
      })
      toaster.show('Success create shorten url!')
    } catch (error: unknown) {
      toaster.show(error?.message, { type: 'error' })
    }
  };

  return (
    <section className="onboarding__content">
      <h1 className="title">Simplest way to share URL!</h1>
      <h6 className="description">Elevate your online presence with our cutting-edge URL Shortener, <br /> transforming lengthy links into sleek and impactful one-liners.</h6>

      <div className="form">
        <FormShortener onSubmit={onSubmit} url={url} setUrl={setUrl} />
      </div>
    </section>
  );
}
