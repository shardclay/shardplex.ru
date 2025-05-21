import numpy as np
import matplotlib.pyplot as plt

def mandelbrot(c, max_iter):
    z = 0
    for n in range(max_iter):
        if abs(z) > 2:
            return n
        z = z**2 + c
    return max_iter

def generate_mandelbrot(width, height, x_min, x_max, y_min, y_max, max_iter):
    x = np.linspace(x_min, x_max, width)
    y = np.linspace(y_min, y_max, height)
    img = np.zeros((height, width))

    for i in range(height):
        for j in range(width):
            img[i, j] = mandelbrot(x[j] + 1j*y[i], max_iter)
    return img

if __name__ == "__main__":
    # Настройки
    width, height = 800, 600
    x_min, x_max = -2.0, 1.0
    y_min, y_max = -1.5, 1.5
    max_iter = 50

    # Генерация фрактала
    img = generate_mandelbrot(width, height, x_min, x_max, y_min, y_max, max_iter)

    # Визуализация
    plt.imshow(img, cmap='hot', extent=(x_min, x_max, y_min, y_max))
    plt.title("Фрактал Мандельброта")
    plt.xlabel("Re")
    plt.ylabel("Im")
    plt.savefig("mandelbrot.png")
    plt.show()