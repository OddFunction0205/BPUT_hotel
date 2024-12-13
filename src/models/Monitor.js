import { API_ENDPOINT } from '../models/config';  // 引入配置文件

export default class AirConReport {
  constructor() {
    this.period = '';  // 报表周期 ('daily' 或 'weekly')
  }

  // 获取空调报表数据接口
  async getAirConReport(apiPath) {
    const apiUrl = `${API_ENDPOINT}${apiPath}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          period: this.period,  // 报表周期
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('空调报表数据获取成功:', data);
        
        // 处理返回的数据
        if (data && data.data) {
          console.log('报表数据:', data.data);
        } else {
          console.error('空调报表数据为空');
        }
      } else {
        console.error('请求失败:', response.statusText);
      }
    } catch (error) {
      console.error('请求发生错误:', error);
    }
  }

  // 设置报表周期信息
  setPeriod(period) {
    if (period === 'daily' || period === 'weekly') {
      this.period = period;
    } else {
      console.error('无效的报表周期');
    }
  }
}
