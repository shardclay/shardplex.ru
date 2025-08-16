(function() {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    let rotateX = 0, rotateY = 0;
    let scale = 1;
    let velocityX = 0, velocityY = 0;
    const friction = 0.99;
    const sensitivity = 0.3;
    const cube = document.querySelector('.cube');

    // Обновление трансформации куба
    function updateTransform() {
        cube.style.transform = `
            scale(${scale})
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    }

    // Обработчики событий мыши
    cube.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Только левая кнопка
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        rotateY += deltaX * sensitivity;
        rotateX -= deltaY * sensitivity;
        
        velocityX = deltaX * sensitivity * 0.5;
        velocityY = deltaY * sensitivity * 0.5;
        
        updateTransform();
        
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        cube.style.cursor = 'grab';
        startInertia();
    });

    // Инерционное вращение
    function startInertia() {
        const animate = () => {
            if (!isDragging && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
                rotateY += velocityX;
                rotateX -= velocityY;
                velocityX *= friction;
                velocityY *= friction;
                updateTransform();
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }

    // Инициализация
    updateTransform();
})();
