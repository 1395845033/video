<template>
  <div v-loading="loading">
    <div class="item" v-for="item in searchList" :key="item.videoId">
      <el-image
        style="width: 150px; height: 225px"
        :src="item.cover"
      ></el-image>
      <div class="item-right">
        <p>名称 : {{ item.title }}</p>
        <p>导演 : {{ item.director }}</p>
        <p class="text">主演 : {{ item.actor }}</p>
        <p>
          分类 : {{ item.videoType }} 地区 : {{ item.region }} 年份 :
          {{ item.releaseTime }}
        </p>
        <p class="text">简介 : {{ item.descs.trim() }}</p>
        <el-button type="success" @click="videoPlay(item.videoId)"
          >立即播放</el-button
        >
      </div>
    </div>
    <el-pagination
      class="pagination"
      v-if="onOff"
      layout="prev, pager, next"
      :total="count"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    />
    <el-empty v-if="!searchList.length" description="暂无数据" />
    <el-backtop :right="20" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
  import http from "../utils";
  import { onMounted, ref, reactive } from "vue";
  import { useRoute, useRouter } from "vue-router";
  //当前页数
  let from = 1;
  //总条数
  let count = ref(0);
  //搜索到的数据
  let searchList: any = reactive([]);
  //路由传参
  const { query } = useRoute();
  //路由跳转
  const router = useRouter();
  //加载中
  let loading = ref<boolean>(true);
  //是否显示分页栏
  let onOff = ref<boolean>(false);
  onMounted(() => {
    getSearchList();
  });
  //请求搜索数据
  let getSearchList = async () => {
    let { data }: any = await http.get(
      `/video/search/${query.actor ? query.actor : "title"}/${
        query.key
      }/${from}/10`
    );
    if (searchList.length) searchList.splice(0, searchList.length);
    loading.value = false;
    searchList.push(...data.data);
    count.value = data.count;
    onOff.value = count.value > 9;
  };
  //改变页数
  const currentChange = (index: number) => {
    request(index);
  };
  //上一页
  const prevClick = (index: number) => {
    request(index);
  };
  //下一页
  const nextClick = (index: number) => {
    request(index);
  };
  //重复请求
  let request = (index: number) => {
    from = index;
    getSearchList();
  };
  //播放点击
  const videoPlay = (id: string) => {
    router.push(`/videoPlay?id=${id}`)
  };
</script>

<style scoped lang="scss">
  .item {
    margin: 20px;
    display: flex;
    .item-right {
      margin: 0 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .text {
        width: 582px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
</style>
