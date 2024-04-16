import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Item = {
  id: string;
  title: string;
};

const DATA: Item[] = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

const ItemComponent = ({ title }: { title: string }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const FlatListMainFeed = () => {
  const renderItem = ({ item }: { item: Item }) => <ItemComponent title={item.title} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default FlatListMainFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
  },
  flatList: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});


