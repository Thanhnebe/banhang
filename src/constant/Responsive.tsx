import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export class Responsive {
    static readonly wp = (width: number) => wp(width);
    static readonly hp = (height: number) => hp(height);
    static readonly RFPercentage = (size: number) => RFPercentage(size);
    static readonly RFValue = (size: number) => RFValue(size);
}
