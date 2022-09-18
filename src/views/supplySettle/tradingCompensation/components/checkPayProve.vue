<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-top: 20px;padding-bottom: 40px;">
			<div class="flex flex-center jsb mb10">
				<div style="width: 100%;" class="flex flex-center jsb">
					<div class="flex">
						<el-image class="mr10" style="width: 100px; height: 100px" :src="imgBasicUrl + row.categoryImg"
							fit="fit"></el-image>
						<div>
							<div>{{row.categoryName}}</div>
							<div>{{row.categoryAlias}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex jsb">
				<div>采购编号：{{row.orderNo}}</div>
				<div>日期：{{row.orderTime}}</div>
			</div>
			<div class="title-bg mt10">证明内容</div>
			<div>
				<div class="my-label mb10">提交日期</div>
				<div>{{tableData.confirmRefundPayProveTime}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="my-label mb10">付款证明</div>
				<div class="flex flex-center mt10">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in imgList" :key='index' fit="fit">
					</el-image>
				</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="my-label mb10">付款说明</div>
				<div>{{tableData.confirmRefundPayRemark}}</div>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import { getPaidProve } from '@/api/supplySettleApi/supplySettle.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				isOpen: true,
				imgBasicUrl: this.$store.state.basics.img_url_cat,
				imgList: [],
				tableData: {},
				imgBasicUrl1: this.$store.state.basics.img_url_set_obe,
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
			async getPaidProve() {
				await getPaidProve({
					judgeFeeGuid: this.row.judgeFeeGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							this.imgList = data.confirmRefundPayProve.split(',')
							this.imgList = this.imgList.map(item => this.imgBasicUrl1 + item)
						}
					}
				})
			}

		},
		created() {
			this.getPaidProve()
		}
	};
</script>

<style lang="scss" scoped>
	.radio {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 1px solid #333;
	}

	.radio-full {
		width: 15px;
		height: 15px;
		background: #333;
		border-radius: 50%;
		border: 1px solid #333;
	}

	.my-label1 {
		width: 120px;
	}
</style>
