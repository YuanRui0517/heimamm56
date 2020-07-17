<template>
  <!-- el-dialog 
   visible:控制是否显示
   width
   show-close:boolean值， 是否显示关闭按钮
   slot="title/footer"
 -->
  <el-dialog
    :visible="isShow"
    width="600px"
    class="register"
    :show-close="false"
  >
    <div slot="title" class="register-title">用户注册</div>
    <!-- form表单
    el-form   model="值的绑定{}"  rules   label-width标题宽度
      el-form-item  labe="标签"   prop="需要验证的值的key"

      表单验证
      1:el-form加model   rules:规则绑定
      2:在el-form-item加上prop
      3:写验证规则
         prop对应值:[
         {required:true,message:"错误信息",trigger:"blur/change"},
         {
           min:最小长度,max:"最大长度",message:"错误提示",trigger:"blur/change"
         }
         ]
        全局验证（调用el-form  validate）
        1:在el-form上定义一个ref
        2:this.$refs.ref值.validate(result=>{true:验证通过。，false验证失败})
     -->
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item prop="avatar" label="头像">
        <!-- 
           el-upload   
               action:上传接口地址
               name:参数名
               show-file-list:true显示列表，false不显示列表
               before-upload:回调函数  file对象属性，type,size,它要return一个boolean值,true:允许 上传,false：取消上传
               on-success:上传成功处理  res(接口返回值),file(,file.row,file.response)
          -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="图形码">
        <!-- el-row:行  el-col  :span="栏数"  :offset  偏移栏数，也计算在24拦之内 -->
        <el-row>
          <el-col :span="14">
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <img
              v-if="bol"
              class="register-code"
              @click="codeClick"
              :src="codeImg"
              alt=""
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="rcode" label="验证码">
        <!-- el-row:行  el-col  :span="栏数"  :offset  偏移栏数，也计算在24拦之内 -->
        <el-row>
          <el-col :span="14">
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <!--disabled  :true不能点   ：false:可以点  -->
            <el-button @click="getRcode" :disabled="totalTime < 5"
              >获取用户验证码
              <span v-if="totalTime != 5"
                >({{ totalTime + 1 }}秒)</span
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="register-foooter">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import axios from 'axios'
import { getRcode, registerUser } from '@/api/login.js'
export default {
  // 当isShow=false时，对整 个form进行清理
  // watch:某个值的change事件（进行form清理）
  watch: {
    isShow (newVal) {
      // newVal:当前值   oldVal上一刻的值
      if (newVal == false) {
        // this.form = {
        //   avatar: '', //是	string	头像地址
        //   username: '', //是	string	用户名
        //   email: '', //是	string	邮箱
        //   phone: '', //是	string	手机号
        //   password: '', //是	string	密码
        //   code: '', //图形码
        //   rcode: '' //是	string	验证码
        // }
        // form表单的方法都需要里面的值都有相应的prop绑定
        this.$refs.form.resetFields()
        this.imageUrl = ''
      }
    }
  },
  data () {
    return {
      bol: true,
      totalTime: 5,
      isShow: false,
      uploadUrl: process.env.VUE_APP_URL + '/uploads',
      codeImg: process.env.VUE_APP_URL + '/captcha?type=sendsms',
      imageUrl: '',
      form: {
        avatar: '', //是	string	头像地址
        username: '', //是	string	用户名
        email: '', //是	string	邮箱
        phone: '', //是	string	手机号
        password: '', //是	string	密码
        code: '', //图形码
        rcode: '' //是	string	验证码
      },
      rules: {
        avatar: [{ required: true, message: '必填哦123', trigger: 'change' }],
        username: [{ required: true, message: '必填哦', trigger: 'change' }],
        email: [
          { required: true, message: '必填哦', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // rule:规则   value:当前验证项的值  callback:验证通过  callback()  验证不通过  callback(new Error("错误信息"))
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('请正确输入邮箱地址'))
              }
            },
            trigger: 'change'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              if (_reg.test(value)) {
                callback()
              } else {
                callback(new Error('请正确输入手机'))
              }
            }
          }
        ],
        password: [{ required: true, message: '必填哦', trigger: 'change' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'change' }
        ],
        rcode: [{ required: true, message: '必填哦', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 刷新图形验证码
    codeClick () {
      // 静默刷新
      // this.bol = false
      // this.$nextTick(() => {
      //   this.bol = true
      // })
      //修改图形验证码url，让img标签重新渲染它就可以得到一个新的验证码
      // Date.now()当前点击时的时间戳
      this.codeImg =
        process.env.VUE_APP_URL + '/captcha?type=sendsms&sdgsdgsd=' + Date.now()
    },
    // 上传成功处理
    handleAvatarSuccess (res) {
      // 值已保存至form下
      this.form.avatar = res.data.file_path
      // 人为触发一下avatar的表单验证
      // 父组件调用子组件方法(父传子)  1：在子组件标签定义ref属性   2:this.$refs.ref值.validateField(['avatar(写出需要验证的字段名)'],error=>{error:错误信息，error的值就是验证不通过，error为空表示验证通过})
      this.$refs.form.validateField(['avatar'], errorMessage => {
        window.console.log('avatar错误信息:', errorMessage)
      })
      this.imageUrl = process.env.VUE_APP_URL + '/' + res.data.file_path
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传前处理
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //确定按钮点击
    submit () {
      this.$refs.form.validate(result => {
        if (result) {
          // this.$message.success('验证通过')
          registerUser(this.form).then(() => {
            // if (res.data.code == 200) {
            this.$message.success('注册成功')
            this.isShow = false
            // }
            // window.console.log('注册信息:', res.data)
          })
        } else {
          this.$message.error('验证失败')
        }
      })
    },
    // 获取验证码
    getRcode () {
      // 1:验证手机号与图形码都正常输入了
      //调用el-form validateField：(["需要验证项字段名","需要验证项字段名2"],errorMessage=>{
      //  errorMessage:空，正常验证通过  errorMessage不为空，验证不通过
      // })
      let num = 0
      this.$refs.form.validateField(['phone', 'code'], errorMessage => {
        if (errorMessage == '') {
          num++
        }
        window.console.log('错误信息:', errorMessage)
      })
      // 验证通过调用接口获取手机验证码
      //调用ajax不跨域的情况下它是自动带cookie,如果跨域了不默认不带cookie
      // withCredentials:boolean值（跨域允许带cookie）
      if (num == 2) {
        // this.$message('验证通过')
        // axios({
        //   url: process.env.VUE_APP_URL + '/sendsms',
        //   method: 'post',
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   withCredentials: true
        // })

        // 希望在某个时间段内只调用一次接口,调用前做一个判断
        //刚开：totalTime=5 可以点， 过了一秒后，totalTime=4
        this.totalTime--
        let _interval = setInterval(() => {
          this.totalTime--
          if (this.totalTime <= -1) {
            clearInterval(_interval)
            this.totalTime = 5
          }
        }, 1000)

        getRcode({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          // 如果手机验证码错误
          // if (res.data.code == 200) {
          window.console.log('测试一下:', res)
          this.$message.success(res.data.captcha + '')
          // } else {
          // this.$message.error(res.data.message)
          // }
        })
      } else {
        this.$message.error('验证不通过')
      }
    }
  }
}
</script>
<style lang="less">
.register {
  .el-dialog__header {
    padding: 0;
  }
  .register-title {
    height: 53px;
    line-height: 53px;
    text-align: center;
    color: #fff;
    background: linear-gradient(to right, #01c5fa, #1395fa);
  }
  .register-foooter {
    text-align: center;
  }
  .avatar-uploader {
    width: 178px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .register-code {
    width: 100%;
    height: 40px;
  }
}
</style>
