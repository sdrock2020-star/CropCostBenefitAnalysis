import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Extend Vercel function timeout limit

const FALLBACK_RECORDS = [
  { date: '27/08/2026', district: 'Dhenkanal', market: 'Hindol APMC', commodity: 'Potato', minPrice: 1300, maxPrice: 1500, marketPrice: 1400 },
  { date: '27/08/2026', district: 'Dhenkanal', market: 'Hindol APMC', commodity: 'Brinjal', minPrice: 5000, maxPrice: 5500, marketPrice: 5200 },
  { date: '27/08/2026', district: 'Bargarh', market: 'Bargarh APMC', commodity: 'Paddy(Dhan)', minPrice: 2183, maxPrice: 2203, marketPrice: 2200 },
  { date: '27/08/2026', district: 'Kalahandi', market: 'Bhawanipatna APMC', commodity: 'Cotton', minPrice: 6800, maxPrice: 7100, marketPrice: 7000 },
  { date: '27/08/2026', district: 'Sambalpur', market: 'Sambalpur APMC', commodity: 'Tomato', minPrice: 2000, maxPrice: 2400, marketPrice: 2200 },
  { date: '27/08/2026', district: 'Bolangir', market: 'Kantabanji APMC', commodity: 'Maize', minPrice: 1950, maxPrice: 2100, marketPrice: 2050 },
  { date: '27/08/2026', district: 'Cuttack', market: 'Banki APMC', commodity: 'Green Chilli', minPrice: 3500, maxPrice: 4200, marketPrice: 4000 },
];

export async function GET() {
  const apiKey =
    process.env.OGD_API_KEY ||
    '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
  const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
  
  // Using state.keyword filter parameter for data.gov.in Agmarknet API
  const targetUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=100&filters%5Bstate.keyword%5D=Odisha`;

  try {
    const response = await fetch(targetUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(12000), // 12-second abort signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Upstream API failed [${response.status}]:`, errorText);
      throw new Error(`Agmarknet OGD API returned status ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error' || data.error) {
      throw new Error(data.message || data.error || 'Upstream API error');
    }

    const rawRecords = data.records || [];

    if (rawRecords.length === 0) {
      throw new Error('API returned 0 records for Odisha filter');
    }

    const liveRecords = rawRecords.map((item: any) => ({
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
      source: 'live',
      count: liveRecords.length,
      timestamp: new Date().toISOString(),
      records: liveRecords,
    });
  } catch (error: any) {
    console.warn('Using fallback APMC dataset:', error.message);
    return NextResponse.json({
      status: 'fallback',
      source: 'cached_records',
      count: FALLBACK_RECORDS.length,
      timestamp: new Date().toISOString(),
      records: FALLBACK_RECORDS,
    });
  }
}
