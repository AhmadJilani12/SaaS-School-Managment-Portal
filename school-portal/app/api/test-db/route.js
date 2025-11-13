import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Add your database connection test logic here
    return NextResponse.json({ status: 'Connected to database successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}