<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="700px">
    <el-form v-model="dialog.form" class="table2Dialog">
      <el-form-item label="体检年度">
        <el-date-picker v-model="dialog.form.AAE043" type="year" placeholder="选择体检年度" format="yyyy年" value-format="yyyy" />
      </el-form-item>
      <el-form-item label="标准套餐名称">
        <el-input v-model="dialog.form.BKH059" />
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select v-model="dialog.form.BKH063" class="filter-item pInput" placeholder="请选择资质">
          <el-option v-for="item in packageType" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="生效时间">
        <el-date-picker v-model="dialog.form.AAE030" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" />
      </el-form-item>
      <el-form-item label="失效时间">
        <el-date-picker v-model="dialog.form.AAE031" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" />
      </el-form-item>
      <el-form-item label="体检类别">
        <el-select v-model="dialog.form.BKA035" class="filter-item pInput" placeholder="请选择类别">
          <el-option v-for="item in checkCategory" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序号" prop="type">
        <el-input v-model="dialog.form.BKH068" />
      </el-form-item>
      <el-form-item label="限价" prop="type">
        <el-input v-model="dialog.form.BKM001" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" size="small" @click="dialogSure(dialog.title)">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      packageType: [],
      checkCategory: []
    }
  },
  computed: {
    ...mapGetters(['codeMap'])
  },
  mounted() {
    this.checkCategory = this.codeMap.checkCategory
    this.packageType = this.codeMap.packageType
  },
  methods: {
    dialogSure(e) {
      const data = this.dialog.form
      const obj = {
        AAE030: this.$utils.parseTime(data.AAE030, '{y}-{m}-{d} {h}:{i}:{s}'),
        AAE031: this.$utils.parseTime(data.AAE031, '{y}-{m}-{d} {h}:{i}:{s}'),
        BKE204: '',
        BKE205: ''
      }
      Object.assign(data, obj)
      if (e === '新增') {
        data.BKE205 = this.$utils.parseTime('', '{y}-{m}-{d} {h}:{i}:{s}')
        console.log(data)
        this.addList(data)
      } else {
        this.editList(data)
      }
    },
    // addList
    addList(data) {
      const post = {
        cmd: 'hm009',
        data: data
      }
      this.$http.post('service', post).then(res => {
        this.dialog.visible = false
        this.$message('添加成功')
        this.$emit('update')
      })
    },
    // editList
    editList(data) {
      const post = {
        cmd: 'hm010',
        data: data
      }
      this.$http.post('service', post).then(res => {
        this.dialog.visible = false
        this.$message('编辑成功')
        this.$emit('update')
      })
    }
  }
}
</script>
<style lang="scss">
.table2Dialog {
  padding: 0 30px 0 10px;
  .el-form-item__label { width: 120px;  padding-right:20px;}
  .el-form-item__content { padding-left:120px;}
  .el-form-item { margin-bottom: 8px;}
  .el-date-editor.el-input, .el-date-editor.el-input__inner { width: 100%;}
  .el-select { display: block;}
}
</style>

