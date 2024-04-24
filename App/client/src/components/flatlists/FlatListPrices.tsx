import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { COLORS } from '../../constants/index.tsx';
import IconContainer from '../../components/iconContainers/IconContainer.tsx';
import { useNavigation } from '@react-navigation/native';
import CircleIconContainer from '../iconContainers/CircleIconContainer.tsx';
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

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
  { id: '2', user: 'm3ttwin', userProf: 'url', price: '4.53', timeOfUpdate: '4 secs ago' }
];

const ItemComponent = ({ item, isFirst, isLast, food }: { item: Item; isFirst: boolean; isLast: boolean }) => {

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowAligned}>
        <View>
          <CircleIconContainer food={food} />
        </View>
        <View>
          <Text style={styles.labelText}>
            {item.user}
          </Text>
        </View>
      </View>
      <View style={styles.priceAndTimeView}>
        <Text style={styles.priceText}>
          {item.price}
        </Text>
        <Text style={styles.timeUpdateText}>{item.timeOfUpdate}</Text>
      </View>    
    </View>              
  );
};

const FlatListPrices = () => {
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

export default FlatListPrices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 90,
    paddingBottom: 100
  },
  flatList: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15
  },
  secondRowContainer: {
    marginTop: 0,
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
    fontSize: 14,
  },
  priceAndTimeView: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
});



