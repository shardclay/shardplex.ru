(function() {
    let inventory = [];

        const prices = {
        'Обычного качества': { min: 5, max: 50 },
        'Необычного качества': { min: 50, max: 100 },
        'Редкого качества': { min: 100, max: 300 },
        'Эпического качества': { min: 300, max: 600 },
        'Легендарного качества': { min: 600, max: 1200 },
        'Мифического качества': { min: 10000, max: 100000 }
    };

    function getPrice(rarityName) {
        const priceRange = prices[rarityName];
        if (!priceRange) {
            return 0;
        }
        return Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;
    }

    window.addToInventory = function(item) {
        item.price = getPrice(item.rarity.name);
        inventory.push(item);
        renderInventory();
    }

    function renderInventory() {
        const inventoryGrid = document.getElementById('inventory-grid');
        inventoryGrid.innerHTML = '';

        if (inventory.length === 0) {
            inventoryGrid.innerHTML = `
                <div class="empty-inventory-message">
                    <p>Здесь пока ничего нет</p>
                    <p class="secondary-text">попробуй открыть сундук</p>
                </div>
            `;
            return;
        }

        inventory.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('inventory-item');
            itemElement.draggable = true;
            if (item.rarity.color) {
                itemElement.style.setProperty('--rarity-color', item.rarity.color);
                let shadowColor = item.rarity.color.replace(/, 1\)$/, ', 0.1)');
                itemElement.style.setProperty('--rarity-shadow-color', shadowColor);
            }

            if (item.rarity.name === 'Мифического качества') {
                itemElement.classList.add('mythical-border');
            }

            itemElement.innerHTML = `
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-rarity" style="color: ${item.rarity.color}">${item.rarity.name}</div>
                </div>
                <div class="sell-container">
                    <button class="sell-button" data-item-index="${index}">
                        <i class="fas fa-coins"></i>
                    </button>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            inventoryGrid.appendChild(itemElement);
        });
    }

    window.renderInventory = renderInventory;

    document.getElementById('inventory-grid').addEventListener('click', function(event) {
        const sellButton = event.target.closest('.sell-button');
        if (sellButton) {
            const itemIndex = parseInt(sellButton.dataset.itemIndex, 10);
            const item = inventory[itemIndex];
            
            if (item) {
                window.addScore(item.price);
                inventory.splice(itemIndex, 1);
                renderInventory();
            }
        }
    });

    // Drag and drop functionality
    let draggedItem = null;

    document.addEventListener('dragstart', function(event) {
        if (event.target.classList.contains('inventory-item')) {
            draggedItem = event.target;
            setTimeout(() => {
                event.target.style.display = 'none';
            }, 0);
        }
    });

    document.addEventListener('dragend', function(event) {
        if (draggedItem) {
            setTimeout(() => {
                draggedItem.style.display = 'flex';
                draggedItem = null;
            }, 0);
        }
    });

    const inventoryGrid = document.getElementById('inventory-grid');

    inventoryGrid.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    inventoryGrid.addEventListener('drop', function(event) {
        event.preventDefault();
        if (draggedItem) {
            const dropzone = event.target.closest('.inventory-item');
            if (dropzone) {
                inventoryGrid.insertBefore(draggedItem, dropzone);
            } else {
                inventoryGrid.appendChild(draggedItem);
            }
        }
    });
})();
