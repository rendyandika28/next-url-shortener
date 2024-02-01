import AppButton from "@/components/app/button";
import AppInput from "@/components/app/input";
import AppModal from "@/components/app/modal";
import ShortenerFormSchema from "@/formschemas/application/shortener_formschemas";
import useUrlShortener from "@/hooks/useUrlShortener";
import { useYupValidationResolver } from "@/hooks/yup";
import { UrlType } from "@/types/utils/url_type";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";

interface TypeFormShortener {
  onSubmit: (data: UrlType) => void
  setUrl: Dispatch<SetStateAction<UrlType | null>>
  url: UrlType | null
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const FormShortener = ({ onSubmit: onSubmitParent, url, setUrl }: TypeFormShortener) => {
  const resolver = useYupValidationResolver(ShortenerFormSchema)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const { copyUrl, copiedText, isUrlHasSaved, urlStore } = useUrlShortener()
  const methods = useForm({ resolver: resolver as Resolver<any, any> });

  const onSubmit = (data: UrlType) => {
    if (isUrlHasSaved(data.original_url) && typeof document.getElementById('submit-dialog')?.getAttribute('open') === 'object') {
      return (document.getElementById('submit-dialog') as HTMLDialogElement | null)?.showModal()
    }
    closeRef.current?.click()
    return onSubmitParent(data)
  };

  const clearForm = () => {
    methods.reset()
    setUrl(null)
  }

  const openHistoryUrl = () => {
    return (document.getElementById('submit-dialog') as HTMLDialogElement | null)?.showModal()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!url?.shorten_url ? (
          <div className="mb-4">
            <AppInput label="Your full URL" name="original_url" type="url" />
            <div className="flex w-full gap-2 flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex gap-4">
                <div className="flex-1">
                  <AppInput disabled label="Domain" name="domain" value={baseUrl} />
                </div>
                <span className="text-white text-xl self-center mt-3 flex md:hidden pr-4">/</span>
              </div>
              <span className="text-white text-xl self-center mt-3 hidden md:flex">/</span>
              <div className="w-full md:w-2/3">
                <AppInput label="Custom URL (Optional)" name="shorten_url" tooltip="Type an unique shorten word for your link" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="join w-full mb-4">
              <input className="input input-bordered join-item flex-1" readOnly value={url.full_url} />
              <AppButton text="Clear Url" className="join-item text-xs gap-1 text-red-500 bg-white" onClick={clearForm} icon={
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              }>
              </AppButton>
              <AppButton text={!!copiedText ? "Copied" : "Copy URL"} className="join-item text-xs gap-1 font-bold" onClick={() => copyUrl(url)} icon={
                !!copiedText ? (
                  <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 12 4.7 4.5 9.3-9" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3c0 .6-.4 1-1 1H5m11 4h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-7a1 1 0 0 0-1 1v1m4 3v10c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1v-7.1c0-.3 0-.5.2-.7l2.5-2.9c.2-.2.5-.3.8-.3H13c.6 0 1 .4 1 1Z" />
                  </svg>
                )
              }>
              </AppButton>
            </div>

            <h6 className="text-gray-300 mb-4 font-medium text-sm text-left">Full URL: <a href={url.original_url} target="_blank" rel="noopener noreferrer" className="underline font-bold">{url.original_url}</a></h6>
          </>
        )}

        <div className="flex justify-center gap-2 flex-col w-full md:w-1/2 m-auto">
          {!url && <AppButton loading={methods.formState.isSubmitting} text="Generate URL" color="btn-primary" type="submit" />}
          <AppButton onClick={openHistoryUrl} type="button" text="See history URL" className="text-gray-400" color="btn-ghost" />
        </div>
      </form>

      <AppModal id="link-history">
        <h1 className="font-bold text-lg text-left mb-4">Your history url:</h1>
        <ul className="menu bg-base-200 w-full rounded-box gap-2">
          {urlStore.map(url => (
            <div key={url.original_url} className="text-left bg-white rounded-lg p-2">
              <Link href={url.original_url}>Original Url: {url.original_url}</Link> <br />
              <Link href={url.original_url}>Shorten Url: {url.full_url}</Link>
            </div>
          ))}
        </ul>
      </AppModal>


      <AppModal id="submit-dialog">
        <div className="flex flex-col">
          <div className="content mb-4">
            <h5 className="text-xl font-bold">You already have <br /> the shorten url for this url, overwrite it?</h5>
            <Image className="my-5 m-auto" src={'/warning.svg'} width={250} height={250} alt="warning" />

            {/* <span className="block text-sm text-gray-5 font-medium">URL: <a href={data?.original_url} target="_blank">{data?.original_url}</a></span>
            <span className="block text-sm text-gray-5 font-medium">Existing shorten URL: <a href={data?.full_url} target="_blank">{data?.full_url}</a></span> */}
          </div>
          <div className="flex gap-4 justify-center">
            <form method="dialog" className="flex gap-4">
              <button onClick={methods.handleSubmit(onSubmit)} className="btn btn-neutral">Overwrite</button>
              <button ref={closeRef} className="btn btn-outline btn-error">Close</button>
            </form>
          </div>
        </div>
      </AppModal>

    </FormProvider>
  );
}

export default FormShortener;
