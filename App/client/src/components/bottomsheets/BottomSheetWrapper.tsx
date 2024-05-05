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
  Dimensions 
} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import CustomBackdrop from './CustomBackdrop';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalLocation from '../modals/ModalLocation.tsx';
import ModalMainSearch from '../modals/ModalMainSearch.tsx';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import CircleUserContainer from '../iconContainers/CircleUserContainer.tsx';
import FilterBar from '../filters/FilterBar.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetWrapper = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);
  const [vendor, setVendor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  const translateY = useSharedValue<number>(0);
  const animatedPOIListPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const animatedPOIListIndex = useSharedValue<number>(0);

  const snapPoints = useMemo(() => ['13%', '60%', '92%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const handleFocus = () => {
    setModalVisible(true);
    bottomSheetRef.current?.snapToIndex(1)
    Keyboard.dismiss();
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        style={[
          props.style,
          { backgroundColor: 'transparent' },
        ]}
        appearsOnIndex={1}
        pressBehavior={0}
			/>
		),
		[]
	);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(animatedPOIListPosition.value - 65) }],
  }));

  return (
    <View style={styles.container}>
      {children} 
      <Animated.View style={[styles.box, animatedStyles]}>
        <FilterBar setModalVisible={setModalLocationVisible} snapToIndex={bottomSheetRef.current?.snapToIndex}/>
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: 'transparent' }}
        handleIndicatorStyle={{ backgroundColor: COLORS.whiteDark, width: 50, height: 5 }}
        backgroundStyle={{  backgroundColor: 'transparent' }}
        animatedPosition={animatedPOIListPosition}
        animatedIndex={animatedPOIListIndex}
      >
        <TouchableWithoutFeedback style={{flex: 1}}>
          <View style={styles.contentContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', }}>
              <View style={styles.textInputContainer}>
                <View style={styles.textInputContainerOld}>
                  <TouchableOpacity onPressIn={handleFocus}>
                    <Icon 
                      name={'search'} 
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
                  />
                </View>
              </View> 
              <TouchableOpacity style={styles.searchIcon} onPress={() => console.log("pressed")}>
                <CircleUserContainer size={30}/> 
              </TouchableOpacity>
            </View>
            <View style={styles.bottomTab}>
              <View>
                <Text></Text>
              </View>
            </View>
          </View> 
        </TouchableWithoutFeedback>
      </BottomSheet>
      <View>
        <ModalMainSearch
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setSnapIndex={setSnapIndex}
          snapToIndex={bottomSheetRef.current?.snapToIndex}
        />
        <ModalLocation
          setModalVisible={setModalLocationVisible}
          modalVisible={modalLocationVisible}
          setSnapIndex={setSnapIndex}
          snapToIndex={bottomSheetRef.current?.snapToIndex}
        />
      </View>
    </View>
  );
};

export default BottomSheetWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    backgroundColor: COLORS.teal,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'relative',
    zIndex: 1,
    paddingTop: 15,
  },
  box: {
    // height: 120,
    // width: '100%',
    // backgroundColor: '#b58df1',
    borderRadius: 20,
    justifyContent: 'flex-start',
    ...StyleSheet.absoluteFillObject,
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
    padding: 15,
    paddingLeft: 0
  },
});

