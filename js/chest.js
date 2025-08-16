(function() {
    // Окно с сундуком
    const adjectives = ['Большой', 'Маленький', 'Древний', 'Сияющий', 'Забытый', 'Проклятый', 'Священный', 'Легендарный', 'Могущественный', 'Хрупкий', 'Огненный', 'Ледяной', 'Ядовитый', 'Магический', 'Призрачный', 'Невидимый', 'Эпический', 'Космический', 'Громовой', 'Солнечный', 'Лунный', 'Звездный', 'Драконий', 'Эльфийский', 'Гномий', 'Орковский', 'Гоблинский', 'Демонический', 'Ангельский', 'Ржавый', 'Острый', 'Тупой', 'Изогнутый', 'Прямой', 'Сверкающий', 'Потерянный', 'Найденный', 'Украденный', 'Подаренный', 'Заколдованный', 'Расколдованный', 'Отравленный', 'Исцеляющий', 'Смертоносный', 'Живой', 'Мертвый', 'Спящий', 'Пробудившийся', 'Поющий', 'Молчаливый'];
    const nouns = ['Кинжал', 'Меч', 'Топор', 'Молот', 'Лук', 'Арбалет', 'Посох', 'Жезл', 'Скипетр', 'Амулет', 'Талисман', 'Кольцо', 'Браслет', 'Ожерелье', 'Корона', 'Шлем', 'Доспех', 'Щит', 'Сапоги', 'Перчатки', 'Плащ', 'Книга', 'Свиток', 'Руна', 'Камень', 'Кристалл', 'Шар', 'Череп', 'Кость', 'Сердце', 'Глаз', 'Зуб', 'Коготь', 'Перо', 'Чешуя', 'Рог', 'Цветок', 'Гриб', 'Корень', 'Семя', 'Флакон', 'Зелье', 'Эликсир', 'Порошок', 'Пыль', 'Карта', 'Ключ', 'Замок', 'Компас', 'Часы'];
    const materials = ['Обсидиана', 'Гранита', 'Мрамора', 'Железа', 'Стали', 'Золота', 'Серебра', 'Меди', 'Бронзы', 'Мифрила', 'Адамантита', 'Эбонита', 'Дерева', 'Кости', 'Хрусталя', 'Алмаза', 'Рубина', 'Сапфира', 'Изумруда', 'Топаза', 'Аметиста', 'Янтаря', 'Жемчуга', 'Лавы', 'Льда', 'Огня', 'Воды', 'Воздуха', 'Земли', 'Света', 'Тьмы', 'Хаоса', 'Порядка', 'Жизни', 'Смерти', 'Снов', 'Кошмаров', 'Звезд', 'Пустоты', 'Эфира', 'Плазмы', 'Ртути', 'Кожи', 'Ткани', 'Паутины', 'Стекла', 'Бумаги', 'Пергамента', 'Облаков', 'Радуги'];

    const rarities = {
        mythical: { name: 'Мифического качества', chance: 0.01 },
                legendary: { name: 'Легендарного качества', color: 'rgba(226, 146, 57, 1)', chance: 0.04 },
        epic: { name: 'Эпического качества', color: 'rgba(155, 0, 255, 1)', chance: 0.09 },
        rare: { name: 'Редкого качества', color: 'rgba(110, 156, 244, 1)', chance: 0.24 },
        uncommon: { name: 'Необычного качества', color: 'rgba(6, 253, 0, 1)', chance: 0.49 },
        common: { name: 'Обычного качества', color: 'rgba(255, 255, 255, 1)', chance: 1 },
    };

    let isCooldown = false;
    let countdown;
    let chestCost = 0;

    function generateNewCost() {
        chestCost = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    }

    function updateChestStatus() {
        const result = document.getElementById('result');
        result.innerHTML = `Нажми чтобы открыть<br>Стоимость: ${chestCost}`;
    }

    generateNewCost();
    updateChestStatus();

    document.getElementById('chestImage').addEventListener('click', function(e) {
        e.preventDefault();
        if (isCooldown) {
            showOverlay('Сундук на перезарядке!');
            return;
        }
        openChest();
    });

    function playOpenSound() {
        const openSound = new Audio('audio/open.wav');
        openSound.play().catch(error => console.error("err opensound", error));
    }

    function playCloseSound() {
        const closeSound = new Audio('audio/close.wav');
        closeSound.play().catch(error => console.error("err closesound", error));
    }

    function getRandomRarity() {
        const rand = Math.random();
        if (rand < rarities.mythical.chance) return rarities.mythical;
        if (rand < rarities.legendary.chance) return rarities.legendary;
        if (rand < rarities.epic.chance) return rarities.epic;
        if (rand < rarities.rare.chance) return rarities.rare;
        if (rand < rarities.uncommon.chance) return rarities.uncommon;
        return rarities.common;
    }

    function openChest() {
        const score = window.getScore();
        if (score < chestCost) {
            showOverlay('Недостаточно кликов!');
            return;
        }
        
        isCooldown = true;
        window.subtractScore(chestCost);
        playOpenSound();
        const chestImage = document.getElementById('chestImage');
        chestImage.src = 'images/chest_open_ani.gif';

        setTimeout(() => {
            chestImage.src = 'images/chest_open.png';
            const result = document.getElementById('result');
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
            const itemName = `${randomAdjective} ${randomNoun} из ${randomMaterial}`;
            const rarity = getRandomRarity();

            let rarityEl;
            if (rarity.name === rarities.mythical.name) {
                rarityEl = `<span class="mythical-rarity-text">${rarity.name}</span>`;
            } else {
                rarityEl = `<span style="color: ${rarity.color}">${rarity.name}</span>`;
            }

            result.innerHTML = `Вы получили:<br>${itemName}<br>${rarityEl}`;

            const saveButtonContainer = document.createElement('div');
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Сохранить';
            saveButton.classList.add('save-button');
            saveButton.addEventListener('click', () => {
                window.addToInventory({ name: itemName, rarity: rarity });
                saveButton.disabled = true;
                saveButton.textContent = 'Сохранено';
            });
            saveButtonContainer.appendChild(saveButton);
            result.appendChild(saveButtonContainer);

            startCooldown();
        }, 1000);
    }

    function startCooldown() {
        isCooldown = true;
        let timeLeft = 60;
        document.getElementById('timer').textContent = `До следующего открытия: ${timeLeft} сек`;
        countdown = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').textContent = `До следующего открытия: ${timeLeft} сек`;
            if(timeLeft <= 0) {
                clearInterval(countdown);
                isCooldown = false;
                playCloseSound();
                const chestImage = document.getElementById('chestImage');
                chestImage.src = 'images/chest_close_ani.gif';
                setTimeout(() => {
                    chestImage.src = 'images/chest_close.png';
                    generateNewCost();
                    updateChestStatus();
                    document.getElementById('timer').textContent = '';
                    if (window.pJSDom && window.pJSDom.length > 0) {
                        window.pJSDom[0].pJS.fn.vendors.destroypJS();
                        window.pJSDom = [];
                    }
                }, 1000);
            }
        }, 1000);
    }

    function showOverlay(message) {
        const overlay = document.getElementById('overlay');
        const messageElement = overlay.querySelector('.wait-message');
        if (messageElement) {
            messageElement.textContent = message;
        } else {
            overlay.innerHTML = `<div class="wait-message">${message}</div>`;
        }
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 2000);
    }

})();