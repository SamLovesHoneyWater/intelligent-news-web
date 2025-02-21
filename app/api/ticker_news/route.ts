import { NextResponse } from 'next/server';

type NewsItem = {
  title: string;
  description: string;
  image_url: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json(
      { error: "Symbol parameter is required" },
      { status: 400 }
    );
  }

  const response = await fetch(`${process.env.NEXT_API_URL}/api/get_news?ticker=${symbol}`);
  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
  const newsData = await response.json();
  if (!newsData[symbol]) {
    return NextResponse.json(newsData);
  }
}
