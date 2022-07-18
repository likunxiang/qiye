<template>
	<div v-loading="loading">
		<el-tree :data="tableData" :props="defaultProps" @node-expand="getSon" @node-click="getClassDate"></el-tree>
		<div style="width: 100%;text-align: center;margin: 10px auto;">
			<el-button type="primary" @click="saveObj">保存</el-button>
		</div>
	</div>
</template>

<script>
	import {
		getWithHasCatTreeList, // 先查顶级
    getFirstSceneList, // 再查一级
		getSonWithHasCatFlagList,
		getListByCatTreeGuid
	} from '@/api/categoryRole/categoryCommon.js'
	export default {
		name: "index",
    props: {
      isClass: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				tableData: [],
				defaultProps: {
					children: 'children',
					label: 'name',
				},
				classCheckObj: {}, // 预选品类
				sureObj: {}, // 保存品类
        loading: false,
			};
		},
		methods: {
			closeTree() {
				this.$emit('close', )
			},
			saveObj() {
				this.sureObj = this.classCheckObj
				let data = this.sureObj
				this.$emit('save', data)
			},
			async getWithHasCatTreeList() {
        this.loading = true
				await getWithHasCatTreeList().then(res => {
					console.log(res);
          this.loading = false
					let data = res.Tag[0].Table
          if (this.isClass) {
            this.tableData = data
            return
          }
					for (let i in data) {
						if (data[i].hasSon == '1') {
							data[i].children = [{
								name: '加载中...'
							}]
						}
					}
          this.tableData = data
					
				})
			},
      async getFirstSceneList(data) {
        await getFirstSceneList({
          cattypeGuid: data.guid
        }).then(res => {
          if (res.Tag.length) {
          	// let data = res.Tag[0].Table
          	let arr = res.Tag[0].Table
          	for (let i in arr) {
          		if (arr[i].hasSon == '1') {
          			arr[i].children = [{
          				name: '加载中...'
          			}]
          		} else {
          			if (arr[i].hasCategory == '1') {
          				arr[i].children = [{
          					name: '加载中...'
          				}]
          			}
          		}
          	}
          	data.children = arr
          } else {
          	data.children = []
          }
        })
      },
			getSon(data) {
        if(this.isClass) {
          return
        }
				if (data.hasSon == '1') {
          this.getFirstSceneList(data)
					// this.getSonWithHasCatFlagList(data)
				} else {
					if (data.hasCategory == '1') {
						this.getListByCatTreeGuid(data)
					} else {
						this.classCheckObj = data
						console.log(this.classCheckObj);
					}
				}
			},
			getClassDate(data) {
        if (this.isClass) {
          this.classCheckObj = data
        } else {
          if (data.hasSon == '1') {
          	return
          } else {
          	if (data.hasCategory == '1') {
          		return
          	} else {
          		this.classCheckObj = data
          	}
          }
        }

			},
			async getSonWithHasCatFlagList(data) {
				let id = data.guid
				let level = data.level
				await getSonWithHasCatFlagList({
					guid: id,
					level: level || '99'
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						for (let i in arr) {
							if (arr[i].hasSon == '1') {
								arr[i].children = [{
									name: '加载中...'
								}]
							} else {
								if (arr[i].hasCategory == '1') {
									arr[i].children = [{
										name: '加载中...'
									}]
								}
							}
						}
						data.children = arr
					} else {
						data.children = []
					}
				})
			},
			// 获取详细品类
			async getListByCatTreeGuid(data) {
				let id = data.guid
				await getListByCatTreeGuid({
					catTreeGuid: id
				}).then(res => {
					console.log(res);
					if (res.Tag.length) {
						// let data = res.Tag[0].Table
						let arr = res.Tag[0].Table
						let obj = {}
						let goodsList = []
						for (let i in arr) {
							if (arr[i].hasSon == '1') {
								arr[i].children = [{
									name: '加载中...'
								}]
							}
							obj = {
								name: arr[i].categoryName,
								guid: arr[i].categoryGuid
							}
							goodsList.push(obj)
						}
						data.children = goodsList
					} else {
						data.children = []
					}
				})
			}
		},
		created() {
			this.getWithHasCatTreeList()
		}
	}
</script>

<style scoped lang="scss">
</style>
