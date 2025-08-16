(function() {
    // Кликер
    let score = 0;
    let clickPower = 1;
    let clickCount = 0;
    let clicksInSecond = 0;
    let cps = 0;

    const upgrades = {
        gigaclick: { basePrice: 10, count: 0, multiplier: 1 },
        coalMine: { basePrice: 50, count: 0, multiplier: 1 },
        supermarket: { basePrice: 200, count: 0, multiplier: 2 },
        factory: { basePrice: 500, count: 0, multiplier: 5 },
        shard: { basePrice: 1000, count: 0 }
    };

    window.handleClick = function() {
        clickCount++;
        clicksInSecond++;
        let add = clickPower + upgrades.gigaclick.count;
        
        if(clickCount % 10 === 0) {
            add += 50 * upgrades.shard.count;
        }
        
        score += add;
        window.updateDisplay();
    }

    window.updatePrices = function() {
        for(let upgrade in upgrades) {
            upgrades[upgrade].price = Math.floor(upgrades[upgrade].basePrice * 
                Math.pow(1.1, upgrades[upgrade].count));
        }
    }

    window.buyUpgrade = function(upgradeName) {
        const upgrade = upgrades[upgradeName];
        if(score >= upgrade.price) {
            score -= upgrade.price;
            upgrade.count++;
            window.updatePrices();
            window.updateDisplay();
            window.updateShop();
        }
    }

    window.updateDisplay = function() {
        document.getElementById('score').textContent = Math.floor(score);
        document.getElementById('cps').textContent = 
            upgrades.coalMine.count * 1 + 
            upgrades.supermarket.count * 2 + 
            upgrades.factory.count * 5;
        document.getElementById('cpsCounter').textContent = cps;
    }

    window.updateShop = function() {
        const shop = document.getElementById('shopItems');
        shop.innerHTML = `
            <div class="shop-item" data-upgrade="gigaclick">
                Гига клики<br>
                [ ${upgrades.gigaclick.count} ]<br>
                Цена: ${upgrades.gigaclick.price}
            </div>
            <div class="shop-item" data-upgrade="coalMine">
                Угольная шахта<br>
                [ ${upgrades.coalMine.count} ]<br>
                Цена: ${upgrades.coalMine.price}
            </div>
            <div class="shop-item" data-upgrade="supermarket">
                Супер-маркет<br>
                [ ${upgrades.supermarket.count} ]<br>
                Цена: ${upgrades.supermarket.price}
            </div>
            <div class="shop-item" data-upgrade="factory">
                Завод<br>
                [ ${upgrades.factory.count} ]<br>
                Цена: ${upgrades.factory.price}
            </div>
            <div class="shop-item" data-upgrade="shard">
                Шард-кристалл<br>
                [ ${upgrades.shard.count} ]<br>
                Цена: ${upgrades.shard.price}
            </div>
        `;
    }

    // Passive income interval
    setInterval(() => {
        score += 
            upgrades.coalMine.count * 1 + 
            upgrades.supermarket.count * 2 + 
            upgrades.factory.count * 5;
        window.updateDisplay();
    }, 1000);

    // CPS counter interval
    setInterval(() => {
        cps = clicksInSecond;
        clicksInSecond = 0;
        window.updateDisplay();
    }, 1000);

    // Event Listeners
    document.getElementById('clicker-button').addEventListener('click', () => window.handleClick());
    document.getElementById('shop-button').addEventListener('click', () => window.showShopWindow());

    document.getElementById('shopItems').addEventListener('click', function(event) {
        const item = event.target.closest('.shop-item');
        if (item) {
            const upgradeName = item.dataset.upgrade;
            window.buyUpgrade(upgradeName);
        }
    });

    // Initial setup
    window.updatePrices();
    window.updateShop();

    window.addScore = function(amount) {
        score += amount;
        window.updateDisplay();
    }

    window.getScore = function() {
        return score;
    }

    window.subtractScore = function(amount) {
        score -= amount;
        window.updateDisplay();
    }
})();