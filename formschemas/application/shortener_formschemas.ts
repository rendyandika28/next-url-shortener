import { object, string } from "yup";

const ShortenerFormSchema = object({
  url: string().required().url().label("URL"),
}).required();

export default ShortenerFormSchema;
