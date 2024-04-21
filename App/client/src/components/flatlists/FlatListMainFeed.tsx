import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { COLORS } from '../../constants/index.tsx';
import IconContainer from '../../components/iconContainers/IconContainer.tsx';
import { useNavigation } from '@react-navigation/native';

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
  { id: '1', title: 'Tiger Paw Grill & Daiquiris and drivers dine and in', dist: '8.76', address: '13711 COursey Blvd. Suite B', stars: '4.50', boilPrice: '4.32', livePrice: '' },
  { id: '2', title: 'Tiger Paw Grill & Daiquiris', dist: '5.76', address: '13711 COursey Blvd. Suite B', stars: '2.0', boilPrice: '4.53', livePrice: '294.53' },
  { id: '3', title: 'Tiger Paw Grill & Daiquiris', dist: '4.76', address: '13711 COursey Blvd. Suite B', stars: '1.1', boilPrice: '4.3', livePrice: '4.53' },
  { id: '4', title: 'Tiger Paw Grill & Daiquiris', dist: '3.76', address: '13711 COursey Blvd. Suite B', stars: '3.0', boilPrice: '4.23', livePrice: '4.53' },
  { id: '5', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.23', livePrice: '4.53' },
  { id: '6', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.43', livePrice: '4.53' },
  { id: '7', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '1.33', livePrice: '4.53' },
  { id: '8', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '2.53', livePrice: '4.53' },
  { id: '9', title: 'Tiger Paw Grill & Daiquiris', dist: '2.76', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '3.53', livePrice: '' }
];


const BoxPrice = ({ price, priceType }: { price?: string; priceType: 'Boiled' | 'Live' }) => {
  const formattedPrice = price !== '' ? `${price}` : 'N/A';

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
      <View style={styles.boxPriceView}>
        <View style={styles.boxTextPriceView}>
          <Text style={styles.priceText}>{formattedPrice}</Text>
        </View>
      </View>
      <View style={styles.priceTypeView}>
        <View>
          <Text style={{ fontSize: 13 }}>{priceType}</Text>
        </View>
      </View>
    </View>
  );
};


const ItemComponent = ({ item, isFirst, isLast }: { item: Item; isFirst: boolean; isLast: boolean }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('VendorNav', { selectedItem: item });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.item, isFirst && styles.firstItem, isLast && styles.lastItem]}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.descriptionView}>
          <Text style={{ color: 'white' }}>{`${item.dist} mi`}</Text>
        </View>
        <View style={styles.detailsView}>
          <View style={styles.itemDetailsView}>
            <Text style={styles.infoText}>{`${item.stars}/5`}</Text>
            <Text style={styles.infoText}>{`${item.address}`}</Text>
          </View>
          <View style={styles.backgroundContainer}>
            <View style={styles.iconContainer}>
              <IconContainer  />
            </View>
            <View style={styles.boxPricesContainer}>
              <View style={styles.boxPricesItemView}>
                <BoxPrice price={item.boilPrice} priceType="Boiled" />
                <BoxPrice price={item.livePrice} priceType="Live" />
              </View>
              <View style={styles.descriptionView}>
                <Text style={{ color: 'white' }}>Small</Text>
              </View>
            </View>
          </View>
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
    // paddingTop: 90,
    paddingBottom: 100
  },
  flatList: {
    flex: 1,
  },
  item: {
    backgroundColor: COLORS.tealwhite,
    padding: 20,
    borderBottomWidth: 1,
    // paddingBottom: 50,
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
    color: 'white',
    width: '70%',
    paddingBottom: 5,
  },
  detailsView: {
    paddingVertical: 20,
    // marginLeft: 50,
    // marginRight: 50,
    flexDirection: 'row',
    alignItems: 'space-evenly',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
  },
  itemDetailsView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '50%'
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
  boxPricesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'flex-start',
  },
  descriptionView: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgba(50, 168, 98, 0.4)',
    borderRadius: '10%',
    borderColor: COLORS.green,
    borderWidth: 1,
    // width: '30%'
  },
  priceTypeView: {
    backgroundColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  boxPricesItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'center',
  },
  priceText: {
    color: COLORS.deepgreen,
    fontSize: 16
  },
  backgroundContainer: {
    position: 'relative',
    width: '50%',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: -50,
    zIndex: -1,  
  },
  infoText: {
    color: COLORS.white,
  },
});


