import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import ModalAllowLocation from './ModalAllowLocation';
import ModalCityChooser from './ModalCityChooser.tsx';

const ModalLocation = ({ modalVisible, setModalVisible, setSnapIndex, snapToIndex }) => {
  const [llocation, setLocation] = useState(''); 
  const [prevl, setPrevl] = useState(''); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [showModalAllowLocation, setShowModalAllowLocation] = useState(false);
  const [showModalCityChooser, setShowModalCityChooser] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');

  const handleClosingModal = () => {
    setModalVisible(false);
    snapToIndex?.(0);
    setModalVisible(!modalVisible);
  };

  const handleOnPress = () => {
    setModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleNewCityPress = () => {
    setShowModalCityChooser(true); 
    setPrevl(llocation);
    setLocation('city');
  };

  const handleCurrLocationPress = async() => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setShowModalAllowLocation(true);  
      } else {
        setLocation('precise');
        setPrevl('precise');
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setLatitude(latitude);
        setLongitude(longitude);
        console.log(longitude);
        console.log(latitude);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode.length > 0) {
          const { city, region } = reverseGeocode[0];
          const combinedCityRegion = city && region ? `${city}, ${region}` : city || 'Unknown';
          setCity(combinedCityRegion);
        }
      }
    } catch (e) {}
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
            <View style={styles.contentModalMinusCloseView}>
              <View>
              <Text style={styles.modalText}>Set your location</Text>
              </View>
              {city && 
                <View style={styles.cityViewParent}>
                  <View style={styles.cityView}>
                    <Text style={styles.cityText}>{city}</Text>
                  </View>
                </View>
              }
              <View style={styles.optionsView}>
                <View style={styles.optionsBoxParentView}>
                  <TouchableOpacity 
                    onPress={handleNewCityPress} 
                    style={[
                      styles.optionBoxView, 
                      { 
                        borderColor: "rgba(144, 149, 158, 0.3)", 
                        borderRightWidth: 1, 
                        backgroundColor: llocation === 'city' ? COLORS.tealwhite : 'transparent'
                      }
                    ]}
                  >
                    <Icon name="subway" size={50} color={COLORS.brightteal}/>
                    <View>
                      <Text style={styles.optionText}>Choose new city</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={handleCurrLocationPress} 
                    disabled={llocation === 'precise' && prevl === 'precise'}
                    style={[
                      styles.optionBoxView, 
                      { 
                        borderColor: "rgba(144, 149, 158, 0.3)", 
                        borderLeftWidth: 1, 
                        backgroundColor: llocation === 'precise' && prevl === 'precise' ? COLORS.tealwhite : 'transparent'
                      }
                    ]}
                  >
                    <Icon name="body" size={50} color={COLORS.brightteal}/>
                    <View>
                      <Text style={styles.optionText}>Use Current Location</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.closeParentView, styles.shadowView]}>
              <TouchableOpacity onPress={handleClosingModal} style={styles.bottomCloseContainer}>
                <Text style={styles.closeText}>CLOSE</Text> 
              </TouchableOpacity>
            </View>
          </View>
          {showModalAllowLocation && <ModalAllowLocation setShowModalAllowLocation={setShowModalAllowLocation} />}
          {showModalCityChooser && 
            <ModalCityChooser 
              setShowModalCityChooser={setShowModalCityChooser} 
              setCity={setCity} 
              city={city}
              setLocation={setLocation}
              location={llocation}
              setPrevl={setPrevl}
              prevl={prevl}
            />
          } 
        </View>
      </Modal>
    </View>
  );
};

export default ModalLocation;

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
  contentModalMinusCloseView: {
    padding: 50,
    flex: 1
  },
  cityViewParent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityView: {
    backgroundColor: "rgba(144, 149, 158, 0.3)", 
    borderColor: COLORS.grey, 
    borderWidth: 1, 
    borderRadius: '100%', 
    padding: 20,
  },
  cityText: {
    fontSize: 20,
    color: COLORS.green,
  },
  optionsView: {
    position: 'absolute',
    top:0,right:0,left:0,bottom:0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsBoxParentView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  locationNoticeText: {
    position: 'absolute',
    right:0,left:0,bottom:0,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: "50%",
    borderColor: COLORS.grey,
    borderWidth: 5,
    paddingTop: 10,
    borderTopRightRadius: "70%",
    borderTopLeftRadius: "70%",
    backgroundColor: 'rgba(71, 104, 110, 0.4)',
  },
  buttonOpen: {
    backgroundColor: 'transparent',
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
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.white,
  },
  modalIcon: {
    padding: 0,
    marginTop: -40,
    paddingBottom: 10,
    shadowColor: 'pink',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.2,
    elevation: 5,
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
});

