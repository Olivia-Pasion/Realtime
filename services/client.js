const SUPABASE_URL = 'https://cnrsrtvizmqdfctzqiuj.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucnNydHZpem1xZGZjdHpxaXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc3Mzk0MzcsImV4cCI6MTk3MzMxNTQzN30.TEFrXmeGnx8Uv3DHrPn8z--pUYTVlJy4ECvAMl0mCGI';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function checkResponse(response) {
    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
        return null;
    }
    return response.data;
}
