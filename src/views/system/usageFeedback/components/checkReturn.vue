<template>
	<el-dialog title="查看回复" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;">
			<div>
				<el-input type="textarea" :rows="3" :readonly="true" placeholder="请填写意见或者建议" v-model="tableData.content" />
				<div style="margin: 10px 0;">{{tableData.createTime}}</div>
			</div>
			<div class="title-bg" style="text-align: center;">反馈详情</div>
			<div class="">请填写意见或者建议</div>
			<div class="flex flex-center mt10 mb10">
				<el-image class="mr10" style="width: 100px; height: 100px" :src="item" v-for="(item,index) in imgsList" :key="index" fit="fit">
				</el-image>
			</div>
			<div style="margin: 10px 0;">{{tableData.replyTime}}</div>
		</div>
	</el-dialog>
</template>

<script>
	import {
		getDetail
	} from '@/api/system/usageFeedback.js'
	export default {
		name: "index",
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				tableData: {},
				imgsList: [],
				img_url_user_feedback_user: this.$store.state.basics.img_url_user_feedback_user
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
			async getDetail() {
				await getDetail({
					feedbackGuid: this.row.feedbackGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						if(res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.tableData = data
							this.imgsList = data.imgs.split(',')
							this.imgsList = this.imgsList.map(item => this.img_url_user_feedback_user + item)
						} else {
							this.tableData = {}
						}
					}
				})
			}
		},
		created() {
			this.getDetail()
		}
	};
</script>

<style lang="scss" scoped>
</style>
