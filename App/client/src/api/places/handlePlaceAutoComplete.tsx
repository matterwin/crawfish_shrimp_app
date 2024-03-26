import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_AUTOCOMPLETE_API} from "@env";

const baseURL = GOOGLE_PLACES_AUTOCOMPLETE_API;

export const completedResults = async (city: string) => {
  const queryParams = new URLSearchParams({
    input: city,
    types: '(cities)',
    components: 'country:us',
    language: 'en',
    key: GOOGLE_PLACES_API_KEY, 
  });

  const url = `${baseURL}?${queryParams.toString()}`;

  try {
     const res = await fetch(url, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     });

    const data = await res.json();
    return { status: res.status, data };

  } catch (err) {
    console.log("Error in completedResults api function call: " + err);
    return { status: 500, error: err.message };
  }
};
