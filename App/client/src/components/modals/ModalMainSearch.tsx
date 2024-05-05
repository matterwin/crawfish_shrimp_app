import React, { useState, useRef } from 'react';
import { Dimensions, Keyboard, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ChosenCityAutoComplete from '../autocompletes/ChosenCityAutoComplete.tsx';
import CircleUserContainer from '../iconContainers/CircleUserContainer.tsx';
import ModalLocation from '../modals/ModalLocation.tsx';

const ModalMainSearch = ({ modalVisible, setModalVisible, setSnapIndex, snapToIndex }) => {
  const textInputRef = useRef<TextInput>(null);
  const textLocationInputRef = useRef<TextInput>(null);
  const [userInput, setUserInput] = useState('');
  const [location, setLocation] = useState('');
  const [modalLocationVisible, setModalLocationVisible] = useState(false);

  const handleClosingModal = () => {
    setModalVisible(false);
    snapToIndex?.(0);
    Keyboard.dismiss();
    setUserInput('');
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
              <View style={styles.textInputContainer}>
                <View style={styles.textInputContainerOld}>
                  <TouchableOpacity onPress={handleClosingModal}>
                    <Icon 
                      name={'arrow-back'} 
                      size={25} 
                      color={COLORS.tealwhite} 
                      style={styles.searchIconOld} 
                    />
                  </TouchableOpacity>
                  <TextInput
                    ref={textInputRef}
                    placeholder='Search Vendor'
                    placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                    autoCapitalize='none'
                    onChangeText={(text) => setUserInput(text)}
                    style={styles.textInput}
                    keyboardAppearance='dark'
                    onFocus={handleFocus}
                    autoFocus={true}
                    value={userInput}
                  />
                  {userInput !== '' &&
                    <TouchableOpacity onPress={() => setUserInput('')}>
                      <Icon name="close" size={25} color={COLORS.tealwhite} style={styles.closeIcon} />
                    </TouchableOpacity>
                  }
                </View>
              </View> 
              <TouchableOpacity style={styles.searchIcon} onPress={handleClosingModal}>
                <Text style={styles.cancelText}>Cancel</Text> 
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', }}>
              <View style={styles.textLocationInputContainer}>
                <View style={styles.textLocationInputContainerOld}>
                  <Pressable onPress={() => setModalLocationVisible(true)}>
                    <View style={{ paddingLeft: 15 }}>
                      <View style={{ padding: 3,borderRadius: 10, backgroundColor: COLORS.orange}}>
                        <Icon 
                          name={'location-sharp'} 
                          size={25} 
                          color={COLORS.white} 
                        />
                      </View>
                    </View>
                  </Pressable>
                  <Pressable
                    style={[styles.textInput, {  }]}
                    onPress={() => setModalLocationVisible(true)}
                  >
                    <Text style={{ fontSize: 17, color: 'rgba(0, 0, 0, 0.6)'}}>Current Location</Text>
                  </Pressable>
                </View>
              </View> 
            </View>
          </View>
        </View>
        <View>
          <ModalLocation
            setModalVisible={setModalLocationVisible}
            modalVisible={modalLocationVisible}
          />
        </View>
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
    alignItems: 'center',
    borderRadius: 15,
    width: "80%",
    backgroundColor: COLORS.brightteal,
  },
  textInputContainerOld: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textLocationInputContainer: {
    alignItems: 'center',
    borderRadius: 15,
    width: "100%",
    backgroundColor: COLORS.brightteal,
    marginTop: 10,
  },
  textLocationInputContainerOld: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    padding: 15,
    width: '100%'
  },
  searchIcon: {
    marginRight: 5,
  },
  searchIconOld: {
    paddingLeft: 15
  },
  closeIcon: {
    paddingRight: 15,
  },
  cancelText: {
    color: COLORS.orange,
    fontSize:  17,
  },
});
