import React, { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from 'react-native';

type CustomBackdropProps = BottomSheetBackdropProps & {
    onClose: () => void;
};

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ animatedIndex, style, onClose }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
        display: animatedIndex.value > 0 ? 'flex' : 'none',
    }));

    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute' as const,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <Animated.View style={containerStyle} />
        </TouchableWithoutFeedback>
    );
};

export default CustomBackdrop;
