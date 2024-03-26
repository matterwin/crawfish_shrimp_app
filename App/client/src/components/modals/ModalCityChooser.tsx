import React, { useState, useRef } from 'react';
import { Dimensions, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ChosenCityAutoComplete from '../autocompletes/ChosenCityAutoComplete.tsx';
import SearchPlaces from '../autocompletes/SearchPlaces.tsx';

const ModalCityChooser = ({ setShowModalCityChooser, setCity, city, setLocation, location, setPrevl, prevl }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [lastCityLocation, setLastCityLocation] = useState(city);
  const textInputRef = useRef<TextInput>(null);

  const handleClosingModal = () => {
    setModalVisible(false);
    setShowModalCityChooser(false); 
    if(city.length === 0) {
      setCity(lastCityLocation);
      setLocation(prevl); 
    }
  };

  const handleClosingSearchModal = () => {
    if(city.length === 0) {
      setCity(lastCityLocation);
      setModalVisible(false);
      setShowModalCityChooser(false);
      setLocation(prevl); 
    }
  };

  const handleFocus = () => {
    textInputRef.current?.focus();
  };

  const closeKeyboard = () => {
    textInputRef.current?.blur();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClosingModal}
      >
        <BlurView intensity={40} style={{flex: 1}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.textInputContainer}>
                <TouchableOpacity onPress={handleClosingModal}>
                  <Icon name="arrow-back" size={25} color={COLORS.tealwhite} style={styles.searchIcon} />
                </TouchableOpacity>
                 <TextInput
                  ref={textInputRef}
                  placeholder='Search city' 
                  placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                  value={city} 
                  autoCapitalize='none' 
                  onChangeText={(text) => setCity(text)} 
                  color={COLORS.royalblue}
                  onFocus={handleFocus}
                  style={styles.textInput}
                  keyboardAppearance='dark'
                  autoFocus={true}
                />            
                {city.length !== 0 &&
                  <TouchableOpacity onPress={() => setCity('')}>
                    <Icon name="close" size={25} color={COLORS.tealwhite} style={styles.closeIcon} />
                  </TouchableOpacity>
                }
              </View> 
              {city && 
                <ChosenCityAutoComplete 
                  closeKeyboard={closeKeyboard}
                  handleClosingSearchModal={handleClosingSearchModal} 
                  handleClosingModal={handleClosingModal} 
                  city={city}
                  setCity={setCity} 
                  lastCityLocation={lastCityLocation}
                  setLocation={setLocation}
                  setPrevl={setPrevl}
                />
              }
            </View>
          </View>
        </BlurView>
      </Modal>
     </View>
  );
};

export default ModalCityChooser;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    marginTop: 45,
    padding: 15,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: Dimensions.get('window').width,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tealwhite,
    borderRadius: 50,
    marginTop: 5,
    width: "100%",
    backgroundColor: COLORS.brightteal,
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
    padding: 15,
    borderRadius: 50,
  },
  searchIcon: {
    padding: 15,
    paddingRight: 0
  },
  closeIcon: {
    padding: 15,
    paddingLeft: 0
  },
});
