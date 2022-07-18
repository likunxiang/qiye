<template>
  <el-dialog title="品类采购权限管理" :visible.sync="isOpen" width="700px" @close="beforeClose">
    <el-row class="mb20">
      <el-table :data="tableData" border>
        <el-table-column prop="userName" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="nation" label="区号" align="center">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系电话" align="center">
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型" align="center">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-button type="primary" class="mb20" @click="openAstrict">限制品类名称</el-button>
      <el-row style="padding-bottom: 20px;">
        <el-table :data="astrictData" border>
          <el-table-column prop="categoryName" label="品类名称" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="限制起始日期" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="限制事由" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="cancelAstrict(scope.$index,scope.row)">取消限制采购</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>
    <!-- 限制采购品类弹窗 -->
    <el-dialog title="限制采购品类" :visible.sync="isAstrict" width="700px" append-to-body @close="beforeCloseAstrict">
      <el-row>
        <el-descriptions :colon="false" class="margin-top" :column="1">
          <el-descriptions-item label-class-name="my-label" label="姓名">{{astrictRow.userName}}</el-descriptions-item>
          <el-descriptions-item label-class-name="my-label" label="联系电话">{{astrictRow.phonenumber}}
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
      <el-row class="mb20">
        <div class="mb10 bold">限制采购事由</div>
        <el-input type="textarea" :rows="3" placeholder="请输入" v-model="astrictEventText">
        </el-input>
      </el-row>
      <el-row>
        <el-button class="mb20" type="primary" @click="addAstrictClass" >添加限制采购品类
        </el-button>
        <el-row class="astrict-box">
          <div class="flex flex-center jsb mb10" v-for="(item,index) in addClassList" :key="index">
            <div class="flex1">{{item.categoryName}}</div>
            <div class="el-icon-remove fs26" style="flex-shrink: 0;" @click="delList(addClassList,index)">
            </div>
          </div>
        </el-row>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="submitAstrict" :disabled="!addClassList.length || !astrictEventText">保存</el-button>
      </span>

      <el-dialog title="限制采购品类" :visible.sync="isAddAstrict" width="700px" append-to-body
        @close="beforeCloseAddAstrict">
        <div style="padding-bottom: 68px;">
			<el-row>
			  <div class="flex flex-center jsb">
			    <el-row class="flex flex-center">
			      <el-input placeholder="请输入你要找的品类名称" clearable v-model="searchClassVal" @keyup.enter.native="searchClass"
			        style="width: 200px;margin-right: 20px;">
			        <i class="el-icon-search el-input__icon" slot="suffix" @click="searchClass" />
			      </el-input>
			      <div class="" v-if="isToSearch">搜索结果：{{searchClassResult}}</div>
			    </el-row>
			  </div>
			</el-row>
			<el-row class="mt20 pb20">
			  <div class="flex jsb flex-center mb10" v-for="(item,index) in classList" :key="index">
			    <div>{{item.categoryName}}</div>
			    <el-button v-if="item.check == true">已添加</el-button>
			    <el-button v-else type="primary" @click="checkClass(index)">添加</el-button>
			  </div>
			</el-row>
			<pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
		</div>

      </el-dialog>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import {
    permissionGetOneByType4,
    permissionUpdateByType4,
    getUnLmitCatList,
    permissionDeleteDetail
  } from "@/api/operationRoleApi/dispatchingManagementApi.js"
  import pages from '@/views/components/common/pages.vue'
  export default {
    name: "index",
    props: {
      astrictRow: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      pages
    },
    data() {
      return {
        isOpen: true,
        isUse: true,
        isAstrict: false,
        isAddAstrict: false,
        tableData: [],
        astrictData: [],
        astrictEventText: '',
        searchClassVal: '',
        isToSearch: false,
        searchClassResult: 0,
        classList: [],
        addClassList: [],
        pageTotal: 0,
        page: 1,
      };
    },
    methods: {
      close() {
        this.isOpen = false
        this.$emit('close')
      },
      beforeClose() {
        this.close()
      },
      cancelAstrict(index, row) {
        const h = this.$createElement;
        const astrictRow = this.astrictRow
        let data = row
        this.$msgbox({
          title: '',
          message: h('p', null, [
            h('div', null, '确认取消限制 '),
            h('div', {
              style: 'font-weight: bold'
            }, '姓名'),
            h('div', null, astrictRow.userName),
            h('div', {
              style: 'font-weight: bold'
            }, '联系电话'),
            h('div', null, astrictRow.phonenumber),
            h('div', {
              style: 'font-weight: bold'
            }, '品类名称'),
            h('div', null, data.categoryName),
          ]),
          confirmButtonText: '确定',
        }).then(action => {
          this.permissionUpdateByType4Cancel(row.permissonDetailGuid) // 取消限制
        });
      },
      openAstrict() {
        this.isAstrict = true
      },
      closeAstrict() {
        this.isAstrict = false
      },
      beforeCloseAstrict() {
        this.isAstrict = false
      },
      searchClass() {
        if (this.searchClassVal.length > 0) {
          this.isToSearch = true
        } else {
          this.isToSearch = false
        }
		this.page = 1
        this.getUnLmitCatList()
      },
      addAstrictClass() {
        this.isAddAstrict = true
        this.getUnLmitCatList()
      },
      closeAddAstrict() {
        this.isAddAstrict = false
      },
      beforeCloseAddAstrict() {
        this.isAddAstrict = false
        this.addClassList = []
        for (let i in this.classList) {
          if (this.classList[i].check) {
            this.addClassList.push(this.classList[i])
          }
        }
      },
      checkClass(index) {
        this.classList[index].addedFlag = '1'
        this.classList[index].check = true
        // this.addClassList.push(this.classList[index])
        console.log(this.classList);
        this.classList = this.clone(this.classList)
        // let categoryGuid = this.classList[index].categoryGuid
        // let categoryName = this.classList[index].categoryName
        // const row = this.astrictRow
        // const h = this.$createElement;
        // this.$msgbox({
        //   title: '',
        //   message: h('p', null, [
        //     h('div', null, '确认限制 '),
        //     h('div', {
        //       style: 'font-weight: bold'
        //     }, '姓名'),
        //     h('div', null, row.userName),
        //     h('div', {
        //       style: 'font-weight: bold'
        //     }, '联系电话'),
        //     h('div', null, row.phonenumber),
        //     h('div', {
        //       style: 'font-weight: bold'
        //     }, '品类名称'),
        //     h('div', null, categoryName),
        //   ]),
        //   confirmButtonText: '确定',
        // }).then(action => {
        //   // this.isAstrict = false
        //   this.permissionUpdateByType4(categoryGuid, 0)
        // });


      },

      delList(data, index) {
        data.splice(index, 1)
        console.log(this.addClassList);
      },

      submitAstrict() {
        const h = this.$createElement;
        const row = this.astrictRow
        let arr = []
        for (let i in this.addClassList) {
          arr.push(this.addClassList[i].categoryName)
        }
        let class1 = arr.join(',')
        this.$msgbox({
          title: '',
          message: h('p', null, [
            h('div', null, '确认限制 '),
            h('div', {
              style: 'font-weight: bold'
            }, '姓名'),
            h('div', null, row.userName),
            h('div', {
              style: 'font-weight: bold'
            }, '联系电话'),
            h('div', null, row.phonenumber),
            h('div', {
              style: 'font-weight: bold'
            }, '品类名称'),
            class1,
          ]),
          confirmButtonText: '确定',
        }).then(action => {
          this.isAstrict = false
          this.permissionUpdateByType4(0) // 开始限制
        });
      },
      async permissionGetOneByType4() {
        await permissionGetOneByType4({
          userId: this.astrictRow.userId,
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            this.astrictData = data
          } else {
            this.astrictData = []
          }
        })
      },
      // 更新用户品类采购操作权限
      async permissionUpdateByType4(categoryGuid, status) {
        let arr = []
        for(let i in this.addClassList) {
          let data = {
            userId: this.astrictRow.userId,
            status: status, // 0禁用 1启用
            remark: this.astrictEventText,
            categoryGuid: this.addClassList[i].categoryGuid
          }
          arr.push(data)
        }

        await permissionUpdateByType4(arr).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.addClassList = []
            this.permissionGetOneByType4()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      // 取消限制单独写一个
      async permissionUpdateByType4Cancel(id) {
        let data = {
          permissionDetailGuid: id
        }
        await permissionDeleteDetail(data).then(res => {
          console.log(res);
          if (res.Tag[0] > 0) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.permissionGetOneByType4()
          } else {
            this.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
        })
      },
      changePage(page) {
        this.page = page
        this.getUnLmitCatList()
      },
      // web-查询未管制的品类列表
      async getUnLmitCatList() {
        await getUnLmitCatList({
          categoryName: this.searchClassVal,
          type: '4',
          size: '20',
          page: this.page
        }).then(res => {
          if (res.Tag.length) {
            let data = res.Tag[0].Table
            for (let i in data) {
              for (let j in this.addClassList) {
                if(this.addClassList[j].categoryGuid == data[i].categoryGuid) {
                  data[i].check = true
                }
              }
            }
            this.classList = data
          } else {
            this.classList = []
          }
          this.pageTotal = this.classList.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
            20 + 1
          this.searchClassResult = this.classList.length
        })
      }
    },
    created() {
      this.tableData.push(this.astrictRow)
      this.permissionGetOneByType4()
    }
  };
</script>

<style lang="scss" scoped>
  .my-label {
    width: 120px;
    font-weight: bold;
  }

  .astrict-box {
    padding-bottom: 20px;
    min-height: 200px;
  }

  .fs26 {
    font-size: 26px;
  }
</style>
