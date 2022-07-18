<template>
	<div class="app-container">
		<div class="flex flex-center mb20">
			<el-input placeholder="请输入你要找的品类名称" clearable v-model="searchVal" @keyup.enter.native="search"
				style="width: 200px;margin-right: 20px;" @clear="search">
				<i class="el-icon-search el-input__icon" slot="suffix" @click="search" />
			</el-input>
			<div class="" v-if="isToSearch">搜索结果：{{searchResult}}</div>
		</div>
		<el-table v-loading="loading" :data="tableData" border style="width: 100%">
			<el-table-column prop="categoryName" label="品类名称" align="center">
			</el-table-column>
			<el-table-column prop="categoryTreeName" label="品类类型" align="center">
			</el-table-column>
			<el-table-column prop="record" label="发布记录" align="center" width="200">
				<template slot-scope="scope">
					<div v-if="scope.row.publishTime">
						<el-row>{{scope.row.publishTime}}</el-row>
					</div>
					<div v-else>未发布</div>
					<div class="del-icon el-icon-d-arrow-right" @click="openRecord(scope.row)"
						v-if="scope.row.publishTime || true"></div>
					<div class="del-icon el-icon-d-arrow-right" style="color: #CCCCCC;" v-else></div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-row>
						<el-button @click="select(scope.row)" type="text" size="small">指派设置</el-button>
					</el-row>
					<el-row>
						<el-button @click="release(scope.row)" type="text" size="small"
							:disabled="scope.row.publishFlag==0">发布
						</el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>

		<recordPop @closeNew="closeRecord" v-if="isRecord" :openRow="openRow"></recordPop>

		<el-dialog title="指派设置" width="700px" :visible.sync="isAssign" destroy-on-close>
			<div class="input-box">
				<div class="flex flex-center">
					<div class="input-text mr20">品类名称</div>
					<div class="">{{openRow.categoryName}}</div>
				</div>
				<el-row>
					<h4 class="title-bg">供方指派规则设置</h4>
					<el-row class="pl10">
						<div class="bold mb10">1价格作为条件设置</div>
						<div class="flex mb10" v-for="(item,index) in priceList" :key="index"
							@click="chooseRadio(index)">
							<p :class="item.check?'icon-round-full':'icon-round'"></p>
							<p class="">{{item.text}}</p>
						</div>
						<!-- <el-radio-group v-model="radioAssign">
              <el-row class="mb10">
                <el-radio :label="1"></el-radio>
              </el-row>
            </el-radio-group> -->
					</el-row>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeAssign">取 消</el-button>
				<el-button type="primary" @click="submitAssign" :disabled="radioAssign<=0">保 存</el-button>
			</span>
		</el-dialog>
		<pages @changePage="changePage" :page="page" :total="pageTotal"></pages>
	</div>
</template>

<script>
	import recordPop from '@/views/modelRole/tradingContent/designate/recordPop.vue'
	import {
		getAssigns,
		setRuleType,
		getRuleType,
		updatePublishFlag,
		getPublishHistory,
		supplyassignIsCanPublish
	} from '@/api/modelRoleApi/tradingContent.js'
	import {
		existsByCGuid,
		deletePublishFlag
	} from '@/api/modelRoleApi/tradingContent.js'
	import pages from '@/views/components/common/pages.vue'
	export default {
		name: "index",
		components: {
			recordPop,
			pages
		},
		data() {
			return {
				searchVal: '',
				isToSearch: false,
				searchResult: 0,
				tableData: [],
				isRecord: false,
				isAssign: false, // 指派控制
				radioAssign: 0, // 指派单选
				openRow: {}, // 选中对象
				priceList: [{
					text: '同一单子，价格低者中单同一单子，价格低者中单；同价格，已中单少者中单；已中单数量相同，早合作者中单；以上均满足，则随机。',
					check: false,
					id: 1,
				}, {
					text: '无规则',
					check: false,
					id: 2,
				}, ],
				page: 1,
				pageTotal: 0,
				loading: true,
			};
		},
		methods: {
			search() {
				if (this.searchVal.length > 0) {
					this.isToSearch = true
				} else {
					this.isToSearch = false
				}
				this.page = 1
				this.getAssigns()
			},
			changePage(page) {
				this.page = page
				this.getAssigns()
			},
			select(row) {
				this.isAssign = true
				this.openRow = row
				this.getRuleType(row.assignGuid)
			},
			closeAssign() {
				this.isAssign = false
			},
			submitAssign() {
				this.setRuleType()
			},
			release(row) {
				this.existsByCGuid(row.categoryName, row.categoryGuid, row.assignGuid, () => {
					let isFirst = row.publishFlag == 0 ? true : false
					// this.supplyassignIsCanPublish(row.categoryGuid, isFirst , row.assignGuid)
					this.updatePublishFlag(row.assignGuid, isFirst)
				})
			},
			// 发布指派规则
			async updatePublishFlag(aid, isFirst) {
				await updatePublishFlag({
					assignGuid: aid
				}).then(res => {
					if (isFirst) {
						this.$alert('发布成功', '', {
							confirmButtonText: '知道了',
							callback: action => {
								this.getAssigns()
							}
						});
					} else {
						this.$alert('发布成功且覆盖原来版本，刷新后可使用。', '', {
							confirmButtonText: '知道了',
							callback: action => {
								this.getAssigns()
							}
						});
					}

				})
			},
			// 判断是否可以发布
			async supplyassignIsCanPublish(id, isFirst, aid) {
				await supplyassignIsCanPublish({
					categoryGuid: id
				}).then(res => {
					console.log(res);
					if (res.Tag[0].Table[0].canPublish > 0) {
						// 可以发布
						this.updatePublishFlag(aid, isFirst)
					} else {
						let msg = res.Tag[0].Table[0].notPublishReason
						// 不可以发布
						this.$alert(msg, '', {
							confirmButtonText: '知道了',
							callback: action => {}
						});
					}
				})
			},
			openRecord(row) {
				this.isRecord = true
				this.openRow = row
			},
			closeRecord() {
				this.isRecord = false
			},

			chooseRadio(index) {

				for (let i in this.priceList) {
					if (i == index) {
						console.log(222);
						this.priceList[i].check = true
					} else {
						console.log(111);
						this.priceList[i].check = false
					}
				}
				console.log(this.priceList);
				this.priceList = this.clone(this.priceList)
				this.radioAssign = 1
			},
			// 查询和发布先调用这个接口
			async existsByCGuid(name, cid, did, callback) {
				await existsByCGuid({
					categoryGuid: cid
				}).then(res => {
					if (res.Tag[0].Table[0].num == 0) {
						// 当返回为0时，说明该品类已不存在，要删除交易id

						this.$confirm('系统删除了【' + name + '】', '提示', {
							confirmButtonText: '知道了',
							cancelButtonText: '取消',
							showClose: false,
							showCancelButton: false,
							type: 'info'
						}).then(() => {
							this.deletePublishFlag(did)
						})

					} else {
						// 否则 打开相应操作
						callback()
					}
				})
			},
			// 删除这个指派规则id
			async deletePublishFlag(did) {
				await deletePublishFlag({
					dealModeGuid: did
				}).then(res => {

				})
			},
			// 更新\保存指标规则
			async setRuleType() {
				await setRuleType({
					categoryGuid: this.openRow.categoryGuid,
					ruleType: this.radioAssign
				}).then(res => {
					if (res.Tag[0] > 0) {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.isAssign = false
					} else {
						this.$message({
							type: 'error',
							message: '操作失败!'
						});
					}
				})
			},
			// 获取指派规则
			async getRuleType(id) {
				await getRuleType({
					assignGuid: id
				}).then(res => {
					console.log(res);
					// if (res.Tag.length) {
					//   let data = res.Tag[0].Table
					//   for(let i in data) {
					//     data[i].check = false
					//   }
					//   this.priceList = data
					// }
				})
			},
			async getAssigns() {
				this.loading = true
				await getAssigns({
					categoryName: this.searchVal
				}).then(res => {
					this.loading = false
					if (res.Tag.length) {
						let data = res.Tag[0].Table
						this.tableData = data
						this.searchResult = this.tableData.length

					} else {
						this.tableData = []
						this.searchResult = this.tableData.length
					}
					this.pageTotal = this.tableData.length > 0 ? (this.page - 1) * 20 + 21 : (this.page - 1) *
						20 + 1
				})
			}
		},
		created() {
			this.getAssigns()
		},
	};
</script>

<style lang="scss">
	.pageBox {
		height: 48px;

		.pageMain {
			position: absolute;
			bottom: 20px;
			left: 20px;
		}
	}

	.del-icon {
		position: absolute;
		right: 4px;
		top: 4px;
	}

	.title-bg {
		background-color: #F2F2F2;
		padding: 10px;
	}

	.icon-round {
		border: 1px solid #CCCCCC;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-right: 10px;
	}

	.icon-round-full {
		border: 1px solid #1890FF;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		flex-shrink: 0;
		margin-right: 10px;
		background-color: #1890FF;
	}
</style>
