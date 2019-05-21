<template>
  <div class="child-info">
    <udialog
      :dialog.sync="dialog"
      width="500px"
      @handleBtnSure="btnSure"
    >
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
        <el-button type="primary" @click="openChild">打开二级弹窗</el-button>
      </el-form>
    </udialog>
    <!-- childDialog -->
    <table3-child-dialog :dialog.sync="dialogchild" />
  </div>

</template>

<script>
import Udialog from '@/components/Udialog'
import Table3ChildDialog from './table3ChildDialog.vue'

export default {
  components: { Udialog, Table3ChildDialog },
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      dialogchild: {
        title: '子弹窗信息',
        visible: false,
        append: true,
        form: {}
      }
    }
  },
  created() {
  },
  methods: {
    btnSure() {
      console.log('我是dialog页')
      if (this.dialog.title === '新增') {
        // this.$http.post()
        this.dialog.visible = false
        console.log('并且更新了index.vue')
        this.$emit('update')
      } else {
        // this.$http.post()
        this.dialog.visible = false
      }
    },
    // 打开子弹窗方法
    openChild() {
      this.dialogchild.visible = true
      this.dialogchild.fullscreen = true
      this.dialogchild.form = this.dialog.form
    }
  }
}
</script>
<style lang="scss">

</style>

