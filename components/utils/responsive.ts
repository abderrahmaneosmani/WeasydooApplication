import {Dimensions} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export {wp, hp};
const {width} = Dimensions.get('window');
export const isTablet = width >= 768;
