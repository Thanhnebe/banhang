import { View, Text, StyleSheet, Animated } from 'react-native';
import React from 'react';
import { COLOR } from '../../constant/Colors';
import { Responsive } from '../../constant/Responsive';

interface PaginationsProps {
  data: any[];
  scrollx: any;
}

const Paginations: React.FC<PaginationsProps> = ({ data, scrollx }) => {
  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * Responsive.wp(100),
          index * Responsive.wp(100),
          (index + 1) * Responsive.wp(100),
        ];
        const dotWidth = scrollx.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: Responsive.hp(0.3),
    borderRadius: 4,
    backgroundColor: COLOR.BLACK,
    marginHorizontal: 4,
    top: Responsive.hp(2),
  },
});

export default Paginations;
