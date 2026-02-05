import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FLOWERS_FILE = path.join(process.cwd(), 'data', 'flowers.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(FLOWERS_FILE)) {
    fs.writeFileSync(FLOWERS_FILE, JSON.stringify([]));
  }
};

// GET - Get all flowers
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(FLOWERS_FILE, 'utf-8');
    const flowers = JSON.parse(data);
    return NextResponse.json(flowers);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Add new flower
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const newFlower = await request.json();
    
    const data = fs.readFileSync(FLOWERS_FILE, 'utf-8');
    let flowers = JSON.parse(data);
    
    // Add new flower and keep only latest 20
    flowers = [newFlower, ...flowers].slice(0, 20);
    
    fs.writeFileSync(FLOWERS_FILE, JSON.stringify(flowers, null, 2));
    
    return NextResponse.json(newFlower, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save flower' }, { status: 500 });
  }
}

// DELETE - Remove a flower
export async function DELETE(request: Request) {
  try {
    ensureDataDir();
    const { id } = await request.json();
    
    const data = fs.readFileSync(FLOWERS_FILE, 'utf-8');
    let flowers = JSON.parse(data);
    
    flowers = flowers.filter((f: any) => f.id !== id);
    
    fs.writeFileSync(FLOWERS_FILE, JSON.stringify(flowers, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete flower' }, { status: 500 });
  }
}