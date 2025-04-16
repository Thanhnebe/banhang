import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { COLOR } from '../../constant/Colors';
import { Responsive } from '../../constant/Responsive';

interface CustomAirbnbRatingProps {
    reviews: string[];
    rating: number;
    setRating?: (value: number) => void;
    size?: number;
}

const CustomAirbnbRating: React.FC<CustomAirbnbRatingProps> = ({ reviews, rating, setRating, size, ...props }) => {

    const handleRatingCompleted = (value: number) => {
        if (setRating) {
            setRating(value);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.reviewsContainer}>
                <AirbnbRating
                    count={5}
                    reviews={[]}
                    defaultRating={5}
                    size={size || Responsive.wp(10)}
                    {...props}
                    showRating={false}
                    onFinishRating={handleRatingCompleted}
                />
                {rating > 0 && (
                    <View>
                        <View style={styles.reviewItem}>
                            <Text style={styles.reviewText}>{reviews[rating - 1]}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    reviewsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(2),
    },
    reviewItem: {
    },
    reviewText: {
        fontSize: Responsive.RFPercentage(2.2),
        color: COLOR.YELLOW,
        fontWeight: 'bold',
    },
});

export default CustomAirbnbRating;
