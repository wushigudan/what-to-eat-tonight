let dishes = [];

// 加载菜品数据
fetch('dishes.json')
    .then(response => response.json())
    .then(data => {
        dishes = data.dishes;
        initialDisplay(); // 加载数据后显示初始菜品
    })
    .catch(error => console.error('Error loading dishes:', error));

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

    // 为每个菜品项添加一个"滚动中"的样式 (可选)
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
        // 可以为最终选定的菜品添加一个"选定"的动画/样式
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