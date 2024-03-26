import React, { useState, useEffect } from 'react';
import { Dimensions, View, TextInput, FlatList, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { citiesData } from '../../api/static/citiesData.tsx';
import { COLORS } from '../../constants';
import { completedResults } from '../../api/places/handlePlaceAutoComplete.tsx';
import Icon from 'react-native-vector-icons/Ionicons';

const ChosenCityAutoComplete = ({ closeKeyboard, handleClosingSearchModal, handleClosingModal, city, setCity, lastCityLocation }) => { 
  const [suggestions, setSuggestions] = useState([]);
  const [pressedItemIndex, setPressedItemIndex] = useState(null);

  const handlePressIn = (index) => {
    setPressedItemIndex(index);
  };

  const handlePressOut = () => {
    setPressedItemIndex(null);
  };

  useEffect(() => {
    searchCities(); 
  },[city])

  const handleTextPress = (chosenCity) => {
    setCity(chosenCity);
    handleClosingModal();
  };

  const searchCities = async () => {
    try {
      const staticSuggestions = [
        { city: 'New York', state: 'NY', country: 'USA', place_id: 'place_id_1' },
        { city: 'Los Angeles', state: 'CA', country: 'USA', place_id: 'place_id_2' },
        { city: 'Chicago', state: 'IL', country: 'USA', place_id: 'place_id_3' },
        { city: 'Houston', state: 'TX', country: 'USA', place_id: 'place_id_4' },
        { city: 'Miami', state: 'FL', country: 'USA', place_id: 'place_id_5' },
      ];

       setSuggestions(staticSuggestions);
      // const res = await completedResults(city); 
      //
      // if(res.status === 200) {
      //   const formattedSuggestions = res.data.predictions.map(prediction => {
      //     const description = prediction.description;
      //     const [city, state, country] = description.split(', ');
      //      
      //     return {
      //       city,
      //       state,
      //       country,
      //       place_id: prediction.place_id
      //     };
      //   });
      //
      //   setSuggestions(formattedSuggestions);
      //   console.log(formattedSuggestions);
        //} 
    } catch (err) {
      console.log(err);
    }
  }

  const renderItem = ({ item, index }) => {
    return(
     <TouchableOpacity
        onPress={() => handleTextPress(`${item.city}, ${item.state}`)}
        onPressIn={() => handlePressIn(index)}
        onPressOut={handlePressOut}
        style={[
          styles.searchResultItemView, 
          index === pressedItemIndex && { backgroundColor: 'rgba(144, 149, 158, 0.5)' }, 
        ]}
        activeOpacity={1}
      >
        <View style={{  padding: 15 }}>
        <Icon name="location-sharp" color={COLORS.green} size={30} />
        </View>
        <View style={styles.textStackView}>
          <Text style={{color: COLORS.white, fontSize:18, fontWeight: 700 }}>
            {item.city}, {item.state}
          </Text>
          <Text style={{color: COLORS.grey, fontSize:14, fontWeight: '600' }}>
           {item.country}
          </Text>  
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.precursorView}>
            <Text style={styles.precursorSearchText}>Suggested Cities</Text>
          </View>
        }
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        onScrollEndDrag={closeKeyboard}
        onScrollBeginDrag={() => console.log("test")}
      />
    </View>
  );
};

export default ChosenCityAutoComplete;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width,
  },
  flatList: {
    width: '100%',
    flex: 1,
  },
  precursorView: {
    padding: 15,
    paddingBottom: 10,
  },
  precursorSearchText: {
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: '600'
  },
  searchResultItemView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textStackView: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: 'rgba(144, 149, 158, 0.3)', 
  },
});
