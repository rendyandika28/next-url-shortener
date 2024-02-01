import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { generateErrorData } from "./helper";

export const generateResponseError = (
  error: PostgrestError
): NextResponse<{
  code: string | number;
  message: string;
  errors?: string[] | undefined;
}> => {
  const { code, message, errors } = generateErrorData(error);

  return NextResponse.json(
    {
      code,
      message,
      errors,
    },
    {
      status: code as any,
    }
  );
};
