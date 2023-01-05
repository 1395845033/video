<template>
  <video-play
    width="100%"
    :src="src"
    type="m3u8"
    autoplay
    :title="playList[tag] ? playList[tag].title : ''"
    @ended="playEnd"
  ></video-play>
  <el-button
  class="button"
    @click="change(index)"
    v-for="(item, index) in playList"
    :type="tag === index ? 'success' : ''"
    :key="index"
    >{{ item.title }}</el-button
  >
</template>

<script setup lang="ts">
  import { videoPlay } from "vue3-video-play"; // 引入组件
  import "vue3-video-play/dist/style.css"; // 引入css
  import { useRoute } from "vue-router";
  import { ref, onMounted, reactive } from "vue";
  import http from "../utils";
  const { query } = useRoute();
  //播放链接
  let src = ref<string>("");
  //播放数据
  let playList: any = reactive([]);
  onMounted(async () => {
    let { data }: any = await http.get(`/videoChapter/search/${query.id}`);
    playList.push(...data.data.chapterList);
    src.value = playList[0].chapterPath;
  });
  //标识播放第几集
  let tag = ref<number>(0);
  //选集
  let change = (index: number) => {
    tag.value = index;
    src.value = playList[index].chapterPath;
  };
  //播放结束
  let playEnd = () => {
    tag.value++;
    if (tag.value >= playList.length - 1) return;
    src.value = playList[tag.value].chapterPath;
  };
</script>

<style scoped>
.button{
    margin: 13px;
}
</style>
