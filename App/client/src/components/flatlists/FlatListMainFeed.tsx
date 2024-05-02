import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { COLORS } from '../../constants/index.tsx';
import IconContainer from '../../components/iconContainers/IconContainer.tsx';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import CircleUserContainer from '../iconContainers/CircleUserContainer.tsx';

type Item = {
  id: string;
  title: string;
  dist: string;
  address: string;
  stars: string;
  boilPrice?: string;
  livePrice?: string;
  size: string;
};

const DATA: Item[] = [
  { id: '1', title: 'Tiger Paw Grill & Daiquiris and drivers dine and in', dist: '8.76', address: '13711 Coursey Blvd. Suite B', stars: '4.50', boilPrice: '4.32', livePrice: '' },
  { id: '2', title: 'Tiger Paw Grill & Daiquiris', dist: '5.76', address: '13711 Coursey Blvd. Suite B', stars: '2.0', boilPrice: '4.53', livePrice: '294.53' },
  { id: '3', title: 'Tiger Paw Grill & Daiquiris', dist: '4.76', address: '13711 COursey Blvd. Suite B', stars: '1.1', boilPrice: '4.3', livePrice: '4.53' },
  { id: '4', title: 'Tiger Paw Grill & Daiquiris', dist: '3.76', address: '13711 COursey Blvd. Suite B', stars: '3.0', boilPrice: '4.23', livePrice: '4.53' },
  { id: '5', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.23', livePrice: '4.53' },
  { id: '6', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.43', livePrice: '4.53' },
  { id: '7', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '1.33', livePrice: '4.53' },
  { id: '8', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '2.53', livePrice: '4.53' },
  { id: '9', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '3.53', livePrice: '' }
];

const ItemComponent = ({ item, isFirst, isLast }: { item: Item; isFirst: boolean; isLast: boolean }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('VendorNav', { selectedItem: item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.item, isFirst && styles.firstItem, isLast && styles.lastItem]}>
        <View style={[styles.priceView, { borderRightWidth: 1 }]}>
          <Text style={styles.priceText}>{item.boilPrice}</Text>
          <View style={styles.userAndDateUpdatedView}>
            <CircleUserContainer />
            <Text>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text>{item.address}</Text>
          <Rating
            type='custom'
            ratingCount={item.stars}
            readonly
            tintColor={COLORS.teal} 
            startingValue={3}
            imageSize={30}
            ratingColor={COLORS.green}
            ratingBackgroundColor={COLORS.teal}
          />
        </View>
        <View style={[styles.priceView, { borderLeftWidth: 1 }]}>
          <Text style={styles.priceText}>{item.boilPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FlatListMainFeed = () => {
  const renderItem = ({ item, index }: { item: Item; index: number }) => (
    <ItemComponent item={item} isFirst={index === 0} isLast={index === DATA.length - 1} />
  );

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
  },
  flatList: {
    flex: 1,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.tealwhite,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 150,
    marginBottom: 30,
  },
  firstItem: {
    marginTop: 130,
    borderTopWidth: 1,
  },
  lastItem: {
    marginBottom: 120,
  },
  priceView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  titleText: {
    width: '90%',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 15
  },
  detailsView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%'
  },
   priceText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.white
  },
  userAndDateUpdatedView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 2
  },
});


