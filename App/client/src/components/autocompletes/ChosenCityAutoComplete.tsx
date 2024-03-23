import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { citiesData } from '../../api/static/citiesData.tsx';

const ChosenCityAutoComplete = ({ handleClosingModal, city, setCity }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    handleInputChange(city);
  },[city])

  const handleTextPress = (chosenCity) => {
    setCity(chosenCity);
    handleClosingModal();
  };

  const handleInputChange = (text) => {
    const filteredCities = citiesData.filter(
      (cityData) =>
        cityData.city.toLowerCase().slice(0, text.length) === text.toLowerCase()
    );
    setSuggestions(filteredCities);
  };

  return (
    <View>
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <Text onPress={() => handleTextPress(item.city)}>
            {item.city}, {item.state}
          </Text>
        )}
        keyExtractor={(item) => item.city}
        style={{ maxHeight: 200 }}
      />
    </View>
  );
};

export default ChosenCityAutoComplete;

