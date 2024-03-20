import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { COLORS } from '../constants';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const ProfileBottomSheetModal = ({ children }: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '100%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default ProfileBottomSheetModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
