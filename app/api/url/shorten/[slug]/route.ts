import { supabase } from "@/lib/initSupabase";
import { generateResponseError } from "@/lib/web";
import getConfig from "next/config";
import { NextResponse } from "next/server";

const { publicRuntimeConfig } = getConfig();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const {
      data: link,
      error,
      status,
      statusText,
    } = await supabase
      .from("link_shorteners")
      .select("original_url, shorten_url")
      .eq("shorten_url", params.slug)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        code: status,
        data: link,
        message: statusText,
      },
      {
        status,
        statusText,
      }
    );
  } catch (error: any) {
    return generateResponseError(error);
  }
}
