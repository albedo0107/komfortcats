import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJBwtXX9T2E0cR_VnXrHqVfeE';

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // Google Places API - Place Details request
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&language=cs`,
      {
        next: { revalidate: 3600 } // Cache na 1 hodinu
      }
    );

    const data = await response.json();

    if (data.status === 'OK') {
      return NextResponse.json({
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        reviews: data.result.reviews || []
      });
    } else {
      return NextResponse.json({ error: data.status }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

