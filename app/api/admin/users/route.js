import { NextResponse } from 'next/server';
import { checkPermission, getAllAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Only master admins can fetch the user list
    const session = await checkPermission('admin');
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const users = await getAllAdminUsers();
    
    // Return users list. If users === null, it means the database table admin_users is missing in Supabase
    if (users === null) {
      return NextResponse.json({ error: 'DB table admin_users not found', code: 'TABLE_NOT_FOUND' }, { status: 404 });
    }
    
    // Hide password_hash and salt from client response for security
    const sanitizedUsers = users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      permissions: u.permissions,
      created_at: u.created_at
    }));
    
    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('API GET /api/admin/users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await checkPermission('admin');
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const body = await request.json();
    const { username, password, role, permissions } = body;
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Missing phone number or password parameters' }, { status: 400 });
    }
    
    const success = await createAdminUser(username, password, role, permissions);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to create user account. This Phone Number might already be registered.' }, { status: 400 });
  } catch (error) {
    console.error('API POST /api/admin/users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await checkPermission('admin');
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const body = await request.json();
    const { id, updates } = body;
    
    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing user id or updates parameters' }, { status: 400 });
    }
    
    const success = await updateAdminUser(id, updates);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 400 });
  } catch (error) {
    console.error('API PATCH /api/admin/users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await checkPermission('admin');
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing user id parameter' }, { status: 400 });
    }
    
    // Check that admin is not deleting themselves
    if (session.id === id) {
      return NextResponse.json({ error: 'Cannot delete your own active administrator account' }, { status: 400 });
    }
    
    const success = await deleteAdminUser(id);
    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 400 });
  } catch (error) {
    console.error('API DELETE /api/admin/users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
