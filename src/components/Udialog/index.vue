<template>
  <div class="dialog">
    <el-dialog
      v-elDragDialog
      :visible.sync="dialog.visible"
      :title="dialog.title || '提示'"
      :append-to-body="dialog.append || false"
      :fullscreen="dialog.fullscreen || false"
      :width.sync="width"
      :before-close="handleClose"
    >
      <slot />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleBtnCancle">{{ btnCancle }}</el-button>
        <el-button type="primary" @click="handleBtnSure">{{ btnSure }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog'
export default {
  name: 'Dialog',
  directives: { elDragDialog },
  props: {
    // 父级件传过来的所有值的信息
    dialog: {
      type: Object,
      default: null
    },
    // dialog默认宽度
    width: {
      type: String,
      default: '50%'
    },
    // dialog取消按钮
    btnCancle: {
      type: String,
      default: '取消'
    },
    // dialog确认按钮
    btnSure: {
      type: String,
      default: '确认'
    }
  },
  methods: {
    // 右上角关闭
    handleClose() {
      this.$confirm('确认离开当前窗口？').then(_ => {
        this.dialog.visible = false
      }).catch(_ => {
      })
    },
    // 取消按钮关闭
    handleBtnCancle() {
      // ...
      this.dialog.visible = false
    },
    // 确定按钮关闭
    handleBtnSure() {
      // ...
      this.$emit('handleBtnSure')
    }
  }
}
</script>

<style scoped>
.dialog {
  overflow: hidden;
}
</style>
