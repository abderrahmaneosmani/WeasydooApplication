import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from './utils/colors';
import {isTablet, wp} from './utils/responsive';

const Search = ({searchQuery, handleSearchChange}: any) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search a products..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    width: isTablet ? wp('50%') : wp('60%'),
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default Search;
