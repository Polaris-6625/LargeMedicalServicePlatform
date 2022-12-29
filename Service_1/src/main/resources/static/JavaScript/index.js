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
        exit() {
            console.log("exit");
            let list = new URLSearchParams();
            list.append("cookie",document.cookie);
            axios({
                url:"http://127.0.0.1:8080/exit",
                method: "post",
                headers: {
                    "content-type":"application/x-www-form-urlencoded"
                },
                data:list
            }).then((resp)=>{
                location.href = "http://localhost:8080/login";
            })

        }
    },
    mounted() {
        this.index();
        this.checkStatus();
        let mychart = echarts.init(document.getElementById('echarts'));
        option = {
            series: [
                {
                    type: 'pie',
                    data: [
                        {
                            value: 100,
                            name: 'A'
                        },
                        {
                            value: 200,
                            name: 'B'
                        },
                        {
                            value: 300,
                            name: 'C'
                        },
                        {
                            value: 400,
                            name: 'D'
                        },
                        {
                            value: 500,
                            name: 'E'
                        }
                    ],
                    roseType: 'area'
                }
            ]
        };
        mychart.setOption(option);
    }
})