<template>
	<el-dialog title=" " :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div class="" style="padding-bottom: 40px;padding-top: 20px;">
			<div style="width: 100%;" class="flex flex-center jsb mb20">
				<div class="flex">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
					<div>
						<div>{{row.categoryName}}</div>
						<div>{{row.categoryAlias}}</div>
					</div>
				</div>
			</div>
			<div class="title-bg">需求范围设置</div>
			<div>
				<div class="title-bg flex flex-center jsb" @click="openList('1')">
					<div>符合供应范围的需方需求 ({{rt1Count}})</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<div>
				<div class="title-bg flex flex-center jsb" @click="openList('2')">
					<div>系统推荐的需方需求 ({{rt2Count}})</div>
					<div class="el-icon-arrow-right"></div>
				</div>
			</div>
			<demandList v-if="isList" :type='type' :row="row" @close="closeList"></demandList>
		</div>
	</el-dialog>
</template>

<script>
	import demandList from '@/views/demandReceive/components/demandList'
	import { countByRT } from '@/api/demandReceiveApi/demandReceive.js'
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
		components: {
			demandList
		},
		data() {
			return {
				isOpen: true,
				isList: false,
				type: '1',
				rt1Count: 0,
				rt2Count: 0,
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
			openList(type) {
				this.type = type
				this.isList = true
			},
			closeList() {
				this.isList = false
			},
			async countByRT() {
				await countByRT({
					supplyPathGuid: this.$store.state.user.projectId.pathGuid,
					categoryGuid: this.row.categoryGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					if(res.OK == 'True') {
						this.rt1Count = res.Tag[0].Table[0].rt1Count
						this.rt2Count = res.Tag[0].Table[0].rt2Count
					}
				})
			}
		},
		created() {
			this.countByRT()
		}
	};
</script>

<style lang="scss" scoped>
	.category-item {
		display: flex;
		width: 100%;
	}
</style>
