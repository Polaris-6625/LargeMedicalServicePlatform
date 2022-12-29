new Vue({
    el:"#app",
    data() {
        return {
            activeIndex2: '1',
            input:"",
            username:'',
            disabled:"true",
            docterInformation: [{
                id:"",
                name: '',
                sex:'',
                age:'',
                position:'',
                dateTime:"",
                remarks:''
            }]
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
            docterInformation: [{
                id:"",
                name: '',
                sex:'',
                age:'',
                position:'',
                dateTime:"",
                endTime:'',
                remarks:'',
                department:''
            }]
        };
    },
    methods : {
        gotoAddDocter() {
            location.href = "http://localhost:8080/html/add.html";
        },
        gotoDelDoctor() {
            location.href = "http://localhost:8080/html/addDocter.html";
        },
        getInformation() {
            let _this = this;
            console.log("23");
            axios({
                method:"post",
                url:"http://localhost:8080/docterInf"
            }).then((resp)=>{
                console.log(resp.data);
                _this.docterInformation = resp.data;
                _this.$forceUpdate();
            })
        },
        deleteDocter(val) {
            let cookie = document.cookie;
            let user = cookie.replace("username=","");
            let list = new URLSearchParams();
            // list.append("user",user);
            list.append("delDocter",val.id);
            let _this = this;
            console.log(val);
            axios({
                url:"http://localhost:8080/delDocter",
                method: "post",
                headers: {
                    "content-type":"application/x-www-form-urlencoded"
                },
                data:list
            }).then((resp)=>{
                if (resp.data === "successfully") {
                    this.$message("删除成功");
                    _this.$forceUpdate();
                    this.$forceUpdate();
                    location = location;
                }
                else {
                    this.$message("删除失败");
                }
            });
        }
    },
    mounted() {
        this.getInformation();
    }
})