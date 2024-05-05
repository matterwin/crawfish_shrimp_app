import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/index.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizontalFilterList from './HorizontalFilterList';

const FilterBar = ({setModalVisible, snapToIndex}) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectFilter = (filterId) => {
    setSelectedFilter(filterId);
  };

  const handlePress = () => {
    snapToIndex?.(1);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.iconContainer}>
        <Icon name={'location-sharp'} size={35} color={COLORS.white} />
      </Pressable>
      <View style={styles.iconContainer}>
        <Icon name={'layers'} size={35} color={COLORS.white} />
      </View>
      <View style={styles.filterContainer}>
        <HorizontalFilterList
          selectedFilter={selectedFilter}
          onSelectFilter={handleSelectFilter}
        />
      </View>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    margin: 15,
    gap: 10,
  },
  filterContainer: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(120, 167, 176, 0.5)',
    borderWidth: 1,
    borderColor: COLORS.grey,
    minHeight: 40
  },
});

