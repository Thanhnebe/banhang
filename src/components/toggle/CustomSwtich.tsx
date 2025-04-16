import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Responsive } from '../../constant/Responsive';
import { COLOR } from '../../constant/Colors';

interface CustomSwtichProps {
    value: boolean,
    onChange: (value: boolean) => void
}

const CustomSwtich: React.FC<CustomSwtichProps> = ({ value, onChange }) => {
    const [state, setState] = useState<boolean>(value)
    const [move] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(move, {
            toValue: state ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start()
    }, [state])

    const onPress = () => {
        setState(!state)
        onChange(!state)
    }

    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: state ? 'green' : '#d3d3d3' }]} onPress={onPress}>
            <Animated.View style={[styles.circle, { left: move.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }) }]} />
        </TouchableOpacity>
    )
}

export default CustomSwtich;

const styles = StyleSheet.create({
    container: {
        width: Responsive.wp(12),
        height: Responsive.wp(6.8),
        borderRadius: Responsive.wp(3.25),
        backgroundColor: COLOR.GRAY,
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    circle: {
        width: Responsive.wp(5),
        height: Responsive.wp(5),
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        marginLeft: Responsive.wp(1)
    }
})