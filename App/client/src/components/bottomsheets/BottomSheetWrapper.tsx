import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import CustomBackdrop from './CustomBackdrop';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalLocation from '../modals/ModalLocation.tsx';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetWrapper = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);
  const [vendor, setVendor] = useState('');
  const [snapIndex, setSnapIndex] = useState(0);

  const snapPoints = useMemo(() => ['13%', '60%', '92%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const handleFocus = () => {
    bottomSheetRef.current?.snapToIndex(2);
    textInputRef.current?.focus();
  };

  const handleBackdropSelection = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      {children} 
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{ marginBottom: 0, borderRadius: 15 }}
        backgroundStyle={{ backgroundColor: COLORS.teal, borderRadius: 15, borderWidth: 1, borderColor: COLORS.tealwhite }}
        handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 5 }}
        backdropComponent={(props) => (
          <CustomBackdrop {...props} onSelectBackdrop={handleBackdropSelection} />
        )}
      >
        <TouchableWithoutFeedback onPressIn={Keyboard.dismiss} style={{flex: 1}}>
          <View style={styles.contentContainer}>
            <View style={styles.textInputContainer}>
              <TouchableOpacity onPressIn={snapIndex === 0 ? handleFocus : handleBackdropSelection }>
                <Icon 
                  name={snapIndex === 0 ? 'search' : 'arrow-back'} 
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
              {vendor.length !== 0 &&
                <TouchableOpacity onPress={() => setVendor('')}>
                  <Icon name="close" size={25} color={COLORS.tealwhite} style={styles.closeIcon} />
                </TouchableOpacity>
              }
            </View>
            <View style={styles.bottomTab}>
              <View>
                <Text></Text>
              </View>
            </View>
          </View> 
        </TouchableWithoutFeedback>
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
    backgroundColor: '#1e4147',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'relative',
    zIndex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tealwhite,
    borderRadius: 50,
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
    borderRadius: 50,
  },
});

