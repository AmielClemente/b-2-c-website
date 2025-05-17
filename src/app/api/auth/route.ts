import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a mock database - replace with actual database in production
const users: { [key: string]: any } = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === 'register') {
      if (users[email]) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }

      // In production, hash the password before storing
      users[email] = {
        id: Date.now().toString(),
        email,
        password,
        name,
        isAdmin: false,
      };

      return NextResponse.json({
        id: users[email].id,
        email: users[email].email,
        name: users[email].name,
        isAdmin: users[email].isAdmin,
      });
    }

    if (action === 'login') {
      const user = users[email];
      if (!user || user.password !== password) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 