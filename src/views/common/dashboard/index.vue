<template>
  <div class="app-container index">
    <h3>usurInfo：{{ userBean.fullName }}</h3>
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card" style="min-width:150px;">
          <div slot="header" class="clearfix">
            <span>代理设置</span>
          </div>
          <h4>详情webpack-dev-serve用法</h4>
          <h5>根目录下 vue.config.js配置</h5>
          <h5> this.getAPI() </h5>
          <h5> this.getTest() </h5>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>接口调用</span>
          </div>
          <h4>详情axios用法</h4>
          <h5> this.$http.post </h5>
          <h5> this.$http.get </h5>
          <h5> this.$http.request </h5>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="min-width:150px;">
          <div slot="header" class="clearfix">
            <span>常用JS方法</span>
          </div>
          <h4>详情 @/utils/index.js</h4>
          <h5> this.$utils.parsetTime() </h5>
          <h5> this.$utils.getCodeMapArr() </h5>
          <h5>...</h5>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" style="min-width:150px;">
          <div slot="header" class="clearfix">
            <span>公共验证方法</span>
          </div>
          <h4>详情 @/utils/vilidate.js</h4>
          <h5> this.$valid.isMobile() </h5>
          <h5> this.$valid.isCardId() </h5>
          <h5>...</h5>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      list: null,
      total: null,
      pagemap: {
        paging: true,
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  computed: {
    ...mapGetters([
      'userBean'
    ])
  },
  created() {
    // this.getList()
    // this.getAPI()
    // this.getTest()
  },
  methods: {
    // 获取数据示例
    getList() {
      const post = {
        cmd: 'hm086',
        data: { AKA121: '' },
        pagemap: { pageNum: 1, pageSize: 20, paging: true }
      }
      this.$http.post('/service', post).then(res => {
        this.list = res.dataList
        this.total = res.tatal
      })
    },
    // 代理api测试
    getAPI() {
      this.$http.get('http://localhost:9528/api/?json=true').then(res => {
        console.log(res)
      })
    },
    // 代理test测试
    getTest() {
      const post = { 'taskid': 'testtask2' }
      this.$http.post('http://localhost:9528/test/', post).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }

}

.index {
  h4 { font-size: 16px;  font-weight: normal;}
  h5 { font-weight: normal;}

}
</style>
