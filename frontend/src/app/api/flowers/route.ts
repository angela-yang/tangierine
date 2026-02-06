import { NextResponse } from 'next/server';
import { supabaseServer as supabase } from '../../lib/supabaseServer';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('flowers')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error getting flowers:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const flower = await request.json();

    const { id, ...flowerWithoutId } = flower;

    const { data, error } = await supabase
      .from('flowers')
      .insert([flowerWithoutId])
      .select()
      .single();

    if (error) throw error;

    // Delete old flowers beyond 30
    const { data: allFlowers } = await supabase
      .from('flowers')
      .select('id, timestamp')
      .order('timestamp', { ascending: false });

    if (allFlowers && allFlowers.length > 30) {
      const idsToDelete = allFlowers.slice(30).map(f => f.id);
      await supabase
        .from('flowers')
        .delete()
        .in('id', idsToDelete);
    }

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error) {
    console.error('Error adding flower:', error);
    return NextResponse.json({ error: 'Failed to save flower' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { error } = await supabase
      .from('flowers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting flower:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}