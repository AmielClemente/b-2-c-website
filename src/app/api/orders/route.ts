import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface Order {
  id: string;
  userId: string;
  paymentIntentId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

// In-memory storage for orders (replace with database in production)
const orders: Order[] = [];

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { paymentIntentId, amount, contactDetails, items } = await request.json();

    if (!paymentIntentId || !amount || !contactDetails || !items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      paymentIntentId,
      amount,
      status: 'completed',
      contactDetails,
      items,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);
    console.log('Created order:', order); // Debug log

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userOrders = orders.filter(order => order.userId === userId);
    console.log('Found orders for user:', userId, userOrders); // Debug log

    return NextResponse.json(userOrders);
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 