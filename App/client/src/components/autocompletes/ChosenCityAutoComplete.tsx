import React, { useState, useEffect } from 'react';
import { Dimensions, View, TextInput, FlatList, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { citiesData } from '../../api/static/citiesData.tsx';
import { COLORS } from '../../constants';

const ChosenCityAutoComplete = ({ handleClosingSearchModal, handleClosingModal, city, setCity, lastCityLocation }) => { 
  useEffect(() => {
    handleInputChange(city);
  },[city])

  const handleTextPress = (chosenCity) => {
    setCity(chosenCity);
    handleClosingModal();
  };

  const handleInputChange = (text) => {
    if(text.length === 0) setCity(lastCityLocation);
    const filteredCities = citiesData.filter(
      (cityData) =>
        cityData.city.toLowerCase().slice(0, text.length) === text.toLowerCase()
    );
    setSuggestions(filteredCities);
  };

  const renderItem = ({ item }) => {
    return(
      <Text onPress={() => handleTextPress(item.city)}>
        {item.city}, {item.state}
      </Text>  
    );
  };

  return (
        <TouchableWithoutFeedback onPress={handleClosingSearchModal} style={{backgroundColor: 'yellow'}}>
    <View style={styles.flatListContainer}>
      <View>
        <Text style={{ color: COLORS.grey }}>Suggested Cities</Text>
      </View>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item) => item.city}
        style={styles.flatList}
      />
    </View>
          </TouchableWithoutFeedback>
  );
};

export default ChosenCityAutoComplete;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    padding: 15,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
    // backgroundColor: 'red'
  },
  flatList: {
    backgroundColor: 'blue'
  },
});
