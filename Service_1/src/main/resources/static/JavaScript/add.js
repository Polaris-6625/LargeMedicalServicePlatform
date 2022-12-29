new Vue({
    el:"#app",
    data() {
        return {
            activeIndex2: '1',
            input:"",
            username:'',
            disabled:"true"
        };
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        FunqxManage() {
            console.log("move is log in the console");
            console.log(this);

        },
        login(){
            location.href = "../html/login.html"
        },
        check() {
            axios({
                url:"http://localhost:8080/check",
                methods: "get"
            }).then((resp)=>{
                console.log(resp.data);
                if (resp.data === "ok" || resp.data === "manage") {
                    alert("欢迎您");
                }
                    // else if(resp.data === "mange") {
                    //     this.disable = false;
                // }
                else {
                    alert("请先登录")
                    location.href = "http://localhost:8080/html/login.html";
                }
            })
        },
        checkStatus() {
            axios({
                url:"http://localhost:8080/check",
                methods: "get"
            }).then((resp)=>{
                if (resp.data === "ok") {
                    console.log("普通用户");
                }
                else if(resp.data === "manage") {
                    this.disabled = false;
                    console.log("管理员权限");
                }
                else {
                    console.log("不认识");
                }
            })
        },
        index:function () {
            let cookie = document.cookie;
            let user = cookie.replace("username=","")
            this.$message(`欢迎您!!!!${user}`);
        },
    },
    mounted() {
        this.index();
        this.checkStatus();
    }
});
new Vue({
    el:"#main",
    data() {
        return {
            form:{
                id:"",
                name: '',
                sex:'',
                age:'',
                position:'',
                dateTime:"",
                endTime:'',
                remarks:'',
                department:''
            },
            op:[{
                value:"内科",
                label:"内科"
            },{
                value: '外科',
                label: '外科'
            },{
                value: '妇科',
                label: '妇科'
            },{
                value: '儿科',
                label: '儿科'
            },{
                value: '心内科',
                label: '心内科'
            },{
                value: '呼吸科',
                label: '呼吸科'
            },{
                value: '血液科',
                label: '血液科'
            },{
                value: '消化科',
                label: '消化科'
            },{
                value: '内分泌科',
                label: '内分泌科'
            },{
                value: '风湿免疫科',
                label: '风湿免疫科'
            },{
                value: '胃肠外科',
                label: '胃肠外科'
            },{
                value: '肝胆科',
                label: '肝胆科'
            },{
                value: '腹壁疝科',
                label: '腹壁疝科'
            },{
                value: '大肠科',
                label: '大肠科'
            },{
                value: '骨科',
                label: '骨科'
            },{
                value: '神经外科',
                label: '神经外科'
            },{
                value: '神经内科',
                label: '神经内科'
            },{
                value: '胸外科',
                label: '胸外科'
            },{
                value: '心外科',
                label: '心外科'
            },{
                value: '皮肤科',
                label: '皮肤科'
            },{
                value: '辅助检查科室',
                label: '辅助检查科室'
            }]
        };
    },
    methods:{
        exitPage(){
          location.href = "http://localhost:8080/html/addDocter.html";
        },
        sendAddToCL() {
            console.log(this.form.name+","+this.form.sex+","+this.form.age+","+this.form.position+","+this.form.dateTime,+","+this.form.endTime+","+this.form.remarks);
            let list = new URLSearchParams();
            list.append("name",this.form.name);
            list.append("sex",this.form.sex);
            list.append("age",this.form.age);
            list.append("position",this.form.position);
            list.append("dateTime",this.form.dateTime);
            list.append("endTime",this.form.endTime);
            list.append("remarks",this.form.remarks);
            list.append("department",this.form.department);
            let _this = this;
            axios({
                url:"http://localhost:8080/AddDocter",
                method:"post",
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                },
                data:list
            }).then((resp)=>{
                this.$message("添加成功");
                _this.form.name = "";
                _this.form.sex = "";
                _this.form.age = "";
                _this.form.position = "";
                _this.form.dateTime = "";
                _this.form.endTime = "";
                _this.form.remarks = "";
                _this.form.department = "";
            })
        }
    },
})