function ran(a,b) {
    return Math.floor(Math.random() / (1/(b-a+1)) ) + a;
}
const but=document.getElementsByClassName("button");
for (i=0;i<5;i++) but[i].innerHTML=i+3;
n = 0;

function setgame (n) {

figure = [];
val = [];
v = [];
s1 = [];
s2 = [];
a = [];
dem = [];
win = false;
for (i=0;i<n;i++) a.push(0), dem.push(0);

const b=document.getElementsByClassName("row");
const c=document.getElementsByClassName("box");
const s=document.getElementsByClassName("sum");
const but=document.getElementsByClassName("button");

document.getElementById("h").style.display="none";
document.getElementById("hh").style.display="none";
document.getElementById("list").style.display="none";
document.getElementById("blank").style.display="block";
document.getElementById("board").style.display="block";
document.getElementById("ans").style.display="block";
document.getElementById("sub").style.display="block";
document.getElementById("status").style.display="block";

for (i=0;i<5;i++) but[i].innerHTML=i+4;

figure.push('<img src="picture/round.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/triangle.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/square.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/ro.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/star.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/sao6.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/hex.png" style="width:39px; height:39px;">');
figure.push('<img src="picture/diamond.png" style="width:39px; height:39px;">');
for (i=0;i<n;i++) val.push(ran(1,10));

function init () {
	for (i=0;i<n+1;i++) document.getElementById("board").innerHTML+='<div class="row"></div>';
	for (i=0;i<n;i++) {
		for (j=0;j<n;j++) b[i].innerHTML+='<div class="box"></div>';
		b[i].innerHTML+='<div class="sum"></div>';
	}	
	for (i=0;i<n+1;i++) b[n].innerHTML+='<div class="sum"></div>';
	for (i=0;i<n*n;i++) v.push(ran(0,n-1)), c[i].innerHTML=figure[v[i]];
	for (i=0;i<=2*n;i++) s[i].setAttribute("id","-1");
}

init();
for (i=0;i<n*n;i+=n) {
	let sum=0;
	for (j=i;j<i+n;j++) sum+=val[v[j]];
	s1.push(sum);
}
for (i=0;i<n;i++) {
	let sum=0;	
	for (j=i;j<n*n;j+=n) sum+=val[v[j]];
	s2.push(sum);
}


for (i=0;i<n;i++) s[i].innerHTML+='='+s1[i];
for (i=0;i<n;i++) s[i+n].innerHTML='='+s2[i];

for (i=0;i<=10;i++) document.getElementById("ans").innerHTML+='<div class="answer"></div>';
const xx=document.getElementsByClassName("answer");
	
for (i=0;i<n;i++) xx[0].innerHTML+='<div class="box">';
for (i=0;i<n;i++) c[n*n+i].innerHTML=figure[i];

for (i=1;i<=10;i++) xx[i].innerHTML='<div class="row">';
for (i=1;i<=10;i++) {
	for (j=0;j<n;j++) {
		b[i+n].innerHTML+='<div class="sum"></div>'; 
		s[2*n+n*(i-1)+j+1].innerHTML=i;
		s[2*n+n*(i-1)+j+1].setAttribute("id",(i-1)+" "+j);
	}
}

document.getElementById("sub").innerHTML+='<div class="sum" style="width:100px; height:39px;"></div>';
s[s.length-1].style.backgroundColor="green";
s[s.length-1].innerHTML="SUBMIT";
s[s.length-1].style.color="white";
s[s.length-1].setAttribute("id","! !");

for (const x of s) {
	x.addEventListener("click",function(){
		if (x.getAttribute("id")!="-1" && x.getAttribute("id")!="! !" && !win) {
			dem[parseInt(x.getAttribute("id")[2])]++;
			a[parseInt(x.getAttribute("id")[2])]=parseInt(x.getAttribute("id")[0]);
			for (i=1;i<=10;i++) {
				if (i-1==parseInt(x.getAttribute("id")[0])) s[2*n+n*(i-1)+parseInt(x.getAttribute("id")[2])+1].style.backgroundColor="red";
				else s[2*n+n*(i-1)+parseInt(x.getAttribute("id")[2])+1].style.backgroundColor="#00BFFF";
			}
		}
		else if (x.getAttribute("id")=="! !" && !win) {
			cnt = 0;
			for (i=0;i<n;i++)
				if (dem[i]) cnt++;
			if (cnt==n) {
				ok = true;
				for (i=0;i<n*n;i+=n) {
					tong = 0;
					for (j=i;j<i+n;j++) tong += a[v[j]];
					if (tong+n!=s1[parseInt(i/n)]) ok = false;
				}
				for (i=0;i<n;i++) {
					tong = 0;
					for (j=i;j<n*n;j+=n) tong += a[v[j]];
					if (tong+n!=s2[i]) ok = false;
				}
				if (!ok) document.getElementById("status").innerHTML = 'Bạn trả lời chưa đúng. Hãy thử lại!';
				else document.getElementById("status").innerHTML = 'Congratulations! Bạn đã giải được!', win=true;
			}
		}
	});
}


}



	