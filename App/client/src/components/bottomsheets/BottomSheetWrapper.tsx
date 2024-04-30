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

type Props = {
  children: JSX.Element | JSX.Element[];
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheetWrapper = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);
  const [vendor, setVendor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  const translateY = useSharedValue<number>(0);
  const animatedPOIListPosition = useSharedValue<number>(SCREEN_HEIGHT);
  const animatedPOIListIndex = useSharedValue<number>(0);

  const snapPoints = useMemo(() => ['13%', '55%', '92%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const handleFocus = () => {
    setModalVisible(true);
    Keyboard.dismiss();
  };

  const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
        appearsOnIndex={0}
        pressBehavior={0}
			/>
		),
		[]
	);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(animatedPOIListPosition.value - 100) }],
  }));

  return (
    <View style={styles.container}>
      {children} 
      <Animated.View style={[styles.box, animatedStyles]} />
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
            <View style={styles.textInputContainer}>
              <TouchableOpacity onPressIn={handleFocus}>
                <Icon 
                  name={'search'} 
                  size={25} 
                  color={COLORS.tealwhite} 
                  style={styles.searchIcon} 
                />
              </TouchableOpacity>
              <TextInput
                ref={textInputRef}
                placeholder='Search vendor' 
                placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                value={vendor} 
                autoCapitalize='none' 
                onChangeText={(text) => setVendor(text)}
                color={COLORS.royalblue}
                onFocus={handleFocus}
                style={styles.textInput}
                onChangeText={(text) => setVendor(text)}
                keyboardAppearance='dark'
              />
            </View>
            <View style={styles.bottomTab}>
              <View>
                <Text></Text>
              </View>
            </View>
          </View> 
        </TouchableWithoutFeedback>
        <ModalMainSearch
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setSnapIndex={setSnapIndex}
          snapToIndex={bottomSheetRef.current?.snapToIndex}
        />      
      </BottomSheet>
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
    height: 120,
    width: '100%',
    backgroundColor: '#b58df1',
    borderRadius: 20,
    ...StyleSheet.absoluteFillObject,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tealwhite,
    borderRadius: 15,
    marginTop: 0,
    width: '100%',
    backgroundColor: COLORS.brightteal
  },
  searchIcon: {
    padding: 15,
    paddingRight: 0
  },
  closeIcon: {
    padding: 15,
    paddingLeft: 0
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
    padding: 15,
    borderRadius: 15,
  },
});

