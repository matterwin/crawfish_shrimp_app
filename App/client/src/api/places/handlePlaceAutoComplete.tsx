import { GOOGLE_PLACES_API_KEY, GOOGLE_PLACES_AUTOCOMPLETE_API} from "@env";

const baseURL = GOOGLE_PLACES_AUTOCOMPLETE_API;

export const completedResults = async () => {
  const queryParams = new URLSearchParams({
    input: 'Paris',
    types: 'geocode',
    key: GOOGLE_PLACES_API_KEY, 
    language: 'en',
  });

  const url = `${baseURL}?${queryParams.toString()}`;

  try {
     const res = await fetch(url, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
     });

    const data = await res.json();
    console.log('Data:', data);
    return { status: res.status, data };

  } catch (err) {
    console.log("error in api call: " + err);
    return { status: 500, error: err.message };
  }
};
