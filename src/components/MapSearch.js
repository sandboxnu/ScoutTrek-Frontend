import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import ENV from '../../helpers/env';

import Colors from '../../constants/Colors';

const SearchBar = ({locationToken, back, placeholder, _getPlaceDetails}) => {
  const [suggestedPlaces, setSuggestedPlaces] = useState();
  const [searchText, setSearchText] = useState('');

  const getSuggestedPlaces = async () => {
    const places = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText.replace(
        / /g,
        '+'
      )}&key=${ENV.googleApiKey}&sessiontoken=${locationToken}`
    ).catch(err => console.log(err));
    const placesData = await places.json();
    setSuggestedPlaces(placesData.predictions);
  };

  const searchUpdateHandler = value => {
    setSearchText(value);
    if (searchText.length > 1) {
      getSuggestedPlaces();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          style={styles.searchBar}
          onChangeText={searchUpdateHandler}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderTextColor}
          autoFocus
        />
        <Ionicons
          name="ios-arrow-back"
          color={Colors.darkBrown}
          style={styles.backIcon}
          size={23}
          onPress={back}
        />
      </View>
      <View>
        {suggestedPlaces &&
          suggestedPlaces.map(place => (
            <TouchableOpacity
              key={place.id}
              onPress={() => {
                setSearchText('');
                setSuggestedPlaces(null);
                _getPlaceDetails(
                  suggestedPlaces.find(({id}) => id === place.id).place_id
                );
              }}
              style={styles.suggestedPlace}>
              <Text style={styles.suggestedPlaceText}>{place.description}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  suggestedPlaceText: {
    fontFamily: 'oxygen',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },
  suggestedPlace: {
    flex: 1,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
  },
  searchBar: {
    paddingHorizontal: '15%',
    height: 60,
    width: '100%',
    padding: 5,
    fontSize: 15,
    fontFamily: 'oxygen-bold',
  },
  searchIcon: {
    position: 'absolute',
    right: '4%',
    top: 19,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    position: 'absolute',
    left: '2%',
    top: 7.5,
  },
});

export default SearchBar;
