import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from "@env";

const GooglePlacesInput = ({ handleClosingSearchModal, handleClosingModal, city, setCity, lastCityLocation, setSuggestions }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText(city);
    setSuggestions(getAddressText());
  }, []);

  const getAddressText = () => {
    return ref.current?.getAddressText() || ''; // Use optional chaining to access getAddressText
  };

  return (
    <View style={{ flex: 1 }}>
    <GooglePlacesAutocomplete
      ref={ref}
      onPress={(data, details = null) => {
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY, 
        language: 'en',
        components: 'country:us',
      }}
       minLength={1}
       fetchDetails={false}
       // textInputHide={true/* } */
       // suppressDefaultStyles={true}
       debounce={300}
    />
    </View>
  );
};

export default GooglePlacesInput;
