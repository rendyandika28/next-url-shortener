import { object, string } from "yup";

const ShortenerFormSchema = object({
  original_url: string().required().url().label("Original URL"),
  shorten_url: string()
    .matches(
      /^[a-zA-Z0-9_-]*$/,
      "Only letters, numbers, hyphens (-), and underscores (_) allowed."
    )
    .label("Shorten URL"),
}).required();

export default ShortenerFormSchema;
