<template>
	<div class="login">
		<el-form ref="loginForm" :model="loginForm" label-position="left" :rules="loginRules" class="login-form">
			<h3 class="title">企业供应管理系统</h3>
			<el-form-item prop="phonenumber">
				<el-input v-model="loginForm.phonenumber" type="text" auto-complete="off" placeholder="手机号">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
				</el-input>
			</el-form-item>
			<el-form-item prop="code">
				<el-input v-model="loginForm.code" type="text" auto-complete="off" placeholder="验证码">
					<svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
					<el-button slot="suffix" type="button" class="yan" :disabled="disabled" @click="getMyCode()">
						{{codeText}}</el-button>
				</el-input>
			</el-form-item>

			<el-form-item style="width:100%;">
				<el-button :loading="loading" size="medium" type="primary" style="width:100%;"
					@click.native.prevent="handleLogin">
					<span v-if="!loading">登 录</span>
					<span v-else>登 录 中...</span>
				</el-button>
				<div style="float: right;" v-if="register">
					<router-link class="link-type" :to="'/register'">立即注册</router-link>
				</div>
			</el-form-item>
		</el-form>
		<!--  底部  -->
		<div class="el-login-footer">
			<!-- <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span> -->
			<a href="https://beian.miit.gov.cn/" target="_blank">闽ICP备20005372号-2</a>
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
	import Cookies from "js-cookie";
	import {
		encrypt,
		decrypt
	} from '@/utils/jsencrypt'

	export default {
		name: "Login",
		data() {
			return {
				pageType: 'register',  // 'register' 注册    'login' 登录
				codeText: "获取验证码",
				disabled: false,
				codeUrl: "",
				cookiePassword: "",
				loginForm: {
					// userName: '',
					phonenumber: '17746071523',
					code: '251483',
				},
				loginRules: {
					phonenumber: [{
						required: true,
						trigger: "blur",
						message: "请输入手机号"
					}],
					code: [{
						required: true,
						trigger: "blur",
						message: "请输入验证码"
					}],
				},
				loading: false,
				// 验证码开关
				captchaOnOff: true,
				// 注册开关
				register: true,
				redirect: undefined
			};
		},
		watch: {
			$route: {
				handler: function(route) {
					this.redirect = route.query && route.query.redirect;
				},
				immediate: true
			}
		},
		created() {
		},
		methods: {
			
			//获取验证码--按钮
			getMyCode() {
			  if (this.loginForm.phonenumber == "") {
			    this.$message.error("手机号不得为空");
			  } else {
			    let maxNum = 60;
			    let oldCodeText = this.codeText;
			    this.codeText = `${maxNum}s重新发送`; //初始显示倒计时
			    this.disabled = true;
			    this.sendCode(2)
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
			  let phone = this.loginForm.phonenumber
			  await getCode(phone,type).then(res => {
			    console.log(res);
			  })
			},
			// 校验验证码是否正确
			async checkCode() {
			  let phone = this.loginForm.phonenumber
			  let code = this.loginForm.code
			  await verifyCode(phone,code).then(res => {
			    console.log(res);
			    if(res.OK == 'True') {
			      if (res.Tag > 0) {
			        this.$store.dispatch("Login", this.loginForm).then(() => {
						console.log('登录成功',this.redirect);
						
						this.$router.push({ path: this.redirect || "/" }).catch((err)=>{
							console.log('跳转失败','err');
							return
						});
			        }).catch(() => {
			        	this.loading = false;
						console.log('失败这里？');
			        });
			      } else {
			        this.$message({
			          message: '验证码错误',
			          type: 'error'
			        });
			      }
			    }
			  })
			},
			
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
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
	.login {
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

	.login-form {
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

	.login-tip {
		font-size: 13px;
		text-align: center;
		color: #bfbfbf;
	}

	.login-code {
		width: 33%;
		height: 38px;
		float: right;

		img {
			cursor: pointer;
			vertical-align: middle;
		}
	}

	.el-login-footer {
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

	.login-code-img {
		height: 38px;
	}
</style>
