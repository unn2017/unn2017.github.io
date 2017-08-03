<script type="text/javascript">
function myfun()
{
alert("this window.onload");
}
/*用window.onload调用myfun()*/
window.onload=myfun;//不要括号
</script>
<script language="javascript" >
function myfun() {
document.getElementById("ad_3v").style.display=“none”; // 屏蔽
}
// 用js实现在加载完成一个页面后自动执行一个方法
/*用window.onload调用myfun()*/
window.onload=myfun;//不要括号
</script>