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
                method: "get"
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
    methods : {
        register(val){
            let _this = this;
            console.log("挂号");
            console.log(this);
            console.log(val);
            console.log(val.name);
            let cookie = document.cookie;
            let user = cookie.replace("username=","");
            let list_reg = new URLSearchParams();
            list_reg.append("preDocter",val.name);
            list_reg.append("user","user_"+user);
            axios({
                url:"http://localhost:8080/registerDocter",
                method: "post",
                headers: {
                    "content-type":"application/x-www-form-urlencoded"
                },
                data: list_reg
            }).then((resp)=>{
                console.log(resp.data);
                if(resp.data === "successfully") {
                    _this.$message("挂号成功");
                    val.dis = true;
                    _this.dis = true;
                }
                else {
                    _this.$message("挂号失败");
                }
            });
        },
        gotoAddDocter() {
            location.href = "http://localhost:8080/html/add.html";
        },
        gotoDelDoctor() {
            location.href = "http://localhost:8080/html/del.html";
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
        }
    },
    mounted() {
        this.getInformation();
        let mychart = echarts.init(document.getElementById('echartsTable'));
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
        let mychart_2 = echarts.init(document.getElementById('echartsTable_mn'));
        // var [d1,d2,d3,d4,d5,d6] = [100,120,130,160,80];
        // option_2 = {
        //     xAxis: {
        //         data: ['A', 'B', 'C', 'D', 'E', 'F']
        //     },
        //     yAxis: {},
        //     series: [
        //         {
        //             type: 'bar',
        //             data: [d1, d2, d3, d4, d5, d6]
        //         }
        //     ]
        // };
        // mychart_2.setOption(option_2);
        // setInterval(()=>{
        //     d1 += Math.random() * 100;
        //     d2 += Math.random() * 100;
        //     d3 += Math.random() * 100;
        //     d4 += Math.random() * 100;
        //     d5 += Math.random() * 100;
        //     d6 += Math.random() * 100;
        //     console.log(d1);
        //     mychart_2.setOption(option_2);
        //     console.log(d1,d2,d3,d4,d5,d6);
        // },1000);
        var chartDom = document.getElementById('echartsTable_mn');
        var myChart = echarts.init(chartDom);
        var option;

        var base = +new Date(2014, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        var data = [Math.random() * 150];
        var now = new Date(base);
        function addData(shift) {
            now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
            date.push(now);
            data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
            if (shift) {
                date.shift();
                data.shift();
            }
            now = new Date(+new Date(now) + oneDay);
        }
        for (var i = 1; i < 100; i++) {
            addData();
        }
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                boundaryGap: [0, '50%'],
                type: 'value'
            },
            series: [
                {
                    name: '成交',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    stack: 'a',
                    areaStyle: {
                        normal: {}
                    },
                    data: data
                }
            ]
        };
        setInterval(function () {
            addData(true);
            myChart.setOption({
                xAxis: {
                    data: date
                },
                series: [
                    {
                        name: '成交',
                        data: data
                    }
                ]
            });
        }, 500);

        option && myChart.setOption(option);
    }
})