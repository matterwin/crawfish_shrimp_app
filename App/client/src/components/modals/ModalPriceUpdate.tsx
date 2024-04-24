import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import * as Haptics from 'expo-haptics';
import ModalAllowLocation from './ModalAllowLocation';
import ModalCityChooser from './ModalCityChooser.tsx';

const ModalPriceUpdate = ({ modalVisible, setModalVisible, title }) => {
 
  const handleOnPress = () => {
    setModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

   return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.headerSafeView}>
          <View style={styles.header} onTouchEnd={() => setModalVisible(false)}>
            <Icon name="arrow-back" style={{ margin: 0, padding: 0 }} size={26} color={COLORS.white} />
          </View>
        </View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contentModalMinusCloseView}>
              <View>
                <Text style={styles.modalText}>{title}</Text>
              </View> 
            </View>
          </View>
        </View>
        <View style={[styles.closeParentView, styles.shadowView]}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.bottomCloseContainer}>
            <Text style={styles.closeText}>CONFIRM</Text> 
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );};

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

