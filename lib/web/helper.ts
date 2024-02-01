import { PostgrestError } from "@supabase/supabase-js";
import { ValidationError } from "yup";

export const constructKeyValueResp = (
  details: string
): { key: string; value: string } => {
  // Define a regular expression pattern to match the key and value
  const regex = /Key \((\w+)\)=\((\w+)\)/;
  // Use the exec method of the regular expression to match the pattern in the input string
  const match = regex.exec(details);
  if (match) {
    return {
      key: match[1],
      value: match[2],
    };
  } else {
    throw new Error("Failed construct key value");
  }
};

type ErrorDataType = {
  message: string;
  code: string | number;
  errors?: any[];
};

export const generateErrorData = (error: PostgrestError): ErrorDataType => {
  let response = {
    code: error.code,
    message: error.message,
  };

  // validation error
  if (error instanceof ValidationError) {
    return {
      code: 422,
      message: "Validation error",
      errors: error.errors,
    };
  }

  // row not found
  if (error.code === "PGRST116") {
    return {
      code: 404,
      message: "Data not found",
    };
  }

  // duplicate values
  if (error.code === "23505") {
    const { key, value } = constructKeyValueResp(error.details);
    let message = `'${value}' is already exist for ${key}`;
    return {
      code: 409,
      message,
    };
  }

  return response;
};

export const parseRequestBody = async (req: Request): Promise<any> => {
  try {
    const contentType = req.headers.get("Content-Type") as string;

    if (contentType && contentType.includes("application/json")) {
      return await req.json();
    } else if (
      (contentType &&
        contentType.includes("application/x-www-form-urlencoded")) ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await req.formData();
      let form: Record<string, string | File> = {};

      const entriesArray = Array.from(formData.entries());

      for (const [key, value] of entriesArray) {
        form[key] = value instanceof File ? value : value.toString();
      }

      return form;
    } else {
      throw new Error("Unsupported content type");
    }
  } catch (error) {
    // Handle errors here or let them propagate
    throw error;
  }
};
