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
    // Nové Places API (New)
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    console.log('Fetching from Google Places API (New)...');

    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
        'Accept-Language': 'cs'
      },
      next: { revalidate: 3600 } // Cache na 1 hodinu
    });

    const data = await response.json();
    console.log('Google API Response:', JSON.stringify(data).slice(0, 500));

    if (data.error) {
      console.error('Google API Error:', data.error);
      return NextResponse.json({
        error: data.error.status,
        message: data.error.message
      }, { status: 400 });
    }

    // Transformace dat z nového formátu na starý formát pro kompatibilitu s frontendem
    const reviews = (data.reviews || []).map((review: any) => ({
      author_name: review.authorAttribution?.displayName || 'Anonym',
      profile_photo_url: review.authorAttribution?.photoUri || null,
      rating: review.rating || 5,
      text: review.text?.text || review.originalText?.text || '',
      relative_time_description: review.relativePublishTimeDescription || ''
    }));

    return NextResponse.json({
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      reviews: reviews
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({
      error: 'Failed to fetch reviews',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
