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

    // Convert base64 to blob
    const base64Data = flower.imageData.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Upload to storage
    const fileName = `${flower.id}.png`;
    const { error: uploadError } = await supabase.storage
      .from('flower-images')
      .upload(fileName, blob, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('flower-images')
      .getPublicUrl(fileName);

    // Save to database with image URL instead of base64
    const flowerData = {
      id: flower.id,
      image_url: publicUrl,
      x: flower.x,
      y: flower.y,
      scale: flower.scale,
      rotation: flower.rotation,
      timestamp: flower.timestamp
    };

    const { data, error } = await supabase
      .from("flowers")
      .insert([flowerData])
      .select();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Clean up old flowers (keep only 20)
    const { data: allFlowers } = await supabase
      .from('flowers')
      .select('id, timestamp, image_url')
      .order('timestamp', { ascending: false });

    if (allFlowers && allFlowers.length > 20) {
      const flowersToDelete = allFlowers.slice(20);
      
      // Delete images from storage
      const filesToDelete = flowersToDelete.map(f => {
        const fileName = f.image_url.split('/').pop();
        return fileName;
      }).filter(Boolean);
      
      if (filesToDelete.length > 0) {
        await supabase.storage
          .from('flower-images')
          .remove(filesToDelete as string[]);
      }

      // Delete from database
      const idsToDelete = flowersToDelete.map(f => f.id);
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

    // Get flower to find image URL
    const { data: flower } = await supabase
      .from('flowers')
      .select('image_url')
      .eq('id', id)
      .single();

    if (flower?.image_url) {
      const fileName = flower.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('flower-images')
          .remove([fileName]);
      }
    }

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