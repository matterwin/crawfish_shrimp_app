import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { COLORS } from '../../constants/index.tsx';
import IconContainer from '../../components/iconContainers/IconContainer.tsx';
import { useNavigation } from '@react-navigation/native';
import CircleIconContainer from '../iconContainers/CircleIconContainer.tsx';
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CircleUserContainer from '../iconContainers/CircleUserContainer.tsx';
import { Rating } from 'react-native-ratings';

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
  { id: '1', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '43 mins ago' },
  { id: '2', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '3', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '4', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '5', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '6', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '7', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' },
  { id: '8', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' }
];

const ItemComponent = ({ item, isFirst, isLast, food }: { item: Item; isFirst: boolean; isLast: boolean }) => {

  return (
    <View style={[styles.rowContainer, { marginBottom: (isLast) ? 200 : 15 }]}>
      <View style={styles.rowAligned}>
        <View style={styles.leftView}>
          <CircleUserContainer size={30}/> 
                  <View style={styles.priceAndTimeView}>
          <Text style={styles.timeUpdateText}>{item.timeOfUpdate}</Text>
        </View>
        </View>
        <View style={styles.middleView}>
          <Text style={styles.labelText}>
            {item.user}
          </Text>
          <View>
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
          </View>
          <View style={styles.reviewTextBoxView}>
            <Text style={styles.reviewText}>Not a very good place in all hfdfszfdsfsdafsdafsdafsadfsadfsdfsdafsadfasdfonesty</Text>
          </View>
        </View>
      </View>
    </View>              
  );
};

const FlatListReviews = () => {
  const renderItem = ({ item, index }: { item: Item; index: number }) => (
    <ItemComponent item={item} isFirst={index === 0} isLast={index === DATA.length - 1} food={"crawfish"}/>
  );

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

export default FlatListReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%'
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 5,
    margin: 15,
    marginBottom: 0,
    width: '100%',
  },
  labelText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    fontSize: 17,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: COLORS.white
  },
  secondaryPriceText: {
    color: COLORS.white, 
    fontSize: 16
  },
  secondaryText: {
    color: COLORS.green, 
    fontSize: 16
  },
  timeUpdateText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
    fontSize: 11,
    textAlign: 'center'
  },
  priceAndTimeView: {

  },
  leftView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '15%',
  },
  middleView: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '85%',
  },
  reviewTextBoxView: {
    marginTop: 5,
    width: '85%',
  },
  reviewText: {
    color: COLORS.white,
    textAlign: 'left',

  },
  searchIcon: {
  },
});




