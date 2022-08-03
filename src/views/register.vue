<template>
	<div class="register">
		<el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
			<h3 class="title">企业供应管理系统</h3>

			<el-form-item prop="userName" label="机构名称">
				<el-input v-model="registerForm.userName" type="text" auto-complete="off" placeholder="机构名称">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
				</el-input>
			</el-form-item>
			<el-form-item prop="phonenumber">
				<el-input v-model="registerForm.phonenumber" type="text" auto-complete="off" placeholder="手机号">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
				</el-input>
			</el-form-item>
			<el-form-item prop="code">
				<el-input v-model="registerForm.code" type="text" auto-complete="off" placeholder="验证码">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
					<el-button slot="suffix" type="button" class="yan" :disabled="disabled" @click="getMyCode()">
						{{codeText}}
					</el-button>
				</el-input>
			</el-form-item>



			<el-form-item style="width:100%;">
				<el-button :loading="loading" size="medium" type="primary" style="width:100%;"
					@click.native.prevent="handleRegister">
					<span v-if="!loading">注 册</span>
					<span v-else>注 册 中...</span>
				</el-button>
				<div style="float: right;">
					<router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
				</div>
			</el-form-item>
		</el-form>
		<!--  底部  -->
		<div class="el-register-footer">
			<span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
		</div>
	</div>
</template>

<script>
	import {
		getCode,
		verifyCode,
		userRegister,
		userLogin,
	} from "@/api/login";

	export default {
		name: "Register",
		data() {
			return {
				codeUrl: "",
				codeText: "获取验证码",
				disabled: false,
				registerForm: {
					userName: "李坤祥机构",
					phonenumber: "17746071523",
					code: "",
				},
				registerRules: {
					userName: [{
							required: true,
							trigger: "blur",
							message: "请输入机构名称"
						},
						{
							min: 2,
							max: 20,
							message: '机构名称长度必须介于 2 和 20 之间',
							trigger: 'blur'
						}
					],
					phonenumber: [{
							required: true,
							trigger: "blur",
							message: "请输入手机号"
						},
						{
							min: 5,
							max: 20,
							message: '手机号长度11',
							trigger: 'blur'
						}
					],
					code: [{
						required: true,
						trigger: "change",
						message: "请输入验证码"
					}]
				},
				loading: false,
				captchaOnOff: true
			};
		},
		created() {},
		methods: {

			//获取验证码--按钮
			getMyCode() {
				if (this.registerForm.phonenumber == "" || this.registerForm.userName == '') {
					this.$message.error("手机号或机构名称不得为空");
				} else {
					let maxNum = 60;
					let oldCodeText = this.codeText;
					this.codeText = `${maxNum}s重新发送`; //初始显示倒计时
					this.disabled = true;
					this.sendCode(1)
					let codeCountDown = setInterval(() => {

						let countDownNum = maxNum--;
						this.codeText = `${countDownNum}s重新发送`;
						if (countDownNum == 0) {
							//倒计时结束
							this.codeText = oldCodeText;
							clearInterval(codeCountDown);
							this.disabled = false;
						}
					}, 1000);
				}
			},
			// 发送验证码
			async sendCode(type) {
				let phone = this.registerForm.phonenumber
				await getCode(phone, type).then(res => {
					console.log(res);
				})
			},
			// 校验验证码是否正确
			async checkCode() {
				let phone = this.registerForm.phonenumber
				let code = this.registerForm.code
				await verifyCode(phone, code).then(res => {
					console.log(res);
					if (res.OK == 'True') {
						if (res.Tag > 0) {
							this.userRegister()
						} else {
							this.$message({
								message: '验证码错误',
								type: 'error'
							});
						}
					}
				})
			},
			// 注册账号
			async userRegister() {
				await userRegister({
					phonenumber: this.registerForm.phonenumber,
					code: this.registerForm.code,
					userName: this.registerForm.userName
				}).then(res => {
					if (res.OK == 'True') {
						if (res.Tag.guid) {
							// 注册成功
							const username = this.registerForm.phonenumber;
							this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>",
								'系统提示', {
									dangerouslyUseHTMLString: true
								}).then(() => {
								this.$router.push("/login");
							}).catch(() => {});
						}
					}
				})
			},

			handleRegister() {
				this.$refs.registerForm.validate(valid => {
					if (valid) {
						this.loading = true;

						this.checkCode()
					}
				});
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	.register {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-image: url("../assets/images/login-background.jpg");
		background-size: cover;
	}

	.title {
		margin: 0px auto 30px auto;
		text-align: center;
		color: #707070;
	}

	.register-form {
		border-radius: 6px;
		background: #ffffff;
		width: 400px;
		padding: 25px 25px 5px 25px;

		.el-input {
			height: 38px;

			input {
				height: 38px;
			}
		}

		.input-icon {
			height: 39px;
			width: 14px;
			margin-left: 2px;
		}
	}

	.register-tip {
		font-size: 13px;
		text-align: center;
		color: #bfbfbf;
	}

	.register-code {
		width: 33%;
		height: 38px;
		float: right;

		img {
			cursor: pointer;
			vertical-align: middle;
		}
	}

	.el-register-footer {
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		font-family: Arial;
		font-size: 12px;
		letter-spacing: 1px;
	}

	.register-code-img {
		height: 38px;
	}
</style>
