<template>
	<div class="mt20">
		<div v-for="(item,indexItem) in tableData" :key='indexItem'>
			<div class="title-bg mb10">{{item.alias}}</div>
			<div v-for="(field,indexField) in item.field">
				<div>
					<div class="mb10 bold">{{field.alias}}</div>
					
				</div>
				<div class="flex flex-center jsb" @click="toField(field,indexItem,indexField)" v-if="!field.values">
					<div>请完善</div>
					<div class="el-icon-arrow-right"></div>
				</div>
				<div  @click="toField(field,indexItem,indexField)">
					<template v-if="field.operation < 4">
						<div class="mb10" v-for="(value,indexField) in field.values" :key="indexField">
							{{value.value}}
						</div>
						
						<el-divider></el-divider>
					</template>
					<template v-else>
						<template v-if="field.operation == 4">
							<div v-for="(value,index) in field.values" class="mb10 flex flex-center"
								style="flex-wrap: wrap;">
								<el-image class="mr10 mb10" :preview-src-list="getImgUrl(value.value)"
									style="width: 100px; height: 100px"
									v-for="(img,index) in getImgUrl(value.value)" :key="index" :src="img">
								</el-image>
							</div>
							<el-divider></el-divider>
						</template>
						<template v-if="field.operation == 5">
							<div v-for="(value,index) in field.values" class="mb10 flex flex-center"
								style="flex-wrap: wrap;">
								<div class="mr10 mb10">{{value.value}}</div>
							</div>
							<el-divider></el-divider>
						</template>
					</template>
				</div>
			</div>
		</div>
		
		<fieldConfig v-if="isSetting && pageType=='new'" :fieldObj="openRow" @close="closeField" @getValue="getValue" :pageType="pageType" ></fieldConfig>
		<editFieldConfig v-if="isSetting && pageType=='edit'" :fieldObj="openRow" @close="closeField" @getValue="getValue" :pageType="pageType" ></editFieldConfig>
		
		<!-- <div v-for="(item,index) in tableData" :key='index'>
			<div class="title-bg mb10">{{item.alias}}</div>
			<div v-for="(field,index) in item.field">
				<div class="mb10 bold">{{field.alias}}</div>
				<template v-if="field.operation < 4">
					<div class="mb10" v-for="(value,index) in field.value">{{value.key}}</div>
					<el-divider></el-divider>
				</template>
				<template v-else>
					<template v-if="field.operation == 4">
						<div v-for="(value,index) in field.value" class="mb10 flex flex-center"
							style="flex-wrap: wrap;">
							<el-image class="mr10 mb10" :preview-src-list="getImgUrl(value.key)"
								style="width: 100px; height: 100px"
								v-for="(img,index) in getImgUrl(value.key)" :key="index" :src="img">
							</el-image>
						</div>
						<el-divider></el-divider>
					</template>
					<template v-if="field.operation == 5">
						<div v-for="(value,index) in field.value" class="mb10 flex flex-center"
							style="flex-wrap: wrap;">
							<div class="mr10 mb10">{{value.key}}</div>
						</div>
						<el-divider></el-divider>
					</template>
				</template>
					
					
			</div>
		
		</div> -->
	</div>
</template>

<script>
	import fieldConfig from '@/views/supplyRange/components/fieldConfig.vue'
	import editFieldConfig from '@/views/supplyRange/components/editFieldConfig.vue'
	export default {
		name: "index",
		props: {
			plateData: {
				type: Array,
				default: () => {
				  return []
				}
			},
			pageType: {
				type: String,
				default: 'new'
			}
		},
		components: {
			fieldConfig,
			editFieldConfig
		},
		data() {
			return {
				tableData: [],
				isSetting: false,
				openRow: {},
				indexItem: 1,
				indexField: 1,
				imgUrl: this.$store.state.basics.img_url_plate,
			};
		},
		methods: {
			
			getImgUrl(str) {
			  let imgArr = str.split(',')
			
			  for (let i in imgArr) {
			    imgArr[i] = this.imgUrl + imgArr[i]
			  }
			  return imgArr
			},
			toField(item,indexItem,indexField) {
				console.log(item);
				this.openRow = item
				this.isSetting = true
				this.indexItem = indexItem
				this.indexField = indexField
			},
			closeField() {
				this.isSetting = false
			},
			getValue(data) {
				console.log('getValue',data);
				let indexItem = this.indexItem
				let indexField = this.indexField
				this.tableData[indexItem].field[indexField].values = data
				console.log(this.tableData);
				this.$emit('getParamData',this.tableData)
			},
		},
		created() {
			console.log(this.plateData);
			this.tableData = this.plateData
		}
	};
</script>

<style>
</style>