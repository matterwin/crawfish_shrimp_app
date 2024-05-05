import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';
import * as Linking from 'expo-linking';

const ModalAllowLocation = ({ setShowModalAllowLocation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  
  const handleClosingModal = () => { 
    setModalVisible(false);
    setShowModalAllowLocation(false);
  };

  const handleOpenSettings = async () => {
    setShowModalAllowLocation(false);
    Linking.openSettings();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClosingModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ marginLeft: 0 }}>
              <Icon name="settings" size={70} color={COLORS.orange} />
            </View>
            <TouchableOpacity style={styles.closeModalTouchable} onPress={handleClosingModal}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Text style={styles.modalText}>App needs your permission to know where the local vendors are settled.</Text>
            <View style={styles.columnView}>
              <View style={styles.columnTextView}>
                <Text style={styles.smallText}>Go to app settings and allow location sharing</Text>
              </View>
              <TouchableOpacity style={styles.settingsTouchable}onPress={handleOpenSettings}>
                <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAllowLocation;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%'
  },
  closeModalTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  settingsTouchable: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  columnTextView: {
    width: '50%',
    alignItems: 'flex-start',
  },
  columnView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallText: {
    textAlign: 'left'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
