import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("flowers")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(20);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const flower = await req.json();

    console.log('Inserting flower:', { ...flower, imageData: '[truncated]' });

    const { data, error } = await supabase
      .from("flowers")
      .insert([flower])
      .select();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Clean up old flowers (keep only 20)
    const { data: allFlowers } = await supabase
      .from('flowers')
      .select('id, timestamp')
      .order('timestamp', { ascending: false });

    if (allFlowers && allFlowers.length > 20) {
      const idsToDelete = allFlowers.slice(20).map(f => f.id);
      await supabase.from('flowers').delete().in('id', idsToDelete);
    }

    return NextResponse.json(data?.[0] || { success: true });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = getSupabase();
    const { id } = await req.json();

    const { error } = await supabase
      .from("flowers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}