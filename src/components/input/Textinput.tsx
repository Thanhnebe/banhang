import { View, Text, TextInput, StyleSheet, StyleProp, ImageStyle, TextInputProps } from 'react-native'
import React from 'react'
import { Responsive } from '../../constant/Responsive'

type TextinputProps = {
    placeholder: string
    value: string
    onChangeText?: (text: string) => void
    secureTextEntry?: boolean
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'
    icon?: React.ReactNode;
    style?: StyleProp<ImageStyle>
    placeholderTextColor?: string;
    onPressIn?: () => void;
    autoFocus?: boolean;
    onEndEditing?: () => void;
    color?: string;
    disabled?: boolean;
    defaultValue?: string;
    editable?: boolean;
}

const InputCustom: React.FC<TextinputProps> = ({
    placeholder, placeholderTextColor, value,
    onChangeText, onPressIn, onEndEditing,
    secureTextEntry, keyboardType, icon, style,
    autoFocus, color, disabled, defaultValue, editable
}) => {
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', }, style]}>
            {icon && (
                <View style={styles.iconContainer}>
                    {icon}
                </View>
            )}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor={placeholderTextColor}
                style={{ padding: 8, fontSize: 17, color: color }}
                autoFocus={autoFocus}
                onEndEditing={onEndEditing}
                editable={editable}
                defaultValue={defaultValue}
                onPressIn={onPressIn}
            />
        </View>
    )
}

export default InputCustom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

// const InputCustom = forwardRef<TextInput, TextinputProps>(({
//     placeholder,
//     placeholderTextColor,
//     value,
//     onChangeText,
//     onPressIn,
//     onEndEditing,
//     secureTextEntry,
//     keyboardType,
//     icon,
//     style,
//     autoFocus,
//     color,
//     disabled,
//     defaultValue,
//     editable,
// }, ref) => {
//     return (
//         <View style={[{ flexDirection: 'row', alignItems: 'center', }, style]}>
//             {icon && (
//                 <View style={styles.iconContainer}>
//                     {icon}
//                 </View>
//             )}
//             <TextInput
//                 placeholder={placeholder}
//                 value={value}
//                 onChangeText={onChangeText}
//                 secureTextEntry={secureTextEntry}
//                 keyboardType={keyboardType}
//                 placeholderTextColor={placeholderTextColor}
//                 style={{ padding: 8, fontSize: 17, color: color }}
//                 autoFocus={autoFocus}
//                 onEndEditing={onEndEditing}
//                 editable={editable}
//                 defaultValue={defaultValue}
//                 onPressIn={onPressIn}
//                 ref={ref}
//             />
//         </View>
//     )
// })