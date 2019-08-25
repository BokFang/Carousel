/**
 * 
 * @param {*} Area 轮播图区域
 * @param {*} options 轮播图配置
 */
function createCarousel(Area,options){
  var imgArea = document.createElement("div")
  imgArea.classList.add("picture")
  var cornerArea = document.createElement("div")
  cornerArea.classList.add("corner")
  var timer = null//控制是否轮播
  var changeDuration = 3000//轮播间隔时间
  var index = 0 //当前在第几张轮播图
  var changeTimer = null//控制动画计时器
//显示图片的区域
  initImgs()
//显示角标的区域
  initCorner()
//轮播图状态
  setstatus()
  autoChange()
//函数区
/**
 * 初始化图片区域
 */
  function initImgs(){
    for(let i = 0; i < options.length; i++){
      var obj = options[i]
      var img = document.createElement("img")
      img.src = obj.imgUrl
      img.style.marginLeft = "0"
      imgArea.appendChild(img)
    }
    imgArea.addEventListener("mouseenter",function(){
      clearInterval(timer)
      timer = null
    })
    imgArea.addEventListener("mouseleave",function(){
      autoChange()
    })
    Area.appendChild(imgArea)
  }
/**
 * 初始化角标区域
 */
  function initCorner(){
    for(let i = 0; i < options.length; i++){
      var span = document.createElement("span")
      cornerArea.appendChild(span)
      span.addEventListener("click",function(){
        index = i
        setstatus()
      })
    }
    Area.appendChild(cornerArea)
  }
  /**
   * 设置轮播图状态
   */
  function setstatus(){
    for(let i = 0; i < options.length; i++){
      if(i === index){
        cornerArea.children[i].style.backgroundColor = "#be926f"
      }else{
        cornerArea.children[i].style.backgroundColor = "lightgrey"
      }
    }
    var start = parseInt(imgArea.children[0].style.marginLeft)
    var end = index * -100
    var distance = end - start
    var time = 500
    var speed = distance / time

    if(changeTimer){
      clearInterval(changeTimer)
    }
    changeTimer = setInterval(function(){
      start += speed * 20
      imgArea.children[0].style.marginLeft = start + "%"
      if(Math.abs(end - start) < 1){
        imgArea.children[0].style.marginLeft = end + "%"
        clearInterval(changeTimer)
      }
    },20)
  }
  function autoChange(){
    if(timer){
      return
    }
    timer = setInterval(function(){
      if(index === options.length -1){
        index = 0
      }else{
        index++
      }
      setstatus()
    },changeDuration)}
  
}