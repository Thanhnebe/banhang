import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { COLOR } from '../../constant/Colors';
import { Responsive } from '../../constant/Responsive';

type PickerCustomProps = {
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    options: string[];
    icon?: React.ReactNode;
    color?: string;
};

const PickerCustom: React.FC<PickerCustomProps> = ({ selectedValue, onValueChange, options, icon, color }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOptionPress = (itemValue: string) => {
        onValueChange(itemValue);
        setModalVisible(false);
    };
    return (
        <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
            {icon}
            <Text style={[styles.text, { color }]}>{selectedValue}</Text>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                transparent
                statusBarTranslucent
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

export default PickerCustom;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Responsive.wp(3),
        top: Responsive.hp(1),
        left: Responsive.wp(2),
    },
    text: {
        fontSize: 17,
        color: COLOR.REDONE,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        position: 'absolute',
        width: Responsive.wp(80),
        height: Responsive.hp(21),
        alignSelf: 'center',
        marginTop: Responsive.hp(55),
        backgroundColor: COLOR.REDONE,
        borderRadius: 10,
    },
    option: {
        padding: Responsive.hp(1.9),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 17,
        color: COLOR.WHITE,
    },

}); 
