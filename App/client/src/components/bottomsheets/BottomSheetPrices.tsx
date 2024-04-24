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
  const textInputRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [item, setItem] = useState(selectedItem);
  const [userInput, setUserInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const snapPoints = useMemo(() => ['70%', '85%'], []);

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
        handleStyle={{ marginBottom: -3, borderRadius: 15, }}
        backgroundStyle={{ backgroundColor: COLORS.teal, borderRadius: 15, borderWidth: 1, borderColor: COLORS.tealDark }}
        handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 30, height: 5 }} 
        backdropComponent={renderBackdrop}
        footerComponent={renderFooter}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode='adjustResize'
        animationConfigs={animationConfigs}
      >
        <View style={styles.sheetContainer}> 
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Boil Prices</Text>
            <TouchableOpacity style={{ margin: 10, marginRight: 15, marginTop: 0, marginBottom: 5 }} onPress={() => bottomSheetRef.current.close()}>
              <Icon name="close-outline" size={40} color={COLORS.brightteal}/>
            </TouchableOpacity>
          </View>
          <FlatListPrices  />
        </View>
        <ModalPriceUpdate
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          title={item.title}
        />
      </BottomSheet>
    </View>
  );
};

export default BottomSheetPrices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'visible',
  },
  sheetContainer: {
    flex: 1,
    // margin: 15,
    overflow: 'visible',
    marginTop: 0,
    // gap: 15
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.tealwhite,
    borderColor: COLORS.tealDark,
    flexDirection: 'row',
  },
  titleText: {
    color: COLORS.white,
    margin: 10, 
    marginLeft: 15, 
    marginTop: 0, 
    marginBottom: 5,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  },
  reviewsView: {
    marginTop: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 20,
  },
  reviewsText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: '100%'
  },
  searchIcon: {
    padding: 10,
    paddingHorizontal: 15,
    // paddingLeft: 0,
    marginRight: 5,
    backgroundColor: COLORS.tealwhite,
    borderRadius: 50
  },
  closeIcon: {
    padding: 15,
    paddingLeft: 0
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
});




