import { View, TouchableOpacity, Text, StyleProp } from 'react-native';
import { COLOR } from '../../constant/Colors';
import IconCheck from '../../assets/svg/check.svg';
import { Responsive } from '../../constant/Responsive';

interface CustomCheckboxProps {
    checked: boolean;
    onPress: () => void;
    title?: string;
    disabled?: boolean;
    style?: StyleProp<any>;
}

const CustomCheckBox: React.FC<CustomCheckboxProps> = ({ checked, onPress, title, disabled, style }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: checked ? COLOR.PRIMARY : COLOR.GRAY,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: checked ? COLOR.PRIMARY : COLOR.WHITE,
                    ...style
                }}>
                    {checked && <IconCheck width={12} height={12} fill={COLOR.WHITE} />}
                </View>
                {title && <Text style={{ marginLeft: 10, fontSize: 16, color: COLOR.BLACK }}>{title}</Text>}
            </View>
        </TouchableOpacity>
    );
};

export default CustomCheckBox


