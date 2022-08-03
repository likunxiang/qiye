<template>
	<div>
		<div v-for="(item,index) in tableData" :key='index'>
			<div class="title-bg mb10">{{item.name}}</div>
			<div v-for="(type,index) in item.type">
				<div class="mb10">| {{type.name}}</div>
				<div v-for="(field,index) in type.field">
					<div class="mb10 bold">{{field.name}}</div>
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
			</div>
		
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: {
			plateData: {
				type: Array,
				default: () => {
				  return []
				}
			}
		},
		data() {
			return {
				tableData: []
			};
		},
		methods: {
		},
		created() {
			this.tableData = this.plateData
		}
	};
</script>

<style>
</style>