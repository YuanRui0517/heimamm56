<template>
  <div class="login">
    <div class="left">
      <div class="header">
        <img class="left-logo" src="@/assets/img/login_logo.png" alt="" />
        <span class="t1">黑马面面</span>
        <div class="line"></div>
        <span class="t2">用户登陆</span>
      </div>
      <!-- 
el-form 
    model:整个form值的绑定
    label-width:文本标题宽度
el-form-item  
    label:标题

表单验证
1：model绑定  rules绑定
2:需要验证的每一项加上一个prop="后面v-model对应值的后面的那个属性名"
3:验证规则
  prop对应值在rules里面写规则：[
  {required:true,message:错误信息,trigger:"blur/change"},
  {min:最小长度,max:最大长度,message:"错误提示",trigger:"blur/change"}
  ]
4:全局验证：   1在el-form上加一个ref  2:this.$refs.值.validate(reulst=>{true:验证通过，false:验证失败})

       -->
      <el-form class="form" :model="form" :rules="rules" ref="form">
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-row
                el-col  :span="多少拦(24)" -->
          <el-row>
            <el-col :span="16">
              <el-input
                placeholder="请输入验证码"
                v-model="form.code"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <img
                @click="refreshCodeUrl"
                v-if="bol"
                class="code-img"
                :src="codeUrl"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isPass">
          <el-checkbox v-model="form.isPass"
            >我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
              type="primary"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="submit">登陆</el-button>
          <br />
          <el-button class="btn" type="primary" @click="showRegister"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <img src="@/assets/img/login_right.png" alt="" />
    <!-- 组件套用组件 
    1：导入   2：注册   3：当标签使用
    -->
    <register ref="register"></register>
  </div>
</template>
<script>
// import的东西在html里面都不能直接使用
import register from './register'
import { toLogin } from '@/api/login.js'
import { saveLocal, getLocal } from '@/utils/local.js'
export default {
  components: {
    register,
  },
  // 已有token，跳转至layout
  created() {
    if (getLocal()) {
      this.$router.push('/layout')
    }
  },
  data() {
    return {
      bol: true,
      codeUrl: process.env.VUE_APP_URL + '/captcha?type=login',
      form: {
        phone: '18122221111', //是	string	手机号
        password: '123456', //是	string	密码
        code: '', //是	string	验证码
        isPass: true,
      },
      rules: {
        // required非空验证
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('请正确输入手机号'))
              }
            },
            trigger: 'change',
          },
        ], //是	string	手机号
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'change' },
        ], //是	string	密码
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          {
            min: 4,
            max: 4,
            message: '请输入四位验证码',
          },
        ], //是	string	验证码
        isPass: [
          { required: true, message: '请勾选协议', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value === true) {
                callback()
              } else {
                callback(new Error('请勾选协议'))
              }
            },
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    // 刷新验证码
    refreshCodeUrl() {
      // 静默刷新
      // this.bol = false
      // this.$nextTick(() => {
      //   this.bol = true
      // })
      this.codeUrl =
        process.env.VUE_APP_URL + '/captcha?type=login&wsdgsdg=' + Date.now()
    },
    // 打开注册页面
    showRegister() {
      // 父调用子的一个属性修改它的值   1：在子组件标签上定义一个ref  2:访问子组件this===this.$refs.值.isShow=true
      this.$refs.register.isShow = true
    },
    // 登陆按钮点击
    submit() {
      this.$refs.form.validate((result) => {
        if (result) {
          // 弹窗提示 $message
          /*
          this.$message("提示内容")
          this.$message.info("提示内容")
          this.$message.success("成功提示")
          this.$message.error("出错的提示")
          this.$message.warning("警告提示")
          this.$message({
            type:"success",
             message: '恭喜你，这是一条成功消息',
          })
          */
          // this.$message.success('验证通过')
          toLogin(this.form).then((res) => {
            this.$message.success('登陆成功')
            // 出于方便以后维护，我们一般会把这种token操作存储为一个工具型方法
            saveLocal(res.data.token)
            // window.localStorage.setItem('token', res.data.token)
            // 路由跳转
            this.$router.push('/layout')
            window.console.log('res登陆成功:', res.data.token)
          })
        } else {
          this.$message({
            type: 'error',
            message: '验证失败',
          })
        }
      })
    },
  },
}
</script>
<style lang="less">
.login {
  background: linear-gradient(to right, #1494fa, #01c6fa);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .header {
      display: flex;
      align-items: center;
    }
    .left-logo {
      width: 22px;
      height: 17px;
      margin-right: 20px;
    }
    .t1 {
      font-size: 24px;
      font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #0c0c0c;
    }
    .line {
      width: 1px;
      height: 28px;
      background: #c7c7c7;
      margin: 0 15px;
    }
    .t2 {
      font-size: 22px;
      font-family: PingFangSC Regular, PingFangSC Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #0c0c0c;
    }
    .form {
      margin-top: 20px;
      .code-img {
        width: 100%;
        height: 40px;
      }
      .btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
