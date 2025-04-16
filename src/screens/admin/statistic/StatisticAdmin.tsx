import { View, Text } from 'react-native';
import React from 'react';
import StyleStatisticAdmin from './StyleStatisticAdmin';
import { CustomHeader } from '../../../import/IndexComponent';
import { BarChart } from 'react-native-gifted-charts';
import { useGetCompareRevenueAdminQuery, useGetTopAdminProductQuery, useGetRevenueAdminQuery } from '../../../service/Api/Index.Order';

const StatisticAdmin: React.FC = () => {
  const { data: dataTopProduct } = useGetTopAdminProductQuery() as any;
  const { data: dataCompareRevenue } = useGetCompareRevenueAdminQuery() as any;

  // Tối ưu hóa việc gọi API cho các loại doanh thu
  const revenueTypes = ['daily', 'weekly', 'monthly', 'yearly'];

  // Sử dụng reduce để gộp các kết quả từ các API gọi khác nhau
  const revenueData = revenueTypes.reduce((acc, type) => {
    acc[type] = useGetRevenueAdminQuery(type)?.data;
    return acc;
  }, {} as Record<string, any>);

  // Truy cập dữ liệu từ đối tượng đã gộp
  const { daily: dataRevenueDaily, weekly: dataRevenueWeekly, monthly: dataRevenueMonthly, yearly: dataRevenueYearly } = revenueData;

  // Chuyển đổi dữ liệu doanh thu so sánh cho BarChart
  const formattedCompareRevenue = [
    { value: dataCompareRevenue?.data?.lastMonthRevenue || 0, label: 'Last Month', frontColor: 'blue' },
    { value: dataCompareRevenue?.data?.lastWeekRevenue || 0, label: 'Last Week', frontColor: 'green' },
    { value: dataCompareRevenue?.data?.lastYearRevenue || 0, label: 'Last Year', frontColor: 'orange' },
    { value: dataCompareRevenue?.data?.thisMonthRevenue || 0, label: 'This Month', frontColor: 'purple' },
    { value: dataCompareRevenue?.data?.thisWeekRevenue || 0, label: 'This Week', frontColor: 'red' },
    { value: dataCompareRevenue?.data?.thisYearRevenue || 0, label: 'This Year', frontColor: 'teal' },
    { value: dataCompareRevenue?.data?.todayRevenue || 0, label: 'Today', frontColor: 'yellow' },
    { value: dataCompareRevenue?.data?.yesterdayRevenue || 0, label: 'Yesterday', frontColor: 'pink' },
  ];

  // Hàm hiển thị giá trị doanh thu
  const renderRevenueData = (data: any, period: string) => {
    if (!data || !data.data) {
      return 'Không có dữ liệu';
    }

    // Trích xuất giá trị cụ thể mà bạn muốn hiển thị
    return `Doanh thu ${period}: ${data.data.totalRevenue || 0}`;
  };

  return (
    <View style={StyleStatisticAdmin.container}>
      <View style={StyleStatisticAdmin.viewheader}>
        <View style={StyleStatisticAdmin.headerTitle}>
          <CustomHeader title="Thống kê" color="red" />
        </View>
      </View>
      <View style={StyleStatisticAdmin.containerBody}>
        <View>
          {/* Hiển thị BarChart với dữ liệu doanh thu so sánh */}
          <BarChart
            data={formattedCompareRevenue}
            width={400}
            height={300}
            barWidth={30}
            showFractionalValues
            showYAxisIndices
            isAnimated
            isThreeD
          />

          {/* Hiển thị doanh thu theo từng khoảng thời gian */}
          <Text>{renderRevenueData(dataRevenueDaily, 'hàng ngày')}</Text>
          <Text>{renderRevenueData(dataRevenueWeekly, 'hàng tuần')}</Text>
          <Text>{renderRevenueData(dataRevenueMonthly, 'hàng tháng')}</Text>
          <Text>{renderRevenueData(dataRevenueYearly, 'hàng năm')}</Text>

          {/* Hiển thị sản phẩm top */}
          {dataTopProduct?.data && (
            <View>
              <Text>Top Product:</Text>
              {dataTopProduct.data.map((product: any) => (
                <Text key={product._id}>ID: {product._id} - Quantity: {product.quantity}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default StatisticAdmin;
