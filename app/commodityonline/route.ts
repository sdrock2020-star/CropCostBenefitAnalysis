import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

// Fallback dataset if the scraper encounters network blocks or structure changes
const FALLBACK_COMMODITY_ONLINE = [
  { commodity: 'Potato', date: '01/09/2026', district: 'Sonepur', market: 'Biramaharajpur', minPrice: 1700, maxPrice: 1800, marketPrice: 1750, source: 'Commodity Online' },
  { commodity: 'Bhindi(Ladies Finger)', date: '01/09/2026', district: 'Mayurbhanja', market: 'Saraskana', minPrice: 4000, maxPrice: 4500, marketPrice: 4200, source: 'Commodity Online' },
  { commodity: 'Brinjal', date: '01/09/2026', district: 'Sonepur', market: 'Biramaharajpur', minPrice: 2600, maxPrice: 2700, marketPrice: 2650, source: 'Commodity Online' },
  { commodity: 'Tomato', date: '01/09/2026', district: 'Bargarh', market: 'Sohela', minPrice: 2300, maxPrice: 2700, marketPrice: 2500, source: 'Commodity Online' },
  { commodity: 'Paddy(Common)', date: '01/09/2026', district: 'Mayurbhanja', market: 'Karanjia', minPrice: 2369, maxPrice: 2369, marketPrice: 2369, source: 'Commodity Online' },
  { commodity: 'Onion', date: '01/09/2026', district: 'Angul', market: 'Angul', minPrice: 3500, maxPrice: 3500, marketPrice: 3500, source: 'Commodity Online' },
  { commodity: 'Brinjal', date: '01/09/2026', district: 'Cuttack', market: 'Banki', minPrice: 5000, maxPrice: 6000, marketPrice: 5500, source: 'Commodity Online' },
  { commodity: 'Rice', date: '01/09/2026', district: 'Mayurbhanja', market: 'Karanjia', minPrice: 3600, maxPrice: 3700, marketPrice: 3700, source: 'Commodity Online' },
  { commodity: 'Cowpea(Veg)', date: '01/09/2026', district: 'Cuttack', market: 'Banki', minPrice: 3500, maxPrice: 4500, marketPrice: 4000, source: 'Commodity Online' },
];

export async function GET() {
  try {
    const url = 'https://www.commodityonline.com/mandiprices/state/odisha';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`CommodityOnline responded with status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const records: any[] = [];

    const cleanNum = (str: string) => {
      const match = str.replace(/[^0-9.]/g, '');
      return match ? Number(match) : 0;
    };

    // Scrape matching table rows
    $('table tbody tr').each((_, row) => {
      const cols = $(row).find('td');
      if (cols.length >= 7) {
        const commodity = $(cols[0]).text().trim();
        const arrivalDate = $(cols[1]).text().trim();
        // Column mapping handles tables with or without state column
        const district = cols.length >= 8 ? $(cols[4]).text().trim() : $(cols[3]).text().trim();
        const market = cols.length >= 8 ? $(cols[5]).text().trim() : $(cols[4]).text().trim();
        const minPrice = cleanNum(cols.length >= 8 ? $(cols[6]).text() : $(cols[5]).text());
        const maxPrice = cleanNum(cols.length >= 8 ? $(cols[7]).text() : $(cols[6]).text());
        const avgPrice = cleanNum(cols.length >= 8 ? $(cols[8]).text() : $(cols[7]).text());

        if (commodity && (minPrice > 0 || maxPrice > 0 || avgPrice > 0)) {
          records.push({
            commodity,
            date: arrivalDate || new Date().toLocaleDateString('en-GB'),
            district: district || 'Odisha',
            market: market || 'APMC',
            minPrice,
            maxPrice,
            marketPrice: avgPrice || maxPrice || minPrice,
          });
        }
      }
    });

    // If DOM selector returned items, serve them; otherwise fallback
    const finalRecords = records.length > 0 ? records : FALLBACK_COMMODITY_ONLINE;

    return NextResponse.json({
      status: 'success',
      source: records.length > 0 ? 'live' : 'fallback',
      count: finalRecords.length,
      records: finalRecords,
    });
  } catch (error: any) {
    console.warn('Scraping error, serving fallback dataset:', error.message);
    return NextResponse.json({
      status: 'fallback',
      source: 'fallback',
      count: FALLBACK_COMMODITY_ONLINE.length,
      records: FALLBACK_COMMODITY_ONLINE,
    });
  }
}