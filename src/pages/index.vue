<template>
  <el-input
    v-model="searchText"
    placeholder="请输入您想搜索的视频名称，回车默认按影视名搜索"
    clearable
    :suffix-icon="Search"
    @keydown.enter="enter"
  />
  <router-view></router-view>
</template>

<script setup lang="ts">
  import http from "../utils";
  import { ref, reactive } from "vue";
  import {  Search } from '@element-plus/icons-vue'
  import {useRouter} from 'vue-router'
  //输入框数据
  let searchText = ref("");
  //路由
  const router = useRouter()
  //回车和搜索事件
  let enter = ()=>{
    router.push('/searchDetail?key=' + searchText.value)
  }
</script>

<style scoped></style>
