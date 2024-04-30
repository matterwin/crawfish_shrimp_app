import React, { useState, useRef } from 'react';
import { Dimensions, Keyboard, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ChosenCityAutoComplete from '../autocompletes/ChosenCityAutoComplete.tsx';

const ModalMainSearch = ({ modalVisible, setModalVisible, setSnapIndex, snapToIndex }) => {
  const textInputRef = useRef<TextInput>(null);

  const handleClosingModal = () => {
    setModalVisible(false);
    snapToIndex?.(0);
    Keyboard.dismiss();
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
        animationType="slide"
        transparent={false}
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
                  placeholder='Search Vendor' 
                  placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                  autoCapitalize='none' 
                  // onChangeText={(text) => setCity(text)} 
                  color={COLORS.royalblue}
                  onFocus={handleFocus}
                  style={styles.textInput}
                  keyboardAppearance='dark'
                  autoFocus={true}
                />            
              </View> 
            </View>
          </View>
        </BlurView>
      </Modal>
     </View>
  );
};

export default ModalMainSearch;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.teal
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
    borderColor: COLORS.tealwhite,
    borderRadius: 15,
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
    paddingLeft: 15,
  },
  closeIcon: {
    paddingLeft: 15,
  },
});
