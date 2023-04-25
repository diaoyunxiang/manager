<template>
  <div>
    <!-- 图片上传 -->
    <el-upload
      class="upload-demo"
      :on-change="handleChange"
      :file-list="fileList"
      action="string"
    >
      <el-button size="small" type="primary">新增广告</el-button>
    </el-upload>
    <el-table :data="ads" style="width: 100%">
      <el-table-column prop="adCompany" label="广告公司" width="180" />
      <el-table-column prop="adName" label="广告名称" width="180" />
      <el-table-column prop="adCategory" label="所属分类" width="180" />
      <el-table-column label="图片" width="180">
        <template slot-scope="{ row }">
          <img :src="row.file.data" min-width="70" height="70">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="changeAdPicture(row)">修改图片</el-button>
          <el-button type="text" size="small" @click="deleteAd(row)">删除广告</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addAds, deleteAds } from '@/api/requets'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('ads', ['ads'])
  },
  mounted() {
    this.getPicture()
  },
  methods: {
    // 修改某个广告的图片
    changeAdPicture(row) {
      console.log(row)
    },
    // 删除广告
    deleteAd(row) {
      deleteAds(row._id)
      console.log(row._id)
    },
    // 获得所有广告
    async getPicture() {
      await this.$store.dispatch('ads/getAll')
    },
    // 上传图片后发给服务器
    async handleChange(file, fileList) {
      var formData = new FormData()
      formData.append('file', file.raw)
      formData.append('adCompany', '长城')
      formData.append('adName', '干红葡萄酒')
      formData.append('adCategory', '酒')
      await addAds(formData)
    }
  },
  data() {
    return {
      fileList: []
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100px;
  height: 100px;
}
</style>

