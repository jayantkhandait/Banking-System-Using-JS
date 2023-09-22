const acc1 = {
    name : "Jayant Khandait",
    transaction : [500, 200, -500, 600, 9000, -10000],
    password: 1111,
    username: "jk",
};

const acc2 = {
    name : "Aman Zode",
    transaction : [500, -200, 1500, -600, 19000, -10000],
    password: 2222,
    username: "az",
};

const acc3 = {
    name : "Anushka Khandait",
    transaction : [1500, -200, 800, 1600, -900, 52000],
    password: 3333,
    username: "ak",
};

const acc4 = {
    name : "Mayuri Nagarare",
    transaction : [1500, 6200, 9500, -600, -9000, 10000],
    password: 4444,
    username : "mn",
};

const data = [acc1, acc2, acc3, acc4]

const username = document.querySelector(".username");
const password = document.querySelector(".pass");
const login = document.querySelector(".login")
const main = document.querySelector("main");
const loginTool= document.querySelector(".login-menu")
const greeting = document.querySelector(".gretting");
const greatingName = document.querySelector(".name");

let pos;
login.addEventListener('click', ()=>{
    pos=-1;
    data.forEach((d, i)=>{
        // console.log();
        if(d.username==username.value && d.password==password.value){
            pos =i;
        }
    })
    if(pos>-1){
        username.value="";
        password.value="";
        main.style.opacity=1;
        loginTool.style.display="none";
        greeting.style.display="block";
        greatingName.innerText = data[pos].name;
        addEntries(pos);
        changeBal(pos);
    }else{
        alert("please give correct login data");
    }
})

const passbook = document.querySelector(".passbook");
function addEntries(pos){
    passbook.innerText="";
    data[pos].transaction.forEach((ev)=>{
        // console.log(ev);
        const el=document.createElement("div");
        el.classList.add("entries");
        const el2=document.createElement("div");
        if(ev>0){            
            el2.classList.add("deposit");
            el2.innerText="DEPOSIT";
        }else{
            el2.classList.add("withdraw");
            el2.innerText="WITHDRAW";
        }
        const el3 = document.createElement("div");
        el3.classList.add("amt");
        el3.innerText= "\u20B9";
        const el4 = document.createElement("span");
        el4.classList.add("trans-amt");
        el4.innerText=ev;
        el3.appendChild(el4);
        el.appendChild(el2);
        el.appendChild(el3);
        passbook.appendChild(el);
    })
}

const balance = document.querySelector(".balance");
function changeBal(pos){
    const bal = data[pos].transaction.reduce((curr, i)=> curr+i,0);
    balance.innerText=bal;
}

const logout = document.querySelector(".logout");
logout.addEventListener('click',()=>{
    main.style.opacity=0;
    loginTool.style.display="block";
    greeting.style.display="none";
})

// transaction-money
const transfer = document.querySelector(".transfer");
transfer.addEventListener('click', ()=>{
    const sendTo = document.querySelector(".send-to").value;
    const sendAmt = document.querySelector(".amount").value;

    // console.log(sendTo, sendAmt);
    let exist = -1;
    data.forEach((d,i)=>{
        // console.log();
        if(d.username==sendTo){
            exist =i;
        }
    })
    // data[exist].transaction.forEach((d)=>{
    //     console.log(d);
    // })
    console.log(pos,exist);
    if(exist!=pos && exist>=0 && sendAmt <= parseInt(balance.innerText)){
        data[exist].transaction.push(parseInt(sendAmt));
        // data[exist].transaction.forEach((d)=>{
        //     console.log(d);
        // })
        data[pos].transaction.push(-(parseInt(sendAmt)));
        changeBal(pos);
        addEntries(pos);
        document.querySelector(".send-to").value = "";
        document.querySelector(".amount").value ="";
    }else{
        alert("INPUT VALID USERNAME FOR SENDER or Not Enough Balance")
    }
})

// Closing account

const closeBtn = document.querySelector(".closeAcc");
closeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    const name = document.querySelector(".closingUN").value;
    const pass = parseInt(document.querySelector(".closingP").value);
    // console.log(data[pos].name,data[pos].password);
    if(name == data[pos].username && pass==data[pos].password){
        data.splice(pos,1);
        main.style.opacity=0;
        loginTool.style.display="block";
        greeting.style.display="none";
        document.querySelector(".closingUN").value = "";
        document.querySelector(".closingP").value="";        
    }else{
        alert(
            "Invalid Username Or Password"
        )
    }    
})

const req = document.querySelector(".request");
req.addEventListener('click',(e)=>{
    e.preventDefault();
    const amt = Number(document.querySelector(".loan-amt").value);
    if(data[pos].transaction.some(val => val >= amt *0.1)){
        data[pos].transaction.push(amt);
        changeBal(pos);
        addEntries(pos);
        document.querySelector(".loan-amt").value="";
    }else{
        alert("try less Amount")
    }
})