import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../constants';
import CustomBackdrop from './CustomBackdrop';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetWrapper = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const textInputRef = useRef<TextInput>(null);
  const [vendor, setVendor] = useState('');

  const snapPoints = useMemo(() => ['14%', '67%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);

    if(index === 0) textInputRef.current?.blur();
  }, []);

  const handleFocus = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

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
          <CustomBackdrop {...props}/>
        )}
      >
        <View style={styles.contentContainer}>
          <View style={styles.textInputContainer}>
            <Icon name="search" size={25} color={COLORS.tealwhite} style={styles.searchIcon} />
              <TextInput
                ref={textInputRef}
                placeholder='Lookup vendor ...' 
                placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
                value={vendor} 
                autoCapitalize='none' 
                onChangeText={(text) => setVendor(text)}
                color={COLORS.royalblue}
                onFocus={handleFocus}
                style={styles.textInput}
              />
          </View>        
        </View>
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
    borderRadius: 15,
    padding: 15,
    marginTop: 5,
    width: '100%',
    backgroundColor: COLORS.brightteal
  },
  searchIcon: {
    marginRight: 13,
  },
  textInput: {
    color: COLORS.white,
    flex: 1,
    fontSize: 17,
    marginLeft: 5,
  },
});

