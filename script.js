const dishes = [
    "宫保鸡丁", "鱼香肉丝", "麻婆豆腐", "回锅肉", "水煮牛肉",
    "酸菜鱼", "辣子鸡", "番茄炒蛋", "清蒸鲈鱼", "红烧排骨",
    "可乐鸡翅", "糖醋里脊", "地三鲜", "蒜蓉西兰花", "手撕包菜",
    "香菇滑鸡", "梅菜扣肉", "粉蒸肉", "剁椒鱼头", "小炒黄牛肉",
    "干煸四季豆", "油焖大虾", "白灼菜心", "扬州炒饭", "牛肉面",
    "炸酱面", "馄饨", "饺子", "披萨", "汉堡",
    "意大利面", "寿司", "拉面", "咖喱鸡", "冬阴功汤",
    "青椒肉丝", "木须肉", "锅包肉", "大盘鸡", "烤鸭",
    "羊肉串", "麻辣香锅", "火锅", "酸辣土豆丝", "拍黄瓜",
    "凉拌木耳", "皮蛋豆腐", "蒜泥白肉", "口水鸡", "夫妻肺片"
];

const randomizeButton = document.getElementById('randomizeButton');
const dishList = document.getElementById('dishList');
const dishesContainer = document.getElementById('dishesContainer');
const numberOfDishesToDisplay = 5;
let isAnimating = false; // 防止重复点击触发动画

// 初始化列表项
function initializeListItems() {
    dishList.innerHTML = ''; // 清空现有列表
    for (let i = 0; i < numberOfDishesToDisplay; i++) {
        const listItem = document.createElement('li');
        dishList.appendChild(listItem);
    }
}

function getRandomDishName() {
    return dishes[Math.floor(Math.random() * dishes.length)];
}

function getFinalRandomDishes(count) {
    const shuffled = [...dishes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function displayDishes() {
    if (isAnimating) return; // 如果正在动画中，则不执行
    isAnimating = true;
    randomizeButton.disabled = true; // 禁用按钮防止快速点击

    const listItems = Array.from(dishList.children);

    // 滚动动画参数
    const scrollDuration = 1500; // 总滚动时长 (毫秒)
    const scrollInterval = 70;   // 每个菜品变化间隔 (毫秒)
    let elapsed = 0;

    // 为每个菜品项添加一个“滚动中”的样式 (可选)
    listItems.forEach(item => item.classList.add('dish-scrolling'));

    const intervalId = setInterval(() => {
        listItems.forEach(item => {
            item.textContent = getRandomDishName();
        });
        elapsed += scrollInterval;
        if (elapsed >= scrollDuration) {
            clearInterval(intervalId);
            finalizeSelection(listItems);
        }
    }, scrollInterval);
}

function finalizeSelection(listItems) {
    const finalDishes = getFinalRandomDishes(numberOfDishesToDisplay);
    listItems.forEach((item, index) => {
        item.classList.remove('dish-scrolling'); // 移除滚动中样式
        item.textContent = finalDishes[index];
        // 可以为最终选定的菜品添加一个“选定”的动画/样式
        item.classList.add('dish-selected-animation'); 
        // 动画结束后移除类，以便下次可以再次触发
        setTimeout(() => item.classList.remove('dish-selected-animation'), 500);
    });
    isAnimating = false;
    randomizeButton.disabled = false; // 动画结束，启用按钮
}

// 页面加载时初始化列表并显示初始菜品
function initialDisplay() {
    initializeListItems();
    const initialSelectedDishes = getFinalRandomDishes(numberOfDishesToDisplay);
    const listItems = Array.from(dishList.children);
    listItems.forEach((item, index) => {
        item.textContent = initialSelectedDishes[index];
        // 初始加载也可以有一个简单的入场效果
        item.classList.add('dish-selected-animation');
        setTimeout(() => item.classList.remove('dish-selected-animation'), 500);
    });
}

randomizeButton.addEventListener('click', displayDishes);
initialDisplay();