<template>
	<el-dialog title="" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;padding-top: 20px;">
			<div class="title-bg">{{type === 1?'未报价的需方需求':type===2?'已报价的需方需求':'拒绝报价的需方需求'}}</div>
			<div class="mb10" style="padding-bottom: 10px;">
				<div class="mb10" v-if="type==2">{{row.PriceTime}}报价</div>
				<div class="mb10" v-if="type==3">{{row.PriceTime}}拒绝报价</div>
				<div class="category-item flex flex-center">
					<el-image class="mr10" style="width: 100px; height: 100px"
						:src="basicImgUrl + catogoryObj.categoryImg"></el-image>
					<div class="flex jsb mr20" style="flex: 1; height: 100px;">
						<div>
							<div>{{catogoryObj.categoryName}}</div>
							<div>{{catogoryObj.categoryalias}}</div>
						</div>
						<div style="display: flex;flex-direction:column-reverse;">日期：{{row.reqCreateTime}}</div>
					</div>
				</div>
			</div>
			<div v-if="type==2">
				<el-tabs v-model="activeMain" type="card" @tab-click="changeMain">
					<el-tab-pane label="需求信息" name="first">
						<div class="" style="padding-bottom: 40px;">
							<div v-if="activeMain=='first'">
								<plateModel v-if="isLoading" :plateData="plateArr"></plateModel>
							</div>

						</div>
				 </el-tab-pane>
					<el-tab-pane label="供应信息" name="second">
						<div class="" style="padding-bottom: 40px;">
							<supplyMessage :supplyObj="supplyOfferObj" v-if="activeMain=='second' && isLoading"></supplyMessage>

						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div v-else>
				<plateModel v-if="isLoading" :plateData="plateArr"></plateModel>
			</div>
			<modelOfferDetail v-if="isOffer" @close="closeOffer" :catogoryObj='catogoryObj' :row="openRow"
				@refresh='close' offerType="single"></modelOfferDetail>

		</div>
		<span slot="footer" class="dialog-footer" v-if="type == '1'">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit">报价</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import plateModel from "@/views/supplyRange/components/plateModel"
	import modelOfferDetail from '@/views/supplyOffer/components/modelOfferDetail'
	import demandMessage from '@/views/arbitrationRole/ReturnOfRuling/components/demandMessage.vue'
	import supplyMessage from '@/views/supplyOffer/components/supplyMessage.vue'
	import {
		getDemandDetail,
	} from '@/api/demandReceiveApi/demandReceive.js'
	import {
		getOfferCase
	} from '@/api/supplyOfferApi/supplyOffer.js'
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
			catogoryObj: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				isOpen: true,
				isOffer: false,
				openRow: {},
				activeMain: 'first',
				basicImgUrl: this.$store.state.basics.img_url_cat,
				plateArr: [],
				isLoading: false,
				supplyOfferObj: {}, // 供应报价信息
			};
		},
		methods: {
			changeMain(tab, event) {
			  if (this.activeMain == 'first') {
			  	this.getDemandDetail()
			  } else {
			  	this.getOfferCase()
			  }
			},
			close() {
				this.isOpen = false
				this.$emit('close')
				this.$emit('refresh')
			},
			beforeClose() {
				this.close()
			},
			submit() {
				this.isOffer = true
				this.openRow = this.row
			},
			closeOffer() {
				this.isOffer = false
			},
			// 获取报价信息
			async getOfferCase() {
				this.isLoading = false
				await getOfferCase({
					requestPriceGuid: this.row.requestPriceGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
					if (res.OK == 'True') {
						if (res.Tag.length) {
							let data = res.Tag[0].Table[0]
							this.supplyOfferObj = data
						} else {
							this.plateArr = {}
						}
					}
				})
			},
			async getDemandDetail() {
				this.isLoading = false
				await getDemandDetail({
					requestGuid: this.row.requestGuid,
					curUserId: this.$store.state.user.adminId,
				}).then(res => {
					this.isLoading = true
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
			if(this.type == '2') {
				if (this.activeMain == 'first') {
					this.getDemandDetail()
				} else {
					this.getOfferCase()
				}
				
				
			} else {
				this.getDemandDetail()
			}
		}
	};
</script>

<style lang="scss" scoped>
</style>
