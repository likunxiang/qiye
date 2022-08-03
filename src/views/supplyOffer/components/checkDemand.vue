<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose">
		<div style="padding-bottom: 40px;">
			<div class="title-bg">{{type === 1?'未报价的需方需求':type===2?'已报价的需方需求':'拒绝报价的需方需求'}}</div>
			<div class="mb10" style="padding-bottom: 10px;">
				<div class="mb10" v-if="type==2">2022-12-12  12：12报价</div>
				<div class="mb10" v-if="type==3">2022-12-12  12：12拒绝报价</div>
				<div class="category-item flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px" :src="basicImgUrl + row.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>品类名称</div>
							<div>别名1，别名2</div>
						</div>
						<div style="display: flex;flex-direction:column-reverse;">日期：2022-12-12 12：12</div>
					</div>
				</div>
			</div>
			<div v-if="type==2">
				<el-tabs v-model="activeMain" type="card">
				    <el-tab-pane label="需求信息" name="first">
				      <div class="" style="padding-bottom: 40px;">
				        <demandMessage :orderGuid='openRow.orderGuid' v-if="activeMain=='first'"></demandMessage>
				      </div>
				    </el-tab-pane>
				    <el-tab-pane label="供应信息" name="second">
				      <div class="" style="padding-bottom: 40px;">
				        <supplyMessage :orderGuid='openRow.orderGuid' v-if="activeMain=='second'"></supplyMessage>
				      </div>
				    </el-tab-pane>
				  </el-tabs>
			</div>
			<div v-else>
				<plateModel></plateModel>
			</div>
			<modelOfferDetail v-if="isOffer" @close="closeOffer" :row="openRow"></modelOfferDetail>
			
		</div>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="close">取 消</el-button>
		  <el-button type="primary" @click="submit">报价</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import modelOfferDetail from '@/views/supplyOffer/components/modelOfferDetail'
	import demandMessage from '@/views/arbitrationRole/ReturnOfRuling/components/demandMessage.vue'
	import supplyMessage from '@/views/arbitrationRole/ReturnOfRuling/components/supplyMessage.vue'
	export default {
		name: "index",
		components: {
			plateModel,
			modelOfferDetail,
			demandMessage,
			supplyMessage
		},
		props: {
			row: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: String,
				default: '1'
			}
		},
		data() {
			return {
				isOpen: true,
				isOffer: false,
				openRow: {},
				activeMain: 'first',
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
			submit() {
				this.isOffer = true
				this.openRow = this.row
			}
		},
		created() {

		}
	};
</script>

<style lang="scss" scoped>
</style>
