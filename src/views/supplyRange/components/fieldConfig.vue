<template>
	<el-dialog :title="title" :visible.sync="isOpen" width="700px" @close="beforeClose" append-to-body>
		<div style="padding-bottom: 40px;max-height: 700px;overflow-y: auto;">
			<div v-if="contentFDCode == 'c00003'">
				<div id="container" class="map">
					<div>
						<div>地图加载中....</div>
						<div>若长时间打不开，请刷新</div>
					</div>
				</div>
			</div>
			<div v-if="contentFDCode == 'c00008'">
				<provincesTree @save="getProvinces" areaType="0"></provincesTree>
			</div>
			<div v-if="contentFDCode == 'c00009'">
				<provincesTree @save="getProvinces" areaType="1"></provincesTree>
			</div>
			<div v-if="contentFDCode == 'c00010'">
				<provincesTree @save="getProvinces" areaType="2"></provincesTree>
			</div>
			<div v-if="contentFDCode == 'c00011'">
				<provincesTree @save="getProvinces" areaType="3"></provincesTree>
			</div>
			<div v-if="contentFDCode == 'c00012'">
				<provincesTree @save="getProvinces" areaType="4"></provincesTree>
			</div>
			<div v-if="contentFDCode == 'c00007'">
				<el-date-picker v-model="fieldValue" @change="changeDate" value-format="yyyy-MM-dd HH:mm:ss" type="date"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div v-if="contentFDCode == 'c00017'">
				<el-date-picker v-model="fieldValue" @change="changeDate" value-format="yyyy-MM-dd HH:mm:ss"
					type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
				</el-date-picker>
			</div>
			<div v-if="contentFDCode == 'c00018'">
				<el-date-picker v-model="fieldValue" @change="changeDate" value-format="yyyy-MM-dd HH:mm:ss"
					type="datetime" format="yyyy-MM-dd HH" placeholder="选择日期时间">
				</el-date-picker>
			</div>

			<!-- /////////////////////////////////////////////////////////////////////////////////////////////////////// -->

			<div v-if="fieldObj.operation == '1' && !contentFDCode">
				<div v-for="(item,index) in fieldContent" :key="index">
					<div>
						<el-radio class="mb10" v-model="fieldValue" :label="item.display">{{item.display}}
						</el-radio>
					</div>

				</div>


			</div>
			<div v-if="fieldObj.operation == '2' && !contentFDCode">
				<div v-for="(item,index) in fieldContent" :key="index">
					<div>
						<el-checkbox-group v-model="checkList" @change="changeCheck">
							<el-checkbox :label="item.display"></el-checkbox>
						</el-checkbox-group>
					</div>

				</div>

			</div>

			<div v-if="fieldObj.operation == '3' && !contentFDCode">
				<template v-if="fieldFDCode=='f00051'">
					<el-input v-model="fieldValue" type="number" placeholder="请输入内容"></el-input>
				</template>
				<template v-else>
					<el-input v-model="fieldValue" :type="fieldFDCode" placeholder="请输入内容"></el-input>
				</template>

			</div>
			<div v-if="fieldObj.operation == '4' && !contentFDCode">
				<el-upload ref="upload" class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false"
					:on-change="preUploadImg" :http-request="uploadImg" :multiple="true"
					:on-success="handleAvatarSuccess">
					<div class="flex" style="flex-wrap: wrap;">
						<el-image class="mr10 mb10" style="width: 100px; height: 100px" :src="img"
							v-for="(img,index) in imgListShow" :key="index" fit="fit"></el-image>
						<div class="flex flex-center non-image">
							<div class="el-icon-plus" style="font-size: 36px;"></div>
						</div>
					</div>
				</el-upload>
			</div>


			<div v-if="fieldObj.placeholder">
				提示: {{fieldObj.placeholder}}
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit" :disabled="!uploadUrl.length>0 && !fieldValue ">保 存
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import $ from 'jquery';
	let map, marker, polygon, drawingManager, lngLat, ap;
	import provincesTree from '@/views/components/common/provincesTree.vue'
	import {
		upLoadImgApi,
	} from '@/api/commonApi.js'
	import {
		uploadImgToBase64
	} from '@/utils/base64.js' // 导入本地图片转base64的方法
	export default {
		name: "index",
		props: {
			fieldObj: {
				type: Object,
				default: () => {
					return {}
				}
			},
			pageType: {
				type: String,
				default: 'new'
			}
		},
		components: {
			provincesTree
		},
		data() {
			return {
				isOpen: true,
				title: '编辑',
				dateC00007: '',
				dateC00017: '',
				dateC00018: '',
				contentFDCode: '', // 字段来源于固化时，key的值
				editForm: {
					Longitude: '', // 经度
					Latitude: '' // 纬度
				},
				position: [{
					longitude: 0, // 经度
					latitude: 0, // 纬度
					city: ''
				}],
				provincesObj: {}, // 地区选择
				fieldContent: [],
				checkList: [],
				uploadUrl: [],
				imgListShow: [], // 展示列表
				pramasObj: {}, // 
				values: [],
				fieldValue: '',
				contentSource: '',
				fieldFDCode: '', // 字段code
				step: 0,
			};
		},
		methods: {
			changeDate(val) {
				// 获取当前时间的时间戳 
				console.log(val);
				if (this.fieldFDCode == 'f00053') {
					let nowTime = new Date().getTime()
					let chooseTime = new Date(val).getTime()
					if (chooseTime < nowTime) {
						this.$message({
							message: '填写供应【报价失效时间】，不早于当前时间!',
							type: 'error'
						});
						this.fieldValue = ''
					} else if (this.contentFDCode == 'c00018') {
						let str = '00:00'
						val = val.slice(0,14).concat(str)
						this.fieldValue = val
					}
				}
			},
			changeCheck(val) {
				this.checkList = val
				this.fieldValue = this.checkList.toString()
			},
			close() {
				this.isOpen = false
				this.$emit('close')
				console.log(99999);
			},
			beforeClose() {
				this.close()
			},
			submit() {
				let operation = this.fieldObj.operation
				if (operation == 1) {
					this.values[0] = {
						value: this.fieldValue
					}
					this.close()
					this.$emit('getValue', this.values)
				} else if (operation == 2) {
					this.values[0] = {
						value: this.fieldValue
					}
					this.close()
					this.$emit('getValue', this.values)
				} else if (operation == 3) {
					this.values[0] = {
						value: this.fieldValue
					}
					this.close()
					this.$emit('getValue', this.values)
				} else if (operation == 4) {
					let arr = []
					for (let i in this.uploadUrl) {
						let obj = {
							key: this.uploadUrl[i]
						}
						arr.push(obj)
					}
					this.values = arr
					this.$refs.upload.submit();
				} else if (operation == 5) {
					let arr = []
					for (let i in this.uploadUrl) {
						let obj = {
							key: this.uploadUrl[i]
						}
						arr.push(obj)
					}
					this.values = arr
				}

			},
			// 选地区时
			chooseArea() {
				let data = this.provincesObj
				let contentFDCode = this.contentFDCode
				let level = '0'
				if (contentFDCode == 'c00009') {
					level = '1'
				} else if (contentFDCode == 'c000010') {
					level = '2'
				} else if (contentFDCode == 'c000011') {
					level = '3'
				} else if (contentFDCode == 'c000012') {
					level = '4'
				}
				this.fieldValue = data.address
			},
			getProvinces(data) {
				// let contentFDCode = this.contentFDCode
				// let level = '0'
				// if(contentFDCode == 'c00009') {
				// 	level = '1'
				// } else if(contentFDCode == 'c000010') {
				// 	level = '2'
				// } else if(contentFDCode == 'c000011') {
				// 	level = '3'
				// } else if(contentFDCode == 'c000012') {
				// 	level = '4'
				// }
				// if (data.level != level) {
				// 	this.$message({
				// 		message: '只能选择最后一级',
				// 		type: 'error'
				// 	});
				// } else {
				// 	this.$emit('getProvinces', data)
				// 	this.close()
				// }
				this.provincesObj = data
				console.log('98989');
				this.chooseArea()
			},


			// 图片上传相关
			handleAvatarSuccess(res, file) {},
			preUploadImg(file, fileList) {
				this.imgList = fileList
				let imgList = fileList
				let arr = imgList.map(item => URL.createObjectURL(item.raw))
				let uploadUrl = imgList.map(item => item.name)
				this.uploadUrl = uploadUrl
				console.log(arr, uploadUrl.toString());
				this.imgListShow = arr
			},
			// 正经上传图片
			async uploadImg(item) {
				console.log(item);
				const response = await uploadImgToBase64(item.file)
				const base64File = response.result.replace(/.*;base64,/, '')
				let FileName = item.file.name
				let FilePath = 'aprc\\plates\\imgs'
				let data = base64File
				upLoadImgApi(data, FileName, FilePath).then(res => {
					if (res.OK == 'True') {
						this.step++
						if (this.step == this.imgList.length) {
							this.close()
							this.$emit('getValue', this.values)
						}

					}
				})
			},


			/**
			 * /定位获得当前位置信息
			 */
			getMyLocation() {
				var geolocation = new qq.maps.Geolocation('GDLBZ-RS7WF-2FLJR-NYHHE-GVL36-TCBKQ', '定位')
				geolocation.getLocation(this.showPosition, this.showErr)
			},
			showPosition(position) {
				this.position.latitude = position.lat
				this.position.longitude = position.lng

				this.searchVal = position.addr
				console.log(position)
				this.setMapData()
			},
			// 定位失败再请求定位，测试使用
			showErr() {
				console.log('定位失败，请重试！')
				this.getMyLocation()
			},
			/**
			 * 位置信息在地图上展示
			 */
			setMapData() {
				var myLatlng = new qq.maps.LatLng(this.position.latitude, this.position.longitude)
				var myOptions = {
					zoom: 16,
					center: myLatlng,
					mapTypeId: qq.maps.MapTypeId.ROADMAP
				}
				// 获取dom元素添加地图信息
				map = new qq.maps.Map(
					document.getElementById('container'),
					myOptions
				)
				// 给定位的位置添加图片标注
				marker = new qq.maps.Marker({
					position: myLatlng,
					map: map,
					draggable: true // 允许鼠标拖动
				})
				this.mouseClick()
			},
			/**
			 * 鼠标点击获取标记位置事件
			 */
			mouseClick() {
				const _this = this
				qq.maps.event.addListener(map, 'click', function(event) {
					if (!marker) {
						marker = new qq.maps.Marker({
							position: event.latLng,
							map: map
						})
						return
					}
					marker.setPosition(event.latLng)
					_this.position.latitude = event.latLng.getLat()
					_this.position.longitude = event.latLng.getLng()
					_this.getAdress()
				})
			},

			getAddressLoction() {
				var data = {
					address: this.searchVal,
					key: "GDLBZ-RS7WF-2FLJR-NYHHE-GVL36-TCBKQ",
					output: "jsonp"
				}
				console.log('this.map', this.map)
				console.log(this.marker)
				$.ajax({
					type: "GET",
					url: "https://apis.map.qq.com/ws/geocoder/v1",
					async: false,
					data: data,
					dataType: "jsonp",
					success: (result) => {
						console.log(this.marker)
						console.log(result);
						let location = result.result.location
						console.log(location);
						let latitude = location.lat
						let longitude = location.lng
						let center = new TMap.LatLng(latitude, longitude);
						//创建并初始化MultiMarker
						// this.marker.updateGeometries([{
						// 	"styleId": "marker",
						// 	"id": "1",
						// 	"position": new TMap.LatLng(39.994104, 116.287503),
						// }])

					},
					error: function(xhr, errorType, error) {

						$.alert(error);

					},
					complete: function() {

					}

				});
			},

			getAdress() {

				const that = this;

				var location = this.position.latitude + ',' + this.position.longitude

				var data = {
					location: location,
					key: "GDLBZ-RS7WF-2FLJR-NYHHE-GVL36-TCBKQ",
					output: "jsonp"
				}
				$.ajax({
					type: "GET",
					url: "https://apis.map.qq.com/ws/geocoder/v1",
					async: false,
					data: data,
					dataType: "jsonp",
					success: (result) => {
						console.log('result111', result);
						this.fieldValue = result.result.address
					},
					error: function(xhr, errorType, error) {

						$.alert(error);

					},
					complete: function() {

					}

				});

				// var data1 = {
				// 	boundary: 'nearby(' + this.position.latitude + ',' + this.position.longitude + ',' + 100 + ')',
				// 	page_size: 5,
				// 	page_index: 1,
				// 	key: "GDLBZ-RS7WF-2FLJR-NYHHE-GVL36-TCBKQ",
				// 	output: "jsonp"
				// }
				// $.ajax({
				// 	type: "GET",
				// 	url: "https://apis.map.qq.com/ws/place/v1/explore",
				// 	async: false,
				// 	data: data1,
				// 	dataType: "jsonp",
				// 	success:(result) => {
				// 		console.log(result);
				// 		let arr = result.data
				// 		for (let i in arr) {
				// 			arr[i].check = false
				// 		}
				// 		this.addressList = arr
				// 	},
				// 	error: function(xhr, errorType, error) {

				// 		$.alert(error);

				// 	},
				// 	complete: function() {

				// 	}

				// });

			},

			chooseAddress(index) {
				console.log(index);
				let address = this.addressList[index]
				let lat = address.location.lat
				let lng = address.location.lng
				let name = address.address
				for (let i in this.addressList) {
					if (i == index) {
						this.addressList[i].check = true
					} else {
						this.addressList[i].check = false
					}
				}
				let url = 'http://' + lat + '_' + lng + '_' + name
				this.url = url
				console.log(url);
			},
		},
		created() {
			console.log(this.fieldObj);
			this.title = '编辑(' + this.fieldObj.alias + ')'
			let source = this.fieldObj.source
			this.contentSource = this.fieldObj.contentSource
			this.fieldFDCode = this.fieldObj.fieldFDCode
			let key = ''
			if (source == '1') {
				key = this.fieldObj.content.length ? this.fieldObj.content[0].contentFDCode : ''
				if (key == 'c00008') {
					// 行政区域国家/地区
				} else if (key == 'c00009') {
					// 行政区域省级
				} else if (key == 'c00010') {
					// 行政区域市级
				} else if (key == 'c00011') {
					// 行政区域区县级
				} else if (key == 'c00012') {
					// 行政区域镇级
				} else if (key == 'c00007') {
					// 日期-年月日
				} else if (key == 'c00017') {
					// 日期-年月日时分
				} else if (key == 'c00018') {
					// 日期-年月日时
				} else if (key == 'c00003') {
					// 地图
					this.getMyLocation()
				} else {
					key = ''
				}
				this.contentFDCode = key
			} else {
				if (this.fieldObj.operation == '3') {
					key = ''
				}
				this.contentFDCode = key
			}
			console.log('this.contentFDCode', this.contentFDCode);
			this.fieldContent = this.fieldObj.content
			console.log('pageType', this.pageType);

		}
	};
</script>

<style lang="scss" scoped>
	.map {
		z-index: 9999;
		width: 100% !important;
		height: 400px !important;
	}

	.non-image {
		width: 100px;
		height: 100px;
		justify-content: center;
		background-color: #F5F7FA;
	}
</style>
