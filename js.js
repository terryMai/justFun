window.onload = function () {
  let part = document.getElementById('part')
  let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  let highScore = localStorage.getItem('hisTime') ? localStorage.getItem('hisTime') : 999
  console.log(localStorage.getItem('hisTime'))
  document.getElementById('hisTime').innerText = highScore
  render(arr1,part)
}

// 点击后判断是否交换类名
function partChild () {
  let blank = document.getElementsByClassName('part16')[0]
  let that = this
  let topDif = Math.abs(parseInt(blank.offsetTop - that.offsetTop))
  let leftDif = Math.abs(parseInt(blank.offsetLeft - that.offsetLeft))

  if ((topDif === 125 || topDif === 0) && (leftDif === 125 || leftDif === 0)) {
    if (!((topDif === 125 && leftDif ===125) || (topDif === 0 && leftDif === 0))) {
      changeClass(that, blank)
    }
  }
}
 // 计时对象
let timeObject = {
  hisTime: 0,
  nowTime: 0,
  timer: null,
  setAndClearTime: function (bg) {
    // bg代表场景，bg为1的时候表示开始游戏，bg为2的时候表示重置游戏，bg为3的时候表示赢得游戏
      let that = timeObject
      if (bg === 1) {
      if (!that.timer) {
       that.timer = setInterval(function () {
            let getNowTime = document.getElementById('nowTime')
            that.nowTime++
            getNowTime.innerText = that.nowTime
          }, 1000)
        }
      }
      if (bg === 2) {
        if (that.timer) {
          clearInterval(that.timer)
          that.timer = null
          that.nowTime = 0
          document.getElementById('nowTime').innerText = that.nowTime
        }
      }
      if (bg === 3) {
        if (that.timer) {
          let a = document.getElementById('nowTime')
          let b = document.getElementById('hisTime')
          if (a.innerText < b.innerText ){
            window.localStorage.setItem('hisTime',a.innerText)
            b.innerText = window.localStorage.getItem('hisTime')
          }
          clearInterval(that.timer)
          that.nowTime = 0
          a.innerText = that.nowTime
        }
      }

    // if (!timer) {
    //   clearInterval(timer)
    // }
    //
  }
}
// 交换类名
function changeClass(element, blank) {
  let t = element.className
  element.className = blank.className
  blank.className = t
  winGame()
}
// 渲染
function render(arr, part, isAddEvent) {
  let addEvent = isAddEvent === undefined ? false : isAddEvent
  for (let i = 0;i <16;i++) {
    let childPart = document.createElement('div')
    childPart.className = 'part' + ' ' + 'part' + arr[i]
    if (addEvent) {
      childPart.addEventListener('click', partChild)
    }
    part.appendChild(childPart)
  }
}
// 开始游戏
function start() {
  if (timeObject.nowTime === 0){
  let part = document.getElementById('part')
  part.innerHTML = ''
  let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  arr1.sort(function () {
    return Math.random() - 0.5
  })
  arr1.push(16)
 render(arr1, part, true)
 timeObject.setAndClearTime(1)

  }
}

// 重置游戏
function resize() {
  timeObject.setAndClearTime(2)
  let part = document.getElementById('part')
  let arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  part.innerHTML = ''
  render(arr1,part)

}
// 判断是否成功
function winGame() {
  let part = document.getElementById('part')
  let classList = part.children
  let arr = []
  let winGame = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'
  for (let i = 0; i < classList.length; i++) {
    let item = classList[i]
    if (item.className.length === 10){
      let divIndex = item.className.charAt(item.className.length - 1)
      arr.push(Number(divIndex))
    } else if (item.className.length === 11) {
      let divIndex = item.className.substr(item.className.length - 2, 2)
      arr.push(Number(divIndex))
    }
  }
  if (arr.toString() === winGame) {
    timeObject.setAndClearTime(3)
    let part = document.getElementById('part')
    let dialog = document.getElementById('dialog')
    let len = part.children.length
    for (let i = 0;i<len;i++) {
      let item = part.children[i]
      item.removeEventListener('click',partChild)
    }
    dialog.style.display = 'block'

   let timer = setTimeout(function () {
      clearTimeout(timer)
      dialog.style.display = 'none'
    },5000)

  }
  // console.log(arr.toString())
}
