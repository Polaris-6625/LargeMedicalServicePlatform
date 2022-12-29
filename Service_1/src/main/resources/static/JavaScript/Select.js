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
            let user = cookie.replace("username=","");
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
            selectWho:'',
            dis:false,
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
    methods:{
        SelectDocter(val) {
            let list = new URLSearchParams();
            list.append("name",val.name);
            axios({
                url:"http://localhost:8080/JedisSelect",
                method:"post",
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                },
                data:list
            }).then((resp)=>{
                let content = resp.data;
                console.log("resp.data is  "+resp.data);
                this.$alert(content, '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `展示完毕`
                        });
                    }
                });
            });
        },
        getInformation() {
            let _this = this;
            let list = new URLSearchParams();
            list.append("name",this.selectWho);
            console.log("29");
            axios({
                method:"post",
                url:"http://localhost:8080/JedisSelect",
                headers:{
                    "content-type":"application/x-www-form-urlencoded"
                },
                data:list
            }).then((resp)=>{
                console.log("6"+resp.data);
                let Temp = [];
                Temp[0] = resp.data;
                _this.docterInformation = Temp;
                console.log(_this.docterInformation);
                _this.$forceUpdate();
            })
        }
    },
    mounted() {
        // this.getInformation();
    }
})