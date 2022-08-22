<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 60px;max-height: 80vh;overflow-y: auto;padding-top: 20px;">
			<div class="flex flex-center mb20">
				<div style="width: 100px;font-weight: bold;">需求场景</div>
				<div>{{sreenObj.name}}</div>
			</div>
			<div class="title-bg">请完善查询内容</div>
			<!-- 字节标题 -->
			<chooseByteTitle v-if="true" :openRow="sreenObj" @getByteGuid="getByteGuid"
			  @toSearch="toSearch"></chooseByteTitle>
			<div class="title-bg">符合筛选条件</div>
			<div class="category-list">
				<div class="category-item jsb" v-for="(item,index) in tableData" :key="index">
					<div class="flex">
						<el-image style="width: 100px; height: 100px;flex-shrink: 0; margin-right: 10px;" :src="basicImgUrl + item.img" fit="fill">
						</el-image>
						<div>{{item.categoryName}}</div>
					</div>
					<el-button type="primary" v-if="item.buttonStatus === '1'" @click="addClass(item)">{{item.buttonStatusName}}</el-button>
					<el-button type="primary" v-if="item.buttonStatus === '2'" @click="checkLimited(item)">{{item.buttonStatusName}}</el-button>
					<el-button type="primary" v-if="item.buttonStatus === '3'">{{item.buttonStatusName}}</el-button>
					<el-button type="primary" v-if="item.buttonStatus === '4'">{{item.buttonStatusName}}</el-button>
				</div>
			</div>
			<pages @changePage="changePage" :total="pageTotal" :page="page"></pages>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getSuCatListBySecenGuid,
		addCat,
		addSupplyNMT
	} from '@/api/supplyClassChooseApi/supplyClassChoose.js'
	import pages from '@/views/components/common/pages.vue'
	import chooseByteTitle from './chooseByteTitle.vue'
	export default {
		name: "index",
		components: {
		  pages,
		  chooseByteTitle
		},
		props: {
			sreenObj: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				loading: false,
				searchVal: '', // 搜索内容
				bothSDFlag: 0, // 分类tab选择
				page: 1,
				pageTotal: 0,
				basicImgUrl: this.$store.state.basics.img_url_cat,
				tableData: [],
				guidList: [], // 字节内容guid列表
				sdPathGuid: '8bedd76f-f5ce-11ec-bace-0242ac120003',
				
			};
		},
		methods: {
			getByteGuid(data) {
			  this.guidList = data
			  console.log('guidList',this.guidList);
			  this.toSearch()
			},
			toSearch() {
			  this.loading = true
			  this.getSuCatListBySecenGuid()
			},
			changePage(page) {
			  this.page = page
			  this.getSuCatListBySecenGuid()
			},
			// web-查询品类信息分页列表
			async getSuCatListBySecenGuid() {
				this.loading = true
				await getSuCatListBySecenGuid({
					secenGuid : this.sreenObj.guid,
					treeName1: this.guidList[1] ? this.guidList[1] : '',
					treeName2: this.guidList[2] ? this.guidList[2] : '',
					treeName3: this.guidList[3] ? this.guidList[3] : '',
					treeName4: this.guidList[4] ? this.guidList[4] : '',
					treeName5: this.guidList[5] ? this.guidList[5] : '',
					treeName6: this.guidList[6] ? this.guidList[6] : '',
					treeName7: this.guidList[7] ? this.guidList[7] : '',
					treeName8: this.guidList[8] ? this.guidList[8] : '',
					treeName9: this.guidList[9] ? this.guidList[9] : '',
					treeName10: this.guidList[10] ? this.guidList[10] : '',
					// categoryName: this.searchVal,
					size: '20',
					curUserId: this.$store.state.user.adminId,
					page: this.page
				}).then(res => {
					this.loading = false
					console.log(res);
					if (res.Tag.length) {
						this.tableData = res.Tag[0].Table
						this.pageTotal = (this.page - 1) * 20 + 21
					} else {
						this.tableData = []
						this.pageTotal = (this.page - 1) * 20 + 1
					}
					this.searchResult = this.tableData.length
				})
			},
			addClass(item) {
				addCat({
					categoryGuid: item.categoryGuid,
					priceMode: item.priceMode,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if (res.Tag.length) {
						  this.$message({
						    type: 'success',
						    message: '操作成功!'
						  });
						  this.addSupplyNMT(item,res.Tag[0].Table[0].supplierGuid)
						  this.getSuCatListBySecenGuid()
						} else {
						  this.$message({
						    type: 'error',
						    message: '操作失败!'
						  });
						}
					}
				})
			},
			async addSupplyNMT(item,supplierGuid) {
				await addSupplyNMT({
					categoryGuid: item.categoryGuid,
					supplierGuid: supplierGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					
				})
			},
			checkLimited(item) {
				
			},
			close() {
				this.isOpen = false
				this.$emit('close')
			},
			beforeClose() {
				this.close()
			},
		},
		created() {
			// this.getSuCatListBySecenGuid()
		}
	};
</script>

<style lang="scss" scoped>
	.category-item {
		display: flex;
		margin-bottom: 10px;
	}
</style>
