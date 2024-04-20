import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const BottomSheetVendor = ({ children, selectedItem }: Props & { selectedItem: Item }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapIndex, setSnapIndex] = useState(0);
  const [item, setItem] = useState(selectedItem);

  const snapPoints = useMemo(() => ['13%', '70%', '85%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      {children} 
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{ marginBottom: 0, borderRadius: 15 }}
        backgroundStyle={{ backgroundColor: COLORS.teal, borderRadius: 15, borderWidth: 1, borderColor: COLORS.tealwhite }}
        handleIndicatorStyle={{ backgroundColor: COLORS.brightteal, width: 60, height: 5 }} 
      >
        <View style={styles.sheetContainer}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetVendor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sheetContainer: {
    flex: 1,
    margin: 15,
    marginTop: 5,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWarp: 'wrap',
  },
  titleText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 18,
    width: '90%',
    textAlign: 'center'
  },
});


