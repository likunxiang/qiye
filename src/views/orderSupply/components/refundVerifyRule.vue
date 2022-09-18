<template>
	<el-dialog title="退货验收规则" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
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
			<el-divider></el-divider>
			<div v-html="textData"></div>

		</div>
	</el-dialog>
</template>

<script>
	import {
		getBizRuleById
	} from '@/api/commonApi.js'
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
				textData: '',
				guid: 'c9b59ba5-7374-11ec-a478-0242ac120003',
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
			async getBizRuleById() {
				await getBizRuleById({
					Guid: this.guid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						let data = res.Tag[0].Table[0].content
						this.textData = data.replace(/\\n/g, '<br>')
					}
				})
			}
		},
		created() {
			this.getBizRuleById()
		}
	};
</script>

<style lang="scss" scoped>
</style>
