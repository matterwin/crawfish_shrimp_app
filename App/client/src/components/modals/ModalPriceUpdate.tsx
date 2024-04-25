import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, Keyboard, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import * as Haptics from 'expo-haptics';
import CircleIconContainer from '../iconContainers/CircleIconContainer.tsx';

const ModalPriceUpdate = ({ modalVisible, setModalVisible, title }) => {
  const [disabledConfirm, setDisabledConfirm] = useState(true);
  const [boiledCrawfishPrice, setBoiledCrawfishPrice] = useState('');
  const [boiledShrimpPrice, setBoiledShrimpPrice] = useState('');
  const [liveCrawfishPrice, setLiveCrawfishPrice] = useState('');
  const [liveShrimpPrice, setLiveShrimpPrice] = useState('');

  const [boiledCrawfishFocus, setBoiledCrawfishFocus] = useState(false);
  const [liveCrawfishFocus, setLiveCrawfishFocus] = useState(false);
  const [boiledShrimpFocus, setBoiledShrimpFocus] = useState(false);
  const [liveShrimpFocus, setLiveShrimpFocus] = useState(false);

  const placeholder = '-.--';

  useEffect(() => {
    const anyPriceNotEmpty = 
      boiledShrimpPrice !== '' ||
      boiledCrawfishPrice !== '' ||
      liveShrimpPrice !== '' ||
      liveCrawfishPrice !== '';

    const anyPriceNotZero = 
      boiledShrimpPrice !== '-.--' ||
      boiledCrawfishPrice !== '-.--' ||
      liveShrimpPrice !== '-.--' ||
      liveCrawfishPrice !== '-.--';

    setDisabledConfirm(!(anyPriceNotEmpty && anyPriceNotZero)); 
  },[boiledShrimpPrice, boiledCrawfishPrice, liveCrawfishPrice, liveShrimpPrice]);
    
  const handleInputChange = (text, setStateFunction) => {
    const formattedText = text.replace(/[^0-9]/g, '');

    if(formattedText.length > 4) {
      setStateFunction(formattedText.substring(4));
    } else if (formattedText.length > 1) {
      if(formattedText.length == 4) {
        const firstTwoDigits = formattedText.substring(0, 2);
        const remainingDigits = formattedText.substring(2);
        setStateFunction(firstTwoDigits + '.' + remainingDigits);
      } else {
        const firstTwoDigits = formattedText.substring(0, 1);
        const remainingDigits = formattedText.substring(1);
        setStateFunction(firstTwoDigits + '.' + remainingDigits);
      }
    } else {
      setStateFunction(formattedText);
    }
  };
 
  const handleOnPress = () => {
    setModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const closeModal = () => {
    setModalVisible(false);
    setBoiledCrawfishPrice('');
    setBoiledShrimpPrice('');
    setLiveCrawfishPrice('');
    setLiveShrimpPrice('');
  };

   return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.headerSafeView}>
          <View style={styles.header} onTouchEnd={closeModal}>
            <Icon name="arrow-back" style={{ margin: 0, padding: 0 }} size={26} color={COLORS.white} />
          </View>
        </View>
        <Pressable onPressIn={dismissKeyboard} style={styles.centeredView}>
          <View style={styles.modalView} onPress={dismissKeyboard}>
            <View style={styles.contentModalMinusCloseView}>
              <View>
                <Text style={styles.modalText}>{title}</Text>
              </View> 
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.optionsView}>
                <View>
                  <CircleIconContainer food={"crawfish"} />
                </View>
                <View>
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={styles.stackPriceBoxView}>
                      <Text style={styles.typePriceText}>Boiled</Text>
                      <View 
                        style={[
                          styles.inputKeyboardView, 
                          { 
                            opacity: boiledCrawfishPrice  === '' && !boiledCrawfishFocus ? 0.2 : 1,
                          }
                        ]}
                      >
                        <TextInput
                          style={styles.textInput}
                          keyboardType="numeric"
                          placeholder={placeholder}
                          value={boiledCrawfishPrice}
                          onChangeText={(text) => handleInputChange(text, setBoiledCrawfishPrice)}
                          placeholderTextColor="#fff"
                          onFocus={() => setBoiledCrawfishFocus(true)}
                          onBlur={() => setBoiledCrawfishFocus(false)}
                        />
                      </View>
                    </View> 
                    <View style={styles.stackPriceBoxView}>
                      <Text style={styles.typePriceText}>Live</Text>
                      <View 
                        style={[
                          styles.inputKeyboardView, 
                          { 
                            opacity: liveCrawfishPrice  === '' && !liveCrawfishFocus ? 0.2 : 1,
                          }
                        ]}
                      >
                        <TextInput
                          style={styles.textInput}
                          keyboardType="numeric"
                          placeholder={placeholder}
                          value={liveCrawfishPrice}
                          onChangeText={(text) => handleInputChange(text, setLiveCrawfishPrice)}
                          placeholderTextColor="#fff"
                          onFocus={() => setLiveCrawfishFocus(true)}
                          onBlur={() => setLiveCrawfishFocus(false)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ height: 1, width: '100%', backgroundColor: COLORS.tealLight }}></View>
                <View>
                  <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={styles.stackPriceBoxView}>
                      <View 
                        style={[
                          styles.inputKeyboardView, 
                          { 
                            opacity: boiledShrimpPrice  === '' && !boiledShrimpFocus ? 0.2 : 1,
                          }
                        ]}
                      >
                        <TextInput
                          style={styles.textInput}
                          keyboardType="numeric"
                          placeholder={placeholder}
                          value={boiledShrimpPrice}
                          onChangeText={(text) => handleInputChange(text, setBoiledShrimpPrice)}
                          placeholderTextColor="#fff"
                          onFocus={() => setBoiledShrimpFocus(true)}
                          onBlur={() => setBoiledShrimpFocus(false)}
                        />
                      </View>
                      <Text style={styles.typePriceText}>Boiled</Text>
                    </View> 
                    <View style={styles.stackPriceBoxView}>
                      <View 
                        style={[
                          styles.inputKeyboardView, 
                          { 
                            opacity: liveShrimpPrice  === '' && !liveShrimpFocus ? 0.2 : 1,
                          }
                        ]}
                      >
                        <TextInput
                          style={styles.textInput}
                          keyboardType="numeric"
                          placeholder={placeholder}
                          value={liveShrimpPrice}
                          onChangeText={(text) => handleInputChange(text, setLiveShrimpPrice)}
                          placeholderTextColor="#fff"
                          onFocus={() => setLiveShrimpFocus(true)}
                          onBlur={() => setLiveShrimpFocus(false)}
                        />
                      </View>
                      <Text style={styles.typePriceText}>Live</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <CircleIconContainer food={"shrimp"} />
                </View>
              </KeyboardAvoidingView>
             </View>
          </View>
        </Pressable>
        <View style={[styles.closeParentView, styles.shadowView]}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.bottomCloseContainer}
            disabled={disabledConfirm}
          >
            <Text style={[styles.closeText, disabledConfirm && { color: COLORS.grey }]}>CONFIRM</Text> 
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', bottom: '15%', width: '100%' }}>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>All prices must be by the pound (lb) and in USD ($)</Text>
        </View>
      </Modal>
    </View>
  );
};

export default ModalPriceUpdate;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: Dimensions.get('window').width, 
    height: Dimensions.get('window').height,
    backgroundColor: COLORS.teal,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerSafeView: {
    position: 'absolute',
    top: 60,    
    left: 15,
    zIndex: 1,
  },
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.15)',
    // backgroundColor: 'rgba(50, 168, 82, 0.15)',
    position: 'absolute',
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentModalMinusCloseView: {
    padding: 50,
    flex: 1
  },
  optionsView: {
    position: 'absolute',
    top:0,right:0,left:0,bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    display: 'flex',
    flex: 1,
  },
  optionsBoxParentView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  optionBoxView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   gap: 10,
   paddingVertical: 35,
   borderTopWidth: 1,
   borderBottomWidth: 1
  },
  optionText: {
    color: COLORS.white,
    fontSize: 16
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.white,
  },
  closeParentView: {
    borderRadius: 15,
    position: 'absolute', 
    bottom: 0, 
    height: "14%",
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal
  },
  shadowView: {
    shadowColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  bottomCloseContainer: {
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 20,
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 21,
    color: COLORS.orange
  },
  inputKeyboardView: {
    backgroundColor: COLORS.brightteal,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 140,
    height: 60,
  },
  textInput: {
    color: COLORS.white,
    fontSize: 16,
    width: '100%',
    height: '100%',
    fontWeight: '600',
    textAlign: 'center',
  },
  typePriceText: {
    color: COLORS.brightteal,
    fontSize: 16,
    fontWeight: '500'
  },
  stackPriceBoxView: {
    gap: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

