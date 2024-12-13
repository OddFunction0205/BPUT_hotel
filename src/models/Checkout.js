import { API_ENDPOINT } from '../models/config';  // 引入配置文件

export default class CheckOut {
  constructor() {
    this.room_id = '';         // 房间号
  }

  // 退房接口
  async checkout(apiPath) {
    const apiUrl = `${API_ENDPOINT}${apiPath}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: this.room_id,  // 房间号
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('退房成功:', data);

        // 处理返回结果
        if (data.msg === '退住成功') {
          console.log(`入住天数：${data.stayDuration}天`);
          console.log(`空调使用次数：${data.airConUsage}次`);
        } else {
          console.error('退房失败:', data.msg);
        }
      } else {
        console.error('请求失败:', response.statusText);
      }
    } catch (error) {
      console.error('请求发生错误:', error);
    }
  }

  // 设置退房信息
  setCheckOutInfo(room_id) {
    this.room_id = room_id;
  }
}
