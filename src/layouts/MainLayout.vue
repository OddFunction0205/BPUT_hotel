<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          BUPT大酒店
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          功能列表
        </q-item-label>

        <q-item clickable v-ripple to="/home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>回到首页</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/control">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>控制面板</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/check-in">
          <q-item-section avatar>
            <q-icon name="hotel" />
          </q-item-section>
          <q-item-section>
            <q-item-label>入住界面</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/check-out">
          <q-item-section avatar>
            <q-icon name="money" />
          </q-item-section>
          <q-item-section>
            <q-item-label>结账界面</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/monitoring">
          <q-item-section avatar>
            <q-icon name="remove_red_eye" />
          </q-item-section>
          <q-item-section>
            <q-item-label>监控界面</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>