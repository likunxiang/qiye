<template>
	<el-dialog title="查看回复" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;">
			<div>
				<div class="mb10">品类名称</div>
				<div>{{tableData.categoryName}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">采购编号</div>
				<div>{{tableData.orderNo}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">事由</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">证据</div>
				<div class="flex flex-center mt10 mb10">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in imgsList" :key="index" fit="fit">
					</el-image>
				</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">联系人</div>
				<div>{{tableData.feedbackContact}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">区号</div>
				<div>{{tableData.feedbackNation}}</div>
			</div>
			<el-divider></el-divider>
			<div>
				<div class="mb10">联系电话</div>
				<div>{{tableData.feedbackPhone}}</div>
			</div>
			
		</div>
	</el-dialog>
</template>

<script>
	import {
		getReplyDetail
	} from '@/api/system/usageFeedback.js'
	export default {
		name: "index",
		data() {
			return {
				isOpen: true,
				categoryName: '21',
				orderNo: '11',
				textarea: '231',
				linkman: '321',
				phone: '31231',
				imgsList: [],
				tableData: {},
				img_url_user_feedback_order: this.$store.state.basics.img_url_user_feedback_order
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
			async getReplyDetail() {
				await getReplyDetail({
					feedbackGuid: this.row.feedbackGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							this.imgsList = data.imgs.split(',')
							this.imgsList = this.imgsList.map(item => this.img_url_user_feedback_order + item)
						} else {
							this.tableData = {}
						}
					}
				})
			}
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
</style>
