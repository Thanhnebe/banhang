import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { COLOR } from '../../constant/Colors';

interface Props {
  loading: boolean;
  onCancel?: () => void;
  color?: string;
  opacityColor?: string;
}

const Loading: React.FC<Props> = (props) => {
  const { loading, onCancel, opacityColor, color } = props;
  return (
    <Modal
      visible={loading}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: opacityColor || 'rgba(0, 0, 0, 0)',
        }}
      >
        <ActivityIndicator size="large" color={color || COLOR.BLACK} />
      </View>
    </Modal>
  );
};

export default Loading;
