import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/index.tsx';

type Item = {
  id: string;
  title: string;
  dist: string;
  address: string;
  stars: string;
  boilPrice?: string;
  livePrice?: string;
};

const DATA: Item[] = [
  { id: '1', title: 'Tiger Paw Grill & Daiquiris', dist: '8.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.5', boilPrice: '4.32', livePrice: '' },
  { id: '2', title: 'Tiger Paw Grill & Daiquiris', dist: '5.76 mi', address: '13711 COursey Blvd. Suite B', stars: '2.0', boilPrice: '4.53', livePrice: '294.53' },
  { id: '3', title: 'Tiger Paw Grill & Daiquiris', dist: '4.76 mi', address: '13711 COursey Blvd. Suite B', stars: '1.1', boilPrice: '4.3', livePrice: '4.53' },
  { id: '4', title: 'Tiger Paw Grill & Daiquiris', dist: '3.76 mi', address: '13711 COursey Blvd. Suite B', stars: '3.0', boilPrice: '4.23', livePrice: '4.53' },
  { id: '5', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.23', livePrice: '4.53' },
  { id: '6', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.43', livePrice: '4.53' },
  { id: '7', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '1.33', livePrice: '4.53' },
  { id: '8', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '2.53', livePrice: '4.53' },
  { id: '9', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76 mi', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '3.53', livePrice: '' }
];


const BoxPrice = ({ price, priceType }: { price?: string; priceType: 'Boil' | 'Live' }) => {
  const formattedPrice = price !== '' ? `${price}` : 'N/A';

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
      <View style={styles.boxPriceView}>
        <View style={styles.boxTextPriceView}>
          <Text style={styles.priceText}>{formattedPrice}</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#ccc', width: '100%', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <View>
          <Text style={{ fontSize: 13 }}>{priceType}</Text>
        </View>
      </View>
    </View>
  );
};


const ItemComponent = ({ item, isFirst, isLast }: { item: Item; isFirst: boolean; isLast: boolean }) => (
  <View style={[styles.item, isFirst && styles.firstItem, isLast && styles.lastItem]}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={styles.detailsView}>
      <View style={styles.itemDetailsView}>
        <Text>{`Distance: ${item.dist}`}</Text>
        <Text>{`Stars: ${item.stars}`}</Text>
        <Text>{`Address: ${item.address}`}</Text>
      </View>
      <View style={styles.boxPricesItemView}>
        <BoxPrice price={item.boilPrice} priceType="Boil" />
        <BoxPrice price={item.livePrice} priceType="Live" />
      </View>
    </View>
  </View>
);

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
    // paddingTop: 90,
    paddingBottom: 100
  },
  flatList: {
    flex: 1,
  },
  item: {
    backgroundColor: 'transparent',
    padding: 20,
    // marginVertical: 8,
    borderBottomWidth: 1,
    paddingBottom: 50,
    borderColor: COLORS.teal
  },
  firstItem: {
    marginTop: 90,  
  },
  lastItem: {
    marginBottom: 120,  
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  detailsView: {
    padding: 20,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemDetailsView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  boxPriceView: {
    width: 60,
    height: 60,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  boxTextPriceView: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxPricesItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-end',
  },
  priceText: {
    color: COLORS.deepgreen,
    fontSize: 16
  },
});


