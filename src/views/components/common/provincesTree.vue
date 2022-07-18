<template>
	<div v-loading="loading">
		<el-tree :data="tableData" :props="defaultProps" highlight-current @node-expand="getSon" @node-click="getClassDate"></el-tree>
	</div>
</template>

<script>
	import {
		getProvince,
		getCity,
		getCounty,
	} from '@/api/commonApi.js'
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
				tableData: [{
          cityGuid: '0',
          cityName: '中国大陆',
          children: [
            {
              cityName: '加载中...'
            }
          ]
        }],
				defaultProps: {
					children: 'children',
					label: 'cityName',
				},
				checkObj: {}, // 预选品类
				sureObj: {}, // 保存品类
        loading: false,
        treeTitle1: [],
        treeTitleString1: '',
        address: ''
			};
		},
		methods: {
			closeTree() {
				this.$emit('close', )
			},
			getClassDate(data,node) {
        let level = node.level
        console.log(data);
        console.log(node);
        this.treeTitle1 = []
        this.treeTitleString1 = ''
        this.getParent(node)
			  this.checkObj = data
        this.checkObj.level = level
        this.checkObj.treeTitleString = this.treeTitleString1
        this.checkObj.address = this.address
        this.$emit('save', this.checkObj)
			},
      getParent(node) {
        console.log('node111',node);
      	let nodeObj = node
      	let nodeTitle = node.data.cityName
      	let level = node.level
        console.log('nodeLevel',level);
      	this.treeTitle1.push(nodeTitle)
      	if (level > 1) {
      		this.getParent(nodeObj.parent)
      	} else {
          let treeTitle = this.treeTitle1

          if (typeof(treeTitle) == 'string') {
            this.treeTitleString1 = treeTitle
          } else {
            if(this.byteType=='edit') {
              treeTitle.shift()
              this.treeTitleString1 = treeTitle.reverse().join(" > ")
              this.address = treeTitle.join('')
            } else {
              this.treeTitleString1 = treeTitle.reverse().join(" > ")
              this.address = treeTitle.join('')
            }
          }
      	}
      },

			getSon(data,node) {
        console.log('level',node.level);
        let level = node.level
        if(level == '1') {
          // 请求省
          this.getProvince(data)
        } else if (level == '2') {
          // 请求市
          this.getCity(data)
        } else if (level == '3') {
          // 请求区
          this.getCounty(data)
        } else {
          return
        }
			},
      async getProvince(data) {
        await getProvince().then(res => {
          if (res.OK == 'True') {
            if (res.Tag.length) {
              let arr = res.Tag[0].Table
              for (let i in arr) {
              	arr[i].children = [{
              		cityName: '加载中...'
              	}]
              }
            	data.children = arr
            } else {
            	data.children = []
            }
          }
        })
      },
      async getCity(data) {
        await getCity({
          fatherCityId: data.cityId
        }).then(res => {
          if (res.OK == 'True') {
            if (res.Tag.length) {
              let arr = res.Tag[0].Table
              for (let i in arr) {
              	arr[i].children = [{
              		cityName: '加载中...'
              	}]
              }
            	data.children = arr
            } else {
            	data.children = []
            }
          }
        })
      },
      async getCounty(data) {
        await getCounty({
          fatherCityId: data.cityId
        }).then(res => {
          if (res.OK == 'True') {
            if (res.Tag.length) {
              let arr = res.Tag[0].Table
            	data.children = arr
            } else {
            	data.children = []
            }
          }
        })
      },
		},
		created() {

		}
	}
</script>

<style scoped lang="scss">
</style>
