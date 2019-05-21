<template>
  <div class="app-container uniqueId">
    <!-- 搜索示例 -->
    <div class="data-search c">
      <el-input v-model="search.input" size="small" placeholder="请输入内容" />
      <el-button size="small" icon="el-icon-search">搜索</el-button>
      <el-button size="small" icon="el-icon-refresh">重置</el-button>
      <el-button size="small" icon="el-icon-plus" type="primary" plain @click="handleEvent(null, 'add')">添加</el-button>
      <el-button class="fr" size="small" icon="el-icon-sort" type="primary" plain>同步帐号</el-button>
    </div>
    <!-- 表格示例 -->
    <el-table class="data-table" :data="list" style="width: 100%" height="calc(100vh - 240px)" border>
      <el-table-column label="序号" type="index" align="center" width="50" />
      <el-table-column label="疾病名称" width="240" align="center" prop="AKA121" />
      <el-table-column label="疾病诊断" width="180" align="center" prop="AKA122" />
      <el-table-column min-width="200" prop="AAE013" show-tooltip-when-overflow label="备注" />
      <!-- 操作示例 -->
      <el-table-column prop="AAE016" label="操作" align="center" width="150" fixed="right">
        <template slot-scope="scope">
          <div class="u-icon" @click="handleEvent(scope.row,'edit')">
            <el-tooltip content="编辑" effect="dark" placement="bottom">
              <i class="el-icon-edit" />
            </el-tooltip>
          </div>
          <div class="u-icon" @click="handleEvent(scope.row,'view')">
            <el-tooltip content="查看" effect="dark" placement="bottom">
              <i class="el-icon-view" />
            </el-tooltip>
          </div>
          <div class="u-icon" @click="handleDel(scope.row)">
            <el-tooltip content="删除" effect="dark" placement="bottom">
              <i class="el-icon-delete" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- page示例 -->
    <pagination class="data-page" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 弹出层信息 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="500px">
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
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogSure(dialog.title)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- end -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      search: {},
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialog: {
        visible: false,
        form: {}
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 数据加载
    getList() {
      const post = {
        cmd: 'hm086',
        data: { AKA121: '' },
        pagemap: { pageNum: this.listQuery.page, pageSize: this.listQuery.limit, paging: true }
      }
      this.$http.post('/service', post).then(res => {
        this.list = res.dataList
        this.total = res.total
      })
    },
    // table 操作
    handleEvent(row, e) {
      this.dialog.visible = true
      if (e === 'add') {
        this.dialog.title = '新增'
        this.dialog.form = {}
      } else {
        this.getCellData(row, (data) => {
          this.dialog.form = {
            AKA121: data.AKA121,
            AKA122: data.AKA122,
            AAE013: data.AAE013
          }
          if (e === 'edit') {
            this.dialog.title = '编辑'
          } else {
            this.dialog.title = '查看'
            this.dialog.form.disabled = true
          }
        })
      }
    },
    // 获取单元格数据
    getCellData(row, callback) {
      const post = {
        cmd: 'hm093',
        data: { AKA120: row.AKA120 }
      }
      this.$http.post('/service', post).then(res => {
        callback(res.data)
      })
    },
    // 删除单元格数据
    handleDel(row) {
      this.$confirm('此操作将永久删除该条记录是否继续?', '提示', { type: 'warning' }).then(() => {
        const post = {
          cmd: 'hm095',
          data: { AKA120: row.AKA120, AAE016: 0 }
        }
        this.$http.post('service', post).then(res => {
          this.$message({ type: 'success', message: '删除成功!' })
        })
      })
    },
    // 新增或编辑或查看确认按钮
    dialogSure(e) {
      this.dialog.visible = false
      if (e === '新增') {
        // this.$http.post()
      } else if (e === '编辑') {
        // this.$http.post()
      }
    }
  }
}
</script>
<style lang="scss">
.uniqueId {
 .el-form-item__content { padding-left:70px; }
}
</style>

