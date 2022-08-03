<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div class="">
			<div class="mb10" style="padding-bottom: 10px;">
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + category.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{category.categoryName}}</div>
							<div>{{category.categoryAlias}}</div>
						</div>
						<div style="display: flex;flex-direction:column-reverse;">日期：{{category.mtNeCreateTime}}</div>
					</div>
				</div>
			</div>
			<plateModel :plateData="plateArr"></plateModel>
		</div>
	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import { getDemandDetail } from '@/api/demandReceiveApi/demandReceive.js'
	export default {
		name: "index",
		components: {
			plateModel
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			category: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				isOpen: true,
				plateArr: [],
				basicImgUrl: this.$store.state.basics.img_url_cat,
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
			// web-供应-按单-查询供方需求范围内容
			async getDemandDetail() {
				await getDemandDetail({
					requestGuid: this.row.requestGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table
							this.plateArr = data
						} else {
							this.plateArr = []
						}
					}
				})
			},
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
</style>
