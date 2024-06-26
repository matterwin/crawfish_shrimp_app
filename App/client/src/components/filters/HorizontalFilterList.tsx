import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/index.tsx';

interface Filter {
  id: string;
  title: string;
}

interface Props {
  selectedFilter: string | null;
  onSelectFilter: (filterId: string) => void;
}

const filtersData: Filter[] = [
  { id: '1', title: 'Boiled' },
  { id: '2', title: 'Live' },
  { id: '3', title: 'Distance' },
  { id: '4', title: 'Price' },
  { id: '5', title: 'Rating' },
];

const HorizontalFilterList: React.FC<Props> = ({ selectedFilter, onSelectFilter }) => {
  const renderItem = ({ item }: { item: Filter }) => (
    <TouchableOpacity
      style={[styles.item, selectedFilter === item.id && styles.selectedItem]}
      onPress={() => onSelectFilter(item.id)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filtersData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default HorizontalFilterList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
    backgroundColor: 'rgba(120, 167, 176, 0.5)',
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginHorizontal: 5,
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 15
  },
  selectedItem: {
    backgroundColor: COLORS.orange
  },
  itemText: {
    fontSize: 17,
    color: COLORS.white
  },
});


