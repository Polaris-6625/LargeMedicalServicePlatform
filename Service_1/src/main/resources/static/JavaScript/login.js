let btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let formData = new URLSearchParams();
    formData.append("username",username);
    formData.append("password",password);
    axios({
        url:"http://localhost:8080/logincheck",
        method:"post",
        headers:{
            "content-type":"application/x-www-form-urlencoded"
        },
        data:formData
    }).then((resp)=>{
        if(resp.data === "ok") {
            location.href = "http://localhost:8080/index";
        }
        else {
            alert("账号或密码错误,请重新输入");
            location.href = "http://localhost:8080/login";
        }
    });
},false)