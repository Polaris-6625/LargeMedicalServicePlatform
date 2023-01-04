new Vue({
    el:"#app",
    data() {
        return {
            activeIndex2: '1',
            input:"",
            username:'',
            disabled:"true",
            message:""
        };
    },
    methods:{
        sendMessage() {
            const socket = new WebSocket('ws://localhost:8080/websocket');
            socket.send(this.message);
            console.log(this.message);
        },
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
            location.href = "http://localhost:8080/login"
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
                    location.href = "http://localhost:8080/login";
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
            message:"",
            information:"",
            socket:new WebSocket('ws://localhost:8080/websocket')
        };
    },
    methods:{
        sendMessage() {
            console.log(this.message);
            if(this.socket.readyState === 1) {
                let cook = document.cookie;
                const result = cook.match(/\d+/);
                console.log(result[0]);
                console.log("1-----"+result[0]+":"+this.message);
                this.socket.send(result[0]+":"+this.message);
                this.socket.onmessage = (event)=>{
                    this.information = event.data;
                }
                this.message = "";
            }
            else {
                console.log("未连接");
            }
        },
    }
})