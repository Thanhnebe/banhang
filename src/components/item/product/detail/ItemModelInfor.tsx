import { View, Text } from 'react-native';
import { IndexStyles } from '../../../../import/IndexStyles';
import { DetailProductParams } from '../../../../model/entity/IndexProduct.entity';

interface Props {
  item?: DetailProductParams;
}

const ItemModelInfor = ({ item }: Props) => {
  return (
    <View style={IndexStyles.StyleBottomSheetModelDetail.container}>
      <View style={IndexStyles.StyleBottomSheetModelDetail.header}>
        <Text style={IndexStyles.StyleBottomSheetModelDetail.textitle}>Thông tin về máy</Text>
      </View>
      <View style={IndexStyles.StyleBottomSheetModelDetail.containerModel}>
        {item?.stock ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Số lượng</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.stock}</Text>
          </View>
        ) : null}
        <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
          <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Bảo hành</Text>
          <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>12 tháng</Text>
        </View>
        <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
          <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Thương hiệu</Text>
          <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.brand}</Text>
        </View>
        {item?.storage ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Bộ nhớ máy</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.storage}</Text>
          </View>
        ) : null}
        {item?.specifications.screen ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Màn hình</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.screen}</Text>
          </View>
        ) : null}
        {item?.specifications.battery ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Pin</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.battery}</Text>
          </View>
        ) : null}

        {item?.specifications.camera ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Camera</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.camera}</Text>
          </View>
        ) : null}
        {item?.specifications.processor ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Bộ xử lý</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.processor}</Text>
          </View>
        ) : null}
        {item?.specifications.weight ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Cân nặng</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.weight}</Text>
          </View>
        ) : null}
        {item?.specifications.dimensions ? (
          <View style={IndexStyles.StyleBottomSheetModelDetail.viewModel}>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>Kích thước</Text>
            <Text style={IndexStyles.StyleBottomSheetModelDetail.textModel}>{item?.specifications.dimensions}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ItemModelInfor;
