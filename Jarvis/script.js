let ask=document.getElementById("ask");
let qstn=document.getElementById("qstn");
let results=document.getElementById("results");
let jarvis=speechSynthesis;
let msg=document.getElementsByClassName("msg");
let example=document.getElementById("example");
let carousel=document.getElementById("carousel");
let bodyElem=document.getElementById("body");
let closeBtn=document.getElementById("close");
let word;
const greetings=['Hi','Hi Nice to see you here.',"Hello there","Hey Welcome.","Hi, How are you?"];
const place1=["I'm infront of you.","You are looking at me.","Maybe around 20-30 centimeters infront of you."];
const place2=["You're infront of me.","I'm looking at you.","Maybe around 20-30 centimeters infront of me."];
const months=["Janurary","February","March","April","May","June","July","August","September","October","November","December"];
var date=new Date();
example.addEventListener("click",()=>{
    carousel.classList.remove("d-none");
    bodyElem.classList.add("d-none");
})
closeBtn.addEventListener("click",()=>{
    bodyElem.classList.remove("d-none");
    carousel.classList.add("d-none");
})
function reply(q){
    if(q.includes("hi") || q.includes("hey") || q.includes("hello")){
        return greetings[Math.floor(Math.random()*greetings.length)];
    }
    else if(q.includes("i'm fine") || q.includes("im fine")){
        return "Nice to hear that from you";
    }
    else if(q.includes("how are you")){
        return "I'm good. Thanks for asking.";
    }
    else if(q.includes("where are you")){
        return place1[Math.floor(Math.random()*place1.length)];
    }
    else if(q.includes("where am i")){
        return place2[Math.floor(Math.random()*place2.length)];
    }
    else if(q.includes("play")){
        song=q.substring(q.indexOf("play")+5);
        window.open(`https://www.youtube.com/results?search_query=${song}`);
        return `Showing results of ${song}`;
    }
    else if(q.includes("is the time") || q.includes("s the time")){
        return `Time is ${date.getHours()%12} ${date.getMinutes()} ${date.getHours()>=12?"PM":"AM"}`
    }
    else if(q.includes("date")){
        return `Date is ${date.getDate()} ${months[date.getMonth()]} and ${date.getFullYear()}`;
    }
    else if(q.split(" ").includes("ok") || q.split(" ").includes("okk")){
        return `Ok.`;
    }
    else if(q.split(" ").includes("bro")){
        return `Bro`;
    }
    else{
        return `What is meant by ${q}`;
    }
}
qstn.addEventListener("keyup",(e)=>{
    if(e.keyCode===13){
        ask.click();
    }
})
function add(word,ans){
    results.innerHTML+=`
        <div class="msg">
            <div class="result-div result-user">
                <textarea readonly class="result p-2 user">${word}</textarea>
            </div>
            <div class="result-div result-bot">
                <textarea readonly class="result p-2 bot">${ans}</textarea>
            </div>
        </div>
    `;
    results.scroll(0,findPos(msg[msg.length-1]));
}
function findPos(obj){
    var currentTop=0;
    if(obj.offsetParent){
        do{
            currentTop+=obj.offsetTop;
        }while((obj=obj.offsetParent));
        return [currentTop];
    }
}
function updateRC(){
    let results=document.getElementsByClassName("result");
    let len=30;
    for(let i=0;i<results.length;i++){
        if(/Android|webOs|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            len=18;    
        }
        results[i].setAttribute("rows",Math.floor(results[i].value.length/len)+1);
    }
};
ask.addEventListener("click",()=>{
    word=qstn.value;
    qstn.value="";
    if(word.trim()==="" || word==null){
        word="Hi Jarvis";
    }
    word=word.toLowerCase();
    ans=reply(word);
    jarvis.speak(new SpeechSynthesisUtterance(ans));
    add(word,ans);
    updateRC();
})
