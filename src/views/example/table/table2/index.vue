<template>
  <div class="app-container">
    <!-- 搜索示例 -->
    <div class="data-search c">
      <el-date-picker v-model="search.year" size="small" type="year" placeholder="请选择年份" />
      <el-input v-model="search.bm" size="small" placeholder="体检机构编码" />
      <el-input v-model="search.name" size="small" placeholder="体检机构名称" />
      <el-button size="small" icon="el-icon-search">搜索</el-button>
      <el-button size="small" icon="el-icon-refresh">重置</el-button>
      <el-button size="small" icon="el-icon-plus" type="primary" plain @click="handleAdd ()">添加</el-button>
    </div>
    <!-- 表格示例 -->
    <el-table class="data-table small" :data="list" style="width: 100%" height="calc(100vh - 240px)" border highlight-current-row>
      <el-table-column label="序号" align="center" width="50" type="index" />
      <el-table-column label="标准套餐编码" width="240" align="center" prop="BKH058" />
      <el-table-column label="标准套餐名称" width="210" prop="BKH059" align="center" />
      <el-table-column label="体检年度" align="center" width="80" show-tooltip-when-overflow prop="AAE043" />
      <el-table-column label="限价" width="80" align="center" prop="BKM001">
        <template slot-scope="scope">
          <span>{{ scope.row.BKM001 }} 元</span>
        </template>
      </el-table-column>
      <el-table-column label="体检类别" width="130" align="center" show-tooltip-when-overflow prop="BKA035">
        <template slot-scope="scope">
          <span>{{ $utils.getValueForFieldKey(codeMap,'checkCategory',scope.row.BKA035) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐类型" width="150" align="center" prop="BKH063">
        <template slot-scope="scope">
          <span>{{ $utils.getValueForFieldKey(codeMap,'packageType',scope.row.BKH063) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" align="center" prop="AAE030">
        <template slot-scope="scope">
          <span>{{ scope.row.AAE030 | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="失效时间" align="center" prop="AAE031">
        <template slot-scope="scope">
          <span>{{ scope.row.AAE031 | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="套餐创建人" width="150" align="center" prop="BKE204" />
      <el-table-column label="套餐创建时间" align="center" prop="BKE205">
        <template slot-scope="scope">
          <span>{{ scope.row.BKE205 | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用状态" align="center" width="80" show-tooltip-when-overflow prop="AAE016">
        <template slot-scope="scope">
          <span>{{ $utils.getValueForFieldKey(codeMap,'yesOrNo',scope.row.AAE016) }}</span>
        </template>
      </el-table-column>
      <!-- 操作示例 -->
      <el-table-column prop="AAE016" label="操作" align="center" width="90">
        <template slot-scope="scope">
          <div class="u-icon" @click="handleEdit(scope.row)">
            <el-tooltip content="编辑" effect="dark" placement="bottom">
              <i class="el-icon-edit" />
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
    <!-- dialog -->
    <table2-dialog :dialog="dialog" @update="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import Table2Dialog from './table2Dialog'
export default {
  components: { Pagination, Table2Dialog },
  data() {
    return {
      search: {},
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialog: {
        visible: false,
        title: '',
        form: {}
      }
    }
  },
  computed: {
    ...mapGetters(['codeMap'])
  },
  created() {
    this.getList()
  },
  methods: {
    // 数据加载
    getList() {
      const post = {
        cmd: 'hm012',
        data: { AAE043: '2019-05-15', BKH059: '' },
        pagemap: { pageNum: this.listQuery.page, pageSize: this.listQuery.limit }
      }
      this.$http.post('/service', post).then(res => {
        this.list = res.dataList
        this.total = res.total
      })
    },
    // add
    handleAdd() {
      this.dialog = {
        visible: true,
        title: '新增',
        form: {}
      }
    },
    // edit
    handleEdit(row) {
      const post = {
        cmd: 'hm013',
        data: { BKH058: row.BKH058 }
      }
      this.$http.post('service', post).then(res => {
        this.dialog = {
          visible: true,
          title: '编辑',
          form: res.data
        }
      })
    },
    // del
    handleDel(row) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        const post = {
          cmd: 'hm010',
          data: { BKH058: row.BKH058, AAE016: 0 }
        }
        this.$http.post('service', post).then(res => {
          this.$message('删除成功')
          this.getList()
        })
      }).catch(() => {

      })
    }
  }
}
</script>
<style lang="scss">
</style>

