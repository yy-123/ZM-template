<template>

  <div class="info">
    <udialog
      :dialog.sync="dialog"
      btn-cancle="不是取消"
      btn-sure="确定为保存"
      width="800px"
      @handleBtnSure="childBtnSure"
    >
      <div>我的嵌套的子弹窗列表信息</div>
      <el-form>
        <el-form-item label="疾病名称">
          <el-input v-model="dialog.form.AKA121" :disabled="dialog.form.disabled" />
        </el-form-item>
        <el-form-item label="疾病编码">
          <el-input v-model="dialog.form.AKA122" :disabled="dialog.form.disabled" />
        </el-form-item>
        <el-form-item label="疾病备注">
          <el-input v-model="dialog.form.AAE013" :disabled="dialog.form.disabled" />
        </el-form-item>
      </el-form>
    </udialog>
  </div>

</template>

<script>
import Udialog from '@/components/Udialog'
export default {
  components: { Udialog },
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  created() {
  },
  methods: {
    // 点击关闭按钮
    childBtnSure() {
      console.log('我是-child-diolog的方法')
      this.dialog.visible = false
    }
  }
}
</script>
<style lang="scss">

</style>

