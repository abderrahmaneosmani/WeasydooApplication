import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {COLORS} from './utils/colors';
import {isTablet, wp} from './utils/responsive';

const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: any) => {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories &&
          categories?.map((category: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem,
              ]}
              onPress={() => onSelectCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.categoryItemSelectedText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    width: isTablet ? wp('40%') : wp('100%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryItem: {
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.yellow,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  categoryItemSelectedText: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default CategoryFilter;
