new Vue({
    el:"#content",
    data() {
        return {
            labelPosition: 'right',
            formLabelAlign: {
                username: '',
                root: '',
                password: '',
                passwordQ:'',
                sex:'',
                checked:true,
                real:''
            },
            agree:false
        }
    },
    methods:{
        SendMessage() {
          this.$message("短信服务花钱，经费不足，这里填入123456就可以了");
        },
        dataOutPutCS() {
            console.log(this.agree);
        },
        commitTo() {
            let _this = this;
            if(this.formLabelAlign.checked === true) {
                if(this.agree && this.formLabelAlign.username !== '' && this.formLabelAlign.root !== '' && this.formLabelAlign.password !== '' && this.formLabelAlign.passwordQ !== '' && this.formLabelAlign.sex !== '' && this.formLabelAlign.checked !== '') {
                    if(this.formLabelAlign.password !== this.formLabelAlign.passwordQ) {
                        alert("两次密码不一致");
                    }
                    else if (this.formLabelAlign.real !== "123456") {
                        alert("请输入短信验证码");
                    }
                    else {
                        let formData = new URLSearchParams();
                        formData.append("root",this.formLabelAlign.root);
                        formData.append("username",this.formLabelAlign.username);
                        formData.append("password",this.formLabelAlign.password);
                        formData.append("sex",this.formLabelAlign.sex);
                        // formData.append("username",this.formLabelAlign.username);
                        let formTest = new URLSearchParams();
                        formTest.append("root",this.formLabelAlign.root);
                        console.log(this.formLabelAlign.root);
                        axios({
                            url:"http://localhost:8080/registCheck",
                            method: "post",
                            data:formTest,
                            headers: {
                                "content-type":"application/x-www-form-urlencoded"
                            }
                            }
                        ).then((resp)=>{
                            if(resp.data === "Have") {
                                alert("该手机号已注册过了")
                            }
                            else {
                                axios({
                                    url:"http://localhost:8080/regist",
                                    method:"post",
                                    data: formData,
                                    headers:{
                                        "content-type":"application/x-www-form-urlencoded"
                                    },
                                }).then((resp)=>{
                                    if(resp.data === "success") {
                                        alert("注册成功");
                                        location.href = "http://localhost:8080/login"
                                    }
                                    else {
                                        alert("注册失败");
                                    }
                                });
                            }
                        })
                    }
                }
                else {
                    alert("必填项不能为空");
                }
            }
            else {
                alert("验证失败");
            }
        }
    }
})