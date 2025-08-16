(function() {
    // Прелоадер
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.transition = 'opacity 0.5s';
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });

    // Параллакс
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.getElementById('parallaxHeader');
        const sensitivity = 64;
        const scaleFactor = 0.0005;
        
        const updateParallax = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const rotateX = (clientY - innerHeight/2) / sensitivity * -1;
            const rotateY = (clientX - innerWidth/2) / sensitivity * 1;
            const scale = 1 + (scaleFactor * 2) - (Math.abs(rotateY) + Math.abs(rotateX)) * scaleFactor;
            header.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }
        
        document.addEventListener('mousemove', updateParallax);
        document.addEventListener('mouseleave', () => {
            header.style.transform = 'scale(1) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    let zIndex = 100; // Базовый уровень z-index

    // Функция активации окна
    function activateWindow(windowElem) {
    // Сбрасываем активный класс у всех окон
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('active');
    });

    // Устанавливаем новый z-index и активируем текущее окно
    zIndex += 1;
    windowElem.style.zIndex = zIndex;
    windowElem.classList.add('active');
    }

    // Модифицированная функция центрирования
    function centerWindow(windowElem) {
    if (!windowElem) return;

    const windowWidth = windowElem.offsetWidth;
    const windowHeight = windowElem.offsetHeight;

    windowElem.style.left = `${(window.innerWidth - windowWidth) / 2}px`;
    windowElem.style.top = `${(window.innerHeight - windowHeight) / 2}px`;

    activateWindow(windowElem); // Активируем при центрировании
    }

    // Инициализация z-index для всех окон при загрузке
    window.addEventListener('load', () => {
    document.querySelectorAll('.window').forEach((window, index) => {
        window.style.zIndex = 100 + index; // Начальный z-index
    });
    centerAllWindows();
    });

    // Центрирование всех окон
    function centerAllWindows() {
    document.querySelectorAll('.window').forEach(window => {
        centerWindow(window);
    });
    }

    // Инициализация перетаскивания
    let isDragging = false;
    let currentWindow = null;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    // Обновленный обработчик перетаскивания
    document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return;
        
        const window = this.closest('.window');
        activateWindow(window);
        
        const rect = window.getBoundingClientRect();
        let isDragging = true;
        let startX = e.clientX;
        let startY = e.clientY;
        let initialX = rect.left;
        let initialY = rect.top;

        const mouseMoveHandler = e => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        window.style.left = `${initialX + deltaX}px`;
        window.style.top = `${initialY + deltaY}px`;
        };

        const mouseUpHandler = () => {
        isDragging = false;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
    });


    // Управление окном
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('openClicker').addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки
            showClickerWindow();
        });

        document.getElementById('openChest').addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки
            showChestWindow();
        });

        document.getElementById('openCube').addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение ссылки
            showCubeWindow();
        });

        document.getElementById('openInventory').addEventListener('click', function(e) {
            e.preventDefault();
            showInventoryWindow();
        });

        

        // Floating Action Button
        const fab = document.getElementById('floating-action-button');
        const menu = document.getElementById('floating-menu');

        if (fab && menu) {
            fab.addEventListener('click', () => {
                menu.classList.toggle('active');
                fab.classList.toggle('active');
            });
        }
    });

    function showClickerWindow() {
        document.getElementById('clickerWindow').style.display = 'block';
        window.updatePrices();
        window.updateShop();
        centerWindow(document.getElementById('clickerWindow'));
    }

    window.showShopWindow = function() {
        document.getElementById('shopWindow').style.display = 'block';
        centerWindow(document.getElementById('shopWindow'));
    }

    function showChestWindow() {
        document.getElementById('chestWindow').style.display = 'block';
        centerWindow(document.getElementById('chestWindow'));
    }

    function showCubeWindow() {
        document.getElementById('cubeWindow').style.display = 'block';
        centerWindow(document.getElementById('cubeWindow'));
    }

    function showInventoryWindow() {
        document.getElementById('inventoryWindow').style.display = 'block';
        window.renderInventory();
        centerWindow(document.getElementById('inventoryWindow'));
    }

    

    function showShardIoWindow() {
        document.getElementById('shardIoWindow').style.display = 'block';
        centerWindow(document.getElementById('shardIoWindow'));
    }

    window.closeWindow = function(windowId) {
        document.getElementById(windowId).style.display = 'none';
    }

    document.querySelectorAll('.control-button.close').forEach(button => {
        button.addEventListener('click', () => {
            const windowId = button.closest('.window').id;
            window.closeWindow(windowId);
        });
    });
})();