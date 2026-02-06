import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    return NextResponse.json({ 
      error: 'Missing env vars',
      hasUrl: !!url,
      hasKey: !!key 
    });
  }
  
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('flowers').select('count');
    
    return NextResponse.json({ 
      success: !error,
      error: error?.message,
      data 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}