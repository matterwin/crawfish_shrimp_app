import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';



const BottomSheetWrapper = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['7%', '67%', '93%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}

      >
        <View style={styles.contentContainer}>
          <Text style={styles.foldersTitle}>Folders</Text>
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
  foldersTitle: {
    color: "grey",
    fontWeight: '900',
    fontSize: 20,
  }
});


