<template>
  <div id="login">
    <a-col span="20" :lg="{span:5}">
      <a-form :form="form" class="login-box" @submit="handleSubmit">
        <a-form-item :labelCol="{span:4}" :wrapperCol="{span:24}">
          <a-input
            placeholder="用户名"
            size="large"
            v-decorator="['userName', { rules: [{ required: true, message: '请输入账号' }] }]"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item :labelCol="{span:4}" :wrapperCol="{span:24}">
          <a-input-password
            type="password"
            placeholder="密码"
            size="large"
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-item>
        <a-form-item :labelCol="{span:4}" :wrapperCol="{span:24}">
          <a-input
            placeholder="验证码"
            allowClear
            size="large"
            v-decorator="['yzm', { rules: [{ required: true, message: '请输入验证码' }] }]"
          >
            <a-icon slot="prefix" type="picture" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-tooltip>
              <template slot="title">点击重新获取验证码</template>
              <div v-html="codeSvg" @click="getCode" class="code flex-col flex-al">

              </div>
            </a-tooltip>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button class="w100" type="primary" html-type="submit"  size="large">登陆</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </div>
</template>

<script>
import httpModel from "../../model";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "loginBox" }),
      codeSvg: ""
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault(); // 阻止刷新页面
      const data=this.form.getFieldsValue()
      const token = await httpModel.login(data);
      console.log(token)
    },
    async getCode() {
      const codeSvg = await httpModel.getCode();
      this.codeSvg = codeSvg.data;
    }
  },
  async created() {
    await this.getCode();
  }
};
</script>


<style lang="less" scoped>
#login {
  width: 100%;
  .flex-col;
  .flex-al;
  .flex-jc;
  background-color: #f8f8f8;
  min-height: 100vh;
  .login-box {
    .w100;
    padding: 20px 30px;
    padding-top: 44px;
    // border: 1px solid @border-color-base;
    border-radius: 5px;
    box-shadow: 0 0 100px rgba(0,0,0,.08);
    .code{
    border: 1px solid @border-color-base;
    border-radius: 5px;
    padding: 5px 0;
    }
  }
}

</style>