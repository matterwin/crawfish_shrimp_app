import React, { useEffect, useState } from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';

const ModalLocation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(''); 
  const [realLocation, setRealLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleOnPress = () => {
    setModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handleNewCityPress = () => {
    setLocation('city');
    console.log('city pressed');
  };

  const handleCurrLocationPress = async() => {
    setLocation('current');
    console.log('current location pressed');
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== granted) {
        alert("location not shared");
      }
    } catch (e) {}
  };

  // setup for actual implementation
  // useEffect(() => {
  //   console.log("location changed");
  // },[location])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Use Location');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contentModalMinusCloseView}>
              <Text style={styles.modalText}>Set your location</Text>
              <View style={styles.optionsBoxParentView}>
                <TouchableOpacity
                  onPress={handleNewCityPress}
                  style={[styles.optionBoxView, { borderColor: "rgba(144, 149, 158, 0.3)", borderRightWidth: 1 }]}
                >
                  <Icon name="subway" size={50} color={COLORS.brightteal}/>
                  <View>
                    <Text style={styles.optionText}> Choose new city </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleCurrLocationPress} 
                  style={[styles.optionBoxView, { borderColor: "rgba(144, 149, 158, 0.3)", borderRightWidth: 1 }]}
                >
                  <Icon name="body" size={50} color={COLORS.brightteal}/>
                  <View>
                    <Text style={styles.optionText}> Use Current Location </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.closeParentView, styles.shadowView]}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.bottomCloseContainer}>
                <Text style={styles.closeText}>CLOSE</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button]}
        onPress={handleOnPress}>
        <Icon name="pin" size={55} color={COLORS.orange} style={styles.modalIcon} />
      </Pressable>
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
    borderRadius: 20,
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
  },
  optionsBoxParentView: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: "rgba(144, 149, 158, 0.3)",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  optionBoxView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   gap: 20
  },
  optionText: {
    color: COLORS.white,
    fontSize: 16
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
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.white
  },
  modalIcon: {
    padding: 0,
    marginTop: -40,
    paddingBottom: 10,
    shadowColor: 'pink',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
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

