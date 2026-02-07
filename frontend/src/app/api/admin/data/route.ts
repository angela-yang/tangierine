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
    
    console.log('=== ADMIN API DEBUG ===');
    console.log('userId:', userId);
    
    // Test 1: Can we query users table at all?
    const { data: allUsers, error: allUsersError } = await supabaseAdmin
      .from('users')
      .select('id, email, is_admin');
    
    console.log('All users query:', { count: allUsers?.length, error: allUsersError });
    console.log('All users data:', allUsers);
    
    // Test 2: Can we find this specific user?
    const { data: specificUser, error: specificError } = await supabaseAdmin
      .from('users')
      .select('id, email, is_admin')
      .eq('id', userId)
      .maybeSingle();
    
    console.log('Specific user query:', { user: specificUser, error: specificError });
    
    // Return debug info
    return NextResponse.json({ 
      allUsersCount: allUsers?.length,
      allUsers: allUsers,
      specificUser,
      requestedUserId: userId,
      errors: {
        allUsersError,
        specificError
      }
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
  }
}