import AppButton from "@/components/app/button";
import AppInput from "@/components/app/input";
import ShortenerFormSchema from "@/formschemas/application/shortener_formschemas";
import { useCopyToClipboard } from "usehooks-ts";
import useToaster from "@/hooks/useToaster";
import { useYupValidationResolver } from "@/hooks/yup";
import { UrlType } from "@/types/utils/url_type";
import { FormProvider, useForm } from "react-hook-form";
import useUrlShortener from "@/hooks/useUrlShortener";

interface TypeFormShortener {
  onSubmit: (data: { url: string }) => void
  url: UrlType | null
  setUrl: (url: UrlType | null) => void
}

const FormShortener = ({ onSubmit: onSubmitParent, url, setUrl }: TypeFormShortener) => {
  const resolver = useYupValidationResolver(ShortenerFormSchema)
  const methods = useForm({ resolver });
  const onSubmit = (data: { url: string }) => onSubmitParent(data);
  const { copyUrl, copiedText } = useUrlShortener()

  const clearForm = () => {
    methods.reset()
    setUrl(null)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {!url ? (
          <AppInput label="Your URL" name="url" type="url" autoComplete="off" />
        ) : (
          <>
            <div className="join w-full mb-4">
              <input className="input input-bordered join-item flex-1" readOnly value={url.shorten} />
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

            <h6 className="text-gray-300 mb-4 font-medium text-sm text-left">Full URL: <a href={url.original} target="_blank" rel="noopener noreferrer" className="underline font-bold">{url.original}</a></h6>
          </>
        )}

        <div className="flex justify-center gap-2 flex-col w-full md:w-1/2 m-auto">
          {!url && <AppButton loading={methods.formState.isSubmitting} text="Generate URL" color="btn-primary" type="submit" />}
          <AppButton type="button" text="See history URL" className="text-gray-400" color="btn-ghost" />
        </div>
      </form>
    </FormProvider>
  );
}

export default FormShortener;
