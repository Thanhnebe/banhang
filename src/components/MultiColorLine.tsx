import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MultiColorLine = () => {
    const colors = ['#f72541', '#1c8dea', '#f72541', '#1c8dea', '#f72541', '#1c8dea', '#f72541', '#1c8dea',];
    return (
        <View>
            <View style={styles.line}>
                {colors.map((color, index) => (
                    <View key={index} style={[styles.segment, { backgroundColor: color }]} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        height: 4,
        width: '100%',
        gap: 5,
    },
    segment: {
        flex: 1,
    },
});


export default MultiColorLine