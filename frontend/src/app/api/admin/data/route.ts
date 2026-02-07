import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'No userId provided' }, { status: 401 });
    }
    
    // Verify user is admin
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('is_admin')
      .eq('id', userId)
      .maybeSingle();
      
    if (userError || !user || !user.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    // Fetch all orders with user info
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        users!orders_user_id_fkey (
          username,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    console.log('Orders fetched:', orders?.length, ordersError);
      
    // Fetch all commissions with user info - specify which foreign key to use
    const { data: commissions, error: commissionsError } = await supabaseAdmin
      .from('commissions')
      .select(`
        *,
        users!commissions_user_id_fkey (
          username,
          email
        )
      `)
      .order('created_at', { ascending: false });
    
    console.log('Commissions fetched:', commissions?.length, commissionsError);
      
    return NextResponse.json({ 
      orders: orders || [], 
      commissions: commissions || [] 
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}