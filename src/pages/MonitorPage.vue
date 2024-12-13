<template>
  <div class="container">
    <!-- 导航栏 -->
    <div class="button-group">
      <button @click="changeReportPeriod('daily')" :class="{'active': reportPeriod === 'daily'}">日报</button>
      <button @click="changeReportPeriod('weekly')" :class="{'active': reportPeriod === 'weekly'}">周报</button>
    </div>

    <!-- 表格部分 -->
    <table v-if="reportData.length > 0" class="data-table">
      <thead>
        <tr>
          <th>房间号</th>
          <th>开关次数</th>
          <th>调度次数</th>
          <th>详单条数</th>
          <th>调温次数</th>
          <th>调风次数</th>
          <th>请求时长</th>
          <th>总费用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in reportData" :key="row.room">
          <td>{{ row.room }}</td>
          <td>{{ row.switchCount }}</td>
          <td>{{ row.dispatchCount }}</td>
          <td>{{ row.detailCount }}</td>
          <td>{{ row.temperatureChangeCount }}</td>
          <td>{{ row.fanSpeedChangeCount }}</td>
          <td>{{ row.duration }}分钟</td>
          <td>{{ row.totalCost }}元</td>
        </tr>
      </tbody>
    </table>

    <!-- 报表图表部分 -->
    <div v-if="reportData.length > 0" class="chart-container">
      <button @click="viewChart('line')">折线图</button>
      <button @click="viewChart('pie')">饼图</button>
      <!-- 使用 canvas 元素 -->
      <canvas ref="chartContainer" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js'; // 引入 Chart.js
import AirConReport from '../models/Monitor';  // 引入 AirConReport 类

export default {
  name: 'MonitorPage',
  data() {
    return {
      reportPeriod: 'daily', // 默认为日报
      reportData: [], // 存储报表数据
      columns: [
        { name: 'room', label: '房间号', field: 'room' },
        { name: 'switchCount', label: '开关次数', field: 'switchCount' },
        { name: 'dispatchCount', label: '调度次数', field: 'dispatchCount' },
        { name: 'detailCount', label: '详单条数', field: 'detailCount' },
        { name: 'temperatureChangeCount', label: '调温次数', field: 'temperatureChangeCount' },
        { name: 'fanSpeedChangeCount', label: '调风次数', field: 'fanSpeedChangeCount' },
        { name: 'duration', label: '请求时长', field: 'duration' },
        { name: 'totalCost', label: '总费用', field: 'totalCost' },
      ],
      airConReportInstance: new AirConReport(), // 创建 AirConReport 类的实例
    };
  },
  methods: {
    // 切换日报和周报
    changeReportPeriod(period) {
      this.reportPeriod = period;
      this.fetchReportData(); // 切换周期后重新获取数据
    },

    // 获取报表数据
    async fetchReportData() {
      this.airConReportInstance.setPeriod(this.reportPeriod);  // 设置报表周期
      try {
        await this.airConReportInstance.getAirConReport('/api/aircon/report');
        // 假设后端返回的数据显示在 console 里
        // 请根据返回的数据格式更新 reportData
        const data = this.airConReportInstance.data || []; // 假设数据存储在 this.airConReportInstance.data 中
        this.reportData = data; // 更新报表数据
      } catch (error) {
        console.error("报表数据获取失败:", error);
      }
    },

    // 查看图表
    viewChart(type = 'line') {
      const ctx = this.$refs.chartContainer.getContext('2d');
      const data = {
        labels: this.reportData.map(item => item.room), // 房间号作为x轴标签
        datasets: [
          {
            label: '总费用',
            data: this.reportData.map(item => item.totalCost), // 总费用作为y轴数据
            borderColor: '#ff6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
          },
        ],
      };

      // 清除之前的图表
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // 根据类型展示图表
      if (type === 'line') {
        this.chartInstance = new Chart(ctx, {
          type: 'line',
          data: data,
        });
      } else if (type === 'pie') {
        this.chartInstance = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.reportData.map(item => item.room),
            datasets: [
              {
                data: this.reportData.map(item => item.totalCost),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
              },
            ],
          },
        });
      }
    },
  },
  mounted() {
    this.fetchReportData(); // 页面加载时调用一次获取数据的方法
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button.active {
  background-color: #0056b3;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th, table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}

.chart-container {
  text-align: center;
}

.chart {
  max-width: 600px;
  margin: 0 auto;
}
</style>
