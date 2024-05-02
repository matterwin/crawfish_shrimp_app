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
  { id: '1', title: 'Tiger Paw Grill & Daiquiris and drivers dine and in dfsd fd fs ', dist: '8.76', address: '13711 Coursey Blvd. Suite B', stars: '1', boilPrice: '4.32', livePrice: '' },
  { id: '2', title: 'Tiger Paw Grill & Daiquiris', dist: '5.76', address: '13711 Coursey Blvd. Suite B', stars: '2.0', boilPrice: '4.53', livePrice: '294.53' },
  { id: '3', title: 'Tiger Paw Grill & Daiquiris', dist: '4.76', address: '13711 COursey Blvd. Suite B', stars: '1.1', boilPrice: '4.3', livePrice: '4.53' },
  { id: '4', title: 'Tiger Paw Grill & Daiquiris', dist: '3.76', address: '13711 COursey Blvd. Suite B', stars: '3.0', boilPrice: '4.23', livePrice: '4.53' },
  { id: '5', title: 'Tiger Paw Grill & Daiquiris', dist: '2.75', address: '13711 COursey Blvd. Suite B', stars: '4.2', boilPrice: '4.23', livePrice: '4.53' },
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
          <View style={styles.priceTextView}>
            <Text style={{ color: COLORS.white, marginBottom: 20 }}>$</Text>
            <Text style={styles.priceText}>{item.boilPrice}</Text>
            <Text style={{ color: COLORS.white, marginBottom: -15 }}>/ lb</Text>
          </View>
          <View style={[styles.userAndDateUpdatedView, {marginBottom: 0}]}>
            <View style={styles.userAndUsernameView}>
              <View>
                <CircleUserContainer size={20} home={false}/>
              </View>
              <Text style={styles.usernameText} numberOfLines={1} ellipsizeMode="tail">jothnathenfdsfsd</Text>
            </View>
            <Text style={styles.lastUpdateText}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.detailsView}>
          <Text style={styles.titleText} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          <Text style={styles.addressText} numberOfLines={2} ellipsizeMode="tail">{item.address}</Text>
          <View style={styles.ratingAndDistView}>
            <View style={styles.ratingsView}>
              <Rating
                type='custom'
                ratingCount={item.stars}
                readonly
                tintColor={COLORS.tealwhite} 
                startingValue={item.stars}
                imageSize={20}
                ratingColor={COLORS.orange}
                ratingBackgroundColor={COLORS.grey}
                fractions={0}
              />
              <Text style={styles.ratingCountText}> 30</Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.distText}>{item.dist} mi</Text>
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
  },
  flatList: {
    flex: 1,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.tealwhite,
    height: 125,
    marginBottom: 10,
  },
  firstItem: {
    marginTop: 120,
  },
  lastItem: {
    marginBottom: 200,
  },
  priceView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    borderColor: COLORS.tealLight
  },
  titleText: {
    width: '90%',
    textAlign: 'left',
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  detailsView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70%',
    paddingHorizontal: 15
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: COLORS.white
  },
  userAndDateUpdatedView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    gap: -7
  },
  lastUpdateText: {
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.whiteDark
  },
  userAndUsernameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden',
    gap: -7
  },
  usernameText: {
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.green,
    maxWidth: 50
  },
  addressText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.whiteDark,
    maxWidth: '70%'
  },
  distText: {
    fontSize: 11,
    color: COLORS.white
  },
  descriptionView: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgba(50, 168, 98, 0.4)',
    borderRadius: '10%',
    borderColor: COLORS.green,
    borderWidth: 1,
    marginLeft: 'auto'
  },
  ratingAndDistView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:' 100%',
  },
  ratingsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingCountText: {
    fontSize: 11,
    color: COLORS.whiteDark
  },
  priceTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


