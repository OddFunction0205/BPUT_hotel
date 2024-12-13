<template>
  <q-page class="container">
    <h2 class="q-mb-md"><q-icon name="money" /> 结账</h2>
    
    <!-- 房间号输入框 -->
    <q-input filled v-model="roomNumber" label="房间号：" />
    <q-btn label="查询房间" icon="search" @click="queryRoom" class="q-mb-md" />
    <q-separator class="q-mt-md q-mb-md" />

    <!-- 账单表格 -->
    <q-table
      v-if="showBill"
      :rows="billItems"
      :columns="columns"
      binary-state-sort
      flat
      class="q-mt-md"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="item" :props="props">
            <q-icon :name="props.row.icon" /> {{ props.row.item }}
          </q-td>
          <q-td key="cost" :props="props">{{ props.row.cost }}</q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- 支付按钮 -->
    <q-btn label="立即支付" icon="payment" color="negative" @click="pay" class="full-width" v-if="showBill" />
  </q-page>
</template>

<script>
import CheckOut from '../models/Checkout';  // 引入 CheckOut 类

export default {
  name: 'CheckOut',
  data() {
    return {
      showBill: false,  // 是否显示账单
      roomNumber: '',   // 房间号
      billItems: [],    // 账单项目
      columns: [        // 表格列定义
        {
          name: 'item',
          required: true,
          label: '项目',
          align: 'left',
          field: 'item',
          icon: 'description'  // 设置默认图标
        },
        {
          name: 'cost',
          align: 'left',
          label: '费用',
          field: 'cost',
        },
      ],
      checkOutInstance: new CheckOut(),  // 创建 CheckOut 类的实例
    };
  },
  methods: {
    // 查询房间信息并生成账单
    queryRoom() {
      if (!this.roomNumber) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: '请输入房间号',
          icon: 'warning',
        });
        return;
      }

      // 模拟根据房间号查询入住信息和空调使用情况
      this.generateBill();
    },

    // 生成账单
    generateBill() {
      const stayDuration = this.calculateStayDuration(); // 计算入住天数
      const airConUsage = this.calculateAirConUsage(); // 计算空调使用次数

      // 根据模拟数据生成账单
      this.billItems = [
        { item: '房费', cost: `￥${stayDuration * 100}元`, icon: 'money' },
        { item: '空调使用费', cost: `￥${airConUsage * 20}元`, icon: 'ac_unit' },
        { item: '总计', cost: `￥${(stayDuration * 100) + (airConUsage * 20)}元`, icon: 'total' },
      ];

      this.showBill = true; // 显示账单
    },

    // 模拟计算入住天数
    calculateStayDuration() {
      // 实际应从后端获取，这里假设入住了3天
      return 3;
    },

    // 模拟计算空调使用次数
    calculateAirConUsage() {
      // 实际应从后端获取，这里假设使用了5次空调
      return 5;
    },

    // 退房方法
    async pay() {
      if (!this.roomNumber) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: '请输入房间号',
          icon: 'warning',
        });
        return;
      }

      // 设置退房信息
      this.checkOutInstance.setCheckOutInfo(this.roomNumber);

      // 调用 CheckOut 类的 checkout 方法
      try {
        await this.checkOutInstance.checkout('/api/checkout');
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: '退房成功！',
          icon: 'check',
        });
        this.showBill = false; // 支付完成后隐藏账单
      } catch (error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: '退房操作失败，请稍后再试',
          icon: 'error',
        });
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
body {
  font-family: 'KaiTi', '楷体', Arial, sans-serif; /* 调整字体为楷体 */
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}
</style>
