import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Prevent stale route cache during debug

export async function GET() {
  const apiKey =
    process.env.OGD_API_KEY ||
    '579b464db66ec23bdd00000199e0de55c65749d7406b48e5c0f75e0b';
  const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';

  // Note: Agmarknet sometimes expects "state" or "state.keyword"
  const targetUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=100&filters%5Bstate%5D=Odisha`;

  try {
    const response = await fetch(targetUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store', // Use 'no-store' during dev/test, or next: { revalidate: 1800 } in prod
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Upstream API failed [${response.status}]:`, errorText);
      throw new Error(`Agmarknet OGD API returned status ${response.status}`);
    }

    const data = await response.json();

    // Check if Agmarknet returned an internal error inside a 200 payload
    if (data.status === 'error' || data.error) {
      throw new Error(data.message || data.error || 'Upstream API error');
    } 

    const records = data.records || [];

    const liveRecords = records.map((item: any) => ({
      date: item.arrival_date || new Date().toLocaleDateString('en-GB'),
      district: item.district || 'N/A',
      market: item.market || 'N/A',
      commodity: item.commodity || 'N/A',
      minPrice: Number(item.min_price) || 0,
      maxPrice: Number(item.max_price) || 0,
      marketPrice: Number(item.modal_price) || 0,
    }));

    return NextResponse.json({
      status: 'success',
      count: liveRecords.length,
      timestamp: new Date().toISOString(),
      records: liveRecords,
    });
  } catch (error: any) {
    console.error('Error in /api/apmc route:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Failed to fetch live market rates',
      },
      { status: 500 }
    );
  }
}
