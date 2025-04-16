import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import React, { useRef } from 'react'
import { Responsive } from '../../constant/Responsive'
import { COLOR } from '../../constant/Colors'

type VeriftyInputProps = {
    length: number,
    value: Array<string>,
    onChangeText: (value: Array<string>) => void,
    disabled?: boolean
}

const CustomVeriftyInput: React.FunctionComponent<VeriftyInputProps> = ({ length, value, onChangeText, disabled }) => {

    const inputRefs = useRef<Array<NonNullable<TextInput>>>([])

    const onChangeValue = (text: string, index: number) => {
        const newValue = value.map((item, valueIndex) => {
            if (valueIndex === index) {
                return text
            }
            return item
        })
        onChangeText(newValue)
    }

    const handleChangeText = (text: string, index: number) => {
        onChangeValue(text, index)
        if (text.length !== 0) {
            return inputRefs.current[index + 1]?.focus()
        }
        return inputRefs.current[index - 1]?.focus()
    }

    const handleBackspace = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        const { nativeEvent } = event
        if (nativeEvent.key === 'Backspace') {
            handleChangeText('', index)
        }
    }

    return (
        <View style={styles.container}>
            {[... new Array(length)].map((item, index) => (
                <TextInput
                    key={index}
                    ref={ref => {
                        if (ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref]
                        }
                    }}
                    style={styles.input}
                    maxLength={1}
                    contextMenuHidden={true}
                    selectTextOnFocus={true}
                    editable={!disabled}
                    keyboardType='decimal-pad'
                    testID={`OTPInput-${index}`}
                    value={value[index]}
                    onChangeText={text => handleChangeText(text, index)}
                    onKeyPress={event => handleBackspace(event, index)}
                />
            ))}
        </View>
    );
}

export default CustomVeriftyInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Responsive.hp(5),
    },
    input: {
        width: Responsive.wp(15),
        height: Responsive.hp(8),
        borderWidth: 2,
        borderColor: COLOR.BLACKONE,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: Responsive.RFPercentage(2.5),
    }
})