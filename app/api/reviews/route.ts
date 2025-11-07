import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJBwtXX9T2E0cR_VnXrHqVfeE';

  console.log('API Route called - Has API key:', !!apiKey, 'Place ID:', placeId);

  if (!apiKey) {
    console.error('GOOGLE_PLACE_API_KEY is not configured');
    return NextResponse.json({ 
      error: 'API key not configured',
      hasApiKey: false 
    }, { status: 500 });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&language=cs`;
    console.log('Fetching from Google Places API...');
    
    // Google Places API - Place Details request
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache na 1 hodinu
    });

    const data = await response.json();
    console.log('Google API Response status:', data.status);
    console.log('Total reviews from API:', data.result?.user_ratings_total);
    console.log('Reviews returned:', data.result?.reviews?.length || 0);

    if (data.status === 'OK') {
      return NextResponse.json({
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total,
        reviews: data.result.reviews || []
      });
    } else {
      console.error('Google API Error:', data.status, data.error_message);
      return NextResponse.json({ 
        error: data.status,
        message: data.error_message 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch reviews',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

