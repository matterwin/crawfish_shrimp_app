import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
  Keyboard, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Platform, 
  Dimensions,
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFooter, BottomSheetTextInput, useBottomSheetTimingConfigs } from "@gorhom/bottom-sheet";
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import FlatListPrices from '../flatlists/FlatListPrices.tsx';
import ModalPriceUpdate from '../modals/ModalPriceUpdate.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetPrices = ({ children, selectedItem, snapIndex, setSnapIndex }: Props & { selectedItem: Item, snapIndex: number }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);
  const [userInput, setUserInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const snapPoints = useMemo(() => ['80%', '87%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 400,
  });

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        closeOnPress={true}
        enableTouchThrough={true}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
			/>
		),
		[]
	);

  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props} inset={550}>
        <View style={[styles.closeParentView, styles.shadowView]}>
          <TouchableOpacity onPress={handleUpdate} style={styles.bottomCloseContainer}>
            <Text style={styles.closeText}>Update Price</Text> 
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <View style={styles.container}>
      {children} 
      <BottomSheet
        ref={bottomSheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: 'transparent' }}
        handleIndicatorStyle={{ backgroundColor: COLORS.whiteDark, width: 50, height: 5 }}
        backgroundStyle={{  backgroundColor: 'transparent' }} 
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode='adjustResize'
        animationConfigs={animationConfigs}
      >
        <View style={styles.sheetContainer}> 
          <View style={styles.titleLocationView}>
            <View>
              <View style={{ padding: 3, borderRadius: 10, backgroundColor: COLORS.orange}}>
                <Icon 
                  name={'location-sharp'} 
                  size={25} 
                  color={COLORS.white} 
                />
              </View>
            </View>
            <View style={styles.locationAndAddressView}>
              <Text 
                style={[styles.titleLocationText, { fontSize: 14 }]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
              <Text 
                style={[styles.titleLocationText, { color: COLORS.brightteal, fontWeight: 500 }]} 
                numberOfLines={1} 
                ellipsizeMode="tail"
              >
                {item.address}
              </Text>
            </View>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Boiled Crawfish • Prices</Text>
            <TouchableOpacity style={{ margin: 10, marginRight: 10, marginTop: 5, }} onPress={() => bottomSheetRef.current.close()}>
              <Icon name="close-outline" size={40} color={COLORS.brightteal}/>
            </TouchableOpacity>
          </View>
          <FlatListPrices  />
          <ModalPriceUpdate
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            title={item.title}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetPrices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sheetContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: COLORS.teal,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.tealwhite,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
  },
  titleLocationView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: COLORS.tealwhite,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
    margin: 10, 
    marginLeft: 15,
    marginBottom: 0,
    gap: 15,
    width: '100%',
    marginRight: 150,
  },
  titleText: {
    color: COLORS.white,
    margin: 10, 
    marginLeft: 15, 
    marginTop: 5,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  },
  titleLocationText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '80%'
  },
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeParentView: {
    borderRadius: 15,
    // paddingVertical: 25,
    height: Dimensions.get('window').height * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.teal,
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
    paddingBottom: 18,
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 21,
    color: COLORS.orange
  },
  locationAndAddressView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '90%',
  },
});




