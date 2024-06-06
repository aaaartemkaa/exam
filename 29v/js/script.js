$(document).ready(function() {
    const figuresContainer = $('#figures-container');
    const figuresInfoTable = $('#figures-info tbody');
    // Массив для хранения информации о фигурах
    const figures = [];
    // Функция для создания новой фигуры
    function createFigure() {
        const figure = $('<div>').addClass('figure');
        figure.css({
            width: Math.floor(Math.random() * 100) + 50 + 'px',
            height: Math.floor(Math.random() * 100) + 50 + 'px',
            backgroundColor: getRandomColor(),
            borderRadius: Math.floor(Math.random() * 100) + '%',
            left: Math.floor(Math.random() * (figuresContainer.width() - 100)) + 'px',
            top: Math.floor(Math.random() * (figuresContainer.height() - 100)) + 'px',
            zIndex: figures.length + 1
        });
        figure.data('id', figures.length + 1);
        figure.data('locked', false);
        // Добавляем номер внутри фигуры
        const figureNumber = $('<div>').addClass('figure-number').text(figures.length + 1);
        figure.append(figureNumber);
        figuresContainer.append(figure);
        figures.push(figure);
        updateFiguresInfo();
    }
    // Функция для обновления информации о фигурах в таблице
    function updateFiguresInfo() {
        figuresInfoTable.empty();
        figures.forEach(function(figure) {
            const id = figure.data('id');
            const width = figure.css('width');
            const height = figure.css('height');
            const shape = figure.css('borderRadius') >= '50%' ? 'Круг' : 'Квадрат';
            const color = figure.css('backgroundColor');
            const locked = figure.data('locked') ? 'Заблокировано' : 'Разблокировано';
            const row = $('<tr>').append(
                $('<td>').text(id),
                $('<td>').text(width),
                $('<td>').text(shape),
                $('<td>').text(color),
                $('<td>').append(
                    $('<button>').text(locked).click(function() {
                        figure.data('locked', !figure.data('locked'));
                        updateFiguresInfo();
                    })
                )
            );
            figuresInfoTable.append(row);
        });
    }
    // Функция для генерации случайного цвета
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    // Создание начальных фигур
    $('#create-figures').click(function() {
        const figureCount = parseInt($('#figure-count').val());
        figures.length = 0;
        figuresContainer.empty();
        figuresInfoTable.empty();
        for (let i = 0; i < figureCount; i++) {
            createFigure();
        }
    });
    // Функция для обновления положения и характеристик фигур
    function updateFigures() {
        figures.forEach(function(figure) {
            if (!figure.data('locked')) {
                figure.css({
                    left: Math.floor(Math.random() * (figuresContainer.width() - 100)) + 'px',
                    top: Math.floor(Math.random() * (figuresContainer.height() - 100)) + 'px',
                    width: Math.floor(Math.random() * 100) + 50 + 'px',
                    height: Math.floor(Math.random() * 100) + 50 + 'px',
                    backgroundColor: getRandomColor(),
                    borderRadius: Math.floor(Math.random() * 100) + '%'
                });
            }
        });
        updateFiguresInfo();
    }
    // Обновление фигур каждые 2 секунды
    setInterval(updateFigures, 2000);
});