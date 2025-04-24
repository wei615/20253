let snowflakes = []; // 儲存雪花的陣列
let giftBox = { x: 0, y: 0, w: 0, h: 300, opened: false }; // 禮物盒
let lid = { x: 0, y: 0, w: 0, h: 50, yOffset: 0 }; // 禮物盒蓋子
let showCard = false; // 是否顯示小卡
let cardY; // 小卡的 Y 座標
let cardScale = 0; // 小卡的縮放比例
let cardText = "大家好，我是劉宜瑋，我的 MBTI 是 ENFP。\n" +
               "家裡住在板橋，通勤到學校需要很久時間，\n" +
               "但幸運的是，我抽到了宿舍！\n" +
               "每天可以不用很早起床準備上學。\n\n" +
               "我的身高是 160 公分，\n" +
               "鞋子喜歡買鞋底很高的款式，\n" +
               "所以常常走路時拐到腳。\n\n" +
               "體重是秘密哦！"; // 初始文字

function preload() {
  // 不需要加載照片，移除照片相關功能
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#fee440'); // 背景顏色
  noStroke(); // 移除圓的邊框

  // 初始化 40 個雪花
  for (let i = 0; i < 40; i++) {
    let x = random(width); // 隨機 X 座標
    let y = random(-height, 0); // 隨機 Y 座標（從畫布上方開始）
    snowflakes.push({ x, y }); // 將雪花加入陣列
  }

  // 設定禮物盒大小與位置
  giftBox.w = width / 2; // 禮物盒寬度為畫布寬度的一半
  giftBox.x = width / 2 - giftBox.w / 2; // 禮物盒水平居中
  giftBox.y = height / 2 - giftBox.h / 4; // 禮物盒垂直居中

  // 設定蓋子大小與位置
  lid.w = giftBox.w;
  lid.x = giftBox.x;
  lid.y = giftBox.y - lid.h;

  // 設定小卡初始位置
  cardY = giftBox.y - lid.h; // 小卡初始位置在禮物盒與蓋子之間
}

function draw() {
  background('#fee440'); // 每次重繪背景，避免殘影

  // 繪製雪花
  fill('#f8f9fa'); // 雪花顏色
  for (let flake of snowflakes) {
    ellipse(flake.x, flake.y, 30); // 繪製雪花
    flake.y += random(0.5, 1.5); // 雪花向下移動，速度較慢

    // 如果雪花超出畫布底部，將其重置到畫布上方
    if (flake.y > height) {
      flake.y = random(-50, 0);
      flake.x = random(width);
    }
  }

  // 繪製禮物盒
  fill('#ff6f61'); // 禮物盒顏色
  rect(giftBox.x, giftBox.y, giftBox.w, giftBox.h, 10); // 禮物盒本體
  fill('#ffcc00'); // 禮物盒綁帶顏色
  rect(giftBox.x + giftBox.w / 2 - 10, giftBox.y, 20, giftBox.h); // 垂直綁帶
  rect(giftBox.x, giftBox.y + giftBox.h / 2 - 10, giftBox.w, 20); // 水平綁帶

  // 繪製禮物盒蓋子
  fill('#ff6f61'); // 蓋子顏色
  rect(lid.x, lid.y - lid.yOffset, lid.w, lid.h-5, 10); // 繪製蓋子

  // 繪製蝴蝶結緞帶
  fill('#f72585'); // 蝴蝶結顏色
  triangle(
    giftBox.x + giftBox.w / 2 - 180, giftBox.y + 110, // 左下角
    giftBox.x + giftBox.w / 2 - 180, giftBox.y - 180, // 頂點
    giftBox.x + giftBox.w / 2 - 10, giftBox.y - 30 // 右下角
  );
  triangle(
    giftBox.x + giftBox.w / 2 + 180, giftBox.y + 110, // 右下角
    giftBox.x + giftBox.w / 2 + 180, giftBox.y - 180, // 頂點
    giftBox.x + giftBox.w / 2 + 20, giftBox.y - 30 // 左下角
  );
  rect(giftBox.x + giftBox.w / 2 - 40, giftBox.y - 70, 80, 80); // 中心正方形

  // 繪製白色小卡
  if (showCard) {
    push();
    translate(width / 2, cardY); // 將小卡的中心設為畫布中心
    scale(cardScale); // 根據縮放比例放大小卡
    fill('#ffffff'); // 小卡顏色
    rect(-200, -100, 400, 200, 10); // 小卡（調整尺寸）
    fill('#000000'); // 文字顏色
    textSize(20 / cardScale); // 根據縮放比例調整文字大小
    textAlign(CENTER, CENTER);
    text(cardText, 0, 0); // 顯示動態文字

    // 繪製右下角的箭頭符號（僅當文字未改變時顯示）
    if (cardText === "大家好，我是劉宜瑋，我的 MBTI 是 ENFP。\n" +
                     "家裡住在板橋，通勤到學校需要很久時間，\n" +
                     "但幸運的是，我抽到了宿舍！\n" +
                     "每天可以不用很早起床準備上學。\n\n" +
                     "我的身高是 160 公分，\n" +
                     "鞋子喜歡買鞋底很高的款式，\n" +
                     "所以常常走路時拐到腳。\n\n" +
                     "體重是秘密哦！") {
      fill('#fee440'); // 箭頭顏色
      textSize(30); // 箭頭大小
      textAlign(RIGHT, BOTTOM);
      text("➜", 190, 90); // 在卡片右下角繪製箭頭符號
    }
    pop();

    // 小卡彈跳效果
    if (cardY < height / 2) { // 當小卡到達畫布正中間時停止
      cardY += 5; // 小卡向下移動
    } else {
      cardY = height / 2; // 停止在正中間
    }

    // 小卡放大效果
    if (cardScale < 2) { // 小卡放大到 2 倍
      cardScale += 0.05; // 小卡逐漸放大
    }
  }
}

function mousePressed() {
  // 檢查是否點擊到禮物盒
  if (
    mouseX > giftBox.x &&
    mouseX < giftBox.x + giftBox.w &&
    mouseY > giftBox.y &&
    mouseY < giftBox.y + giftBox.h &&
    !giftBox.opened
  ) {
    giftBox.opened = true; // 打開禮物盒
    showCard = true; // 顯示小卡

    // 開啟蓋子上升動畫
    let interval = setInterval(() => {
      if (lid.yOffset < 110) {
        lid.yOffset += 5; // 蓋子向上移動
      } else {
        clearInterval(interval); // 停止動畫
      }
    }, 30);
  }

  // 檢查是否點擊到白色小卡
  if (
    showCard &&
    mouseX > width / 2 - 200 &&
    mouseX < width / 2 + 200 &&
    mouseY > cardY - 100 &&
    mouseY < cardY + 100
  ) {
    // 更新卡片文字
    if (cardText === "大家好，我是劉宜瑋，我的 MBTI 是 ENFP。\n" +
                     "家裡住在板橋，通勤到學校需要很久時間，\n" +
                     "但幸運的是，我抽到了宿舍！\n" +
                     "每天可以不用很早起床準備上學。\n\n" +
                     "我的身高是 160 公分，\n" +
                     "鞋子喜歡買鞋底很高的款式，\n" +
                     "所以常常走路時拐到腳。\n\n" +
                     "體重是秘密哦！") {
      cardText = "平常的休閒娛樂是看電影和追星。\n" +
                 "最近超喜歡《九龍城寨之圍城》這部電影，\n" +
                 "當初在電影院看的時候，我一直摳手，\n" +
                 "重頭到尾都很緊張刺激，推薦大家去看!!!\n\n" +
                 "追星的話，喜歡 SEVENTEEN，\n" +
                 "每個成員都有自己的特色和優點，\n" +
                 "不只有趣，也很有實力！\n" +
                 "然後我最喜歡小八，他真的很可愛，我很喜歡!";
    } else {
      cardText = "大家好，我是劉宜瑋，我的 MBTI 是 ENFP。\n" +
                 "家裡住在板橋，通勤到學校需要很久時間，\n" +
                 "但幸運的是，我抽到了宿舍！\n" +
                 "每天可以不用很早起床準備上學。\n\n" +
                 "我的身高是 160 公分，\n" +
                 "鞋子喜歡買鞋底很高的款式，\n" +
                 "所以常常走路時拐到腳。\n\n" +
                 "體重是秘密哦！";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布隨視窗大小調整
}
