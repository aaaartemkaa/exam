$(document).ready(function() {
    const colors = ["red", "green", "blue", "yellow", "purple","gray","pink","black","brown","silver","gold"];
    const inputs = document.querySelectorAll('.inp')
    const submit = document.querySelector('#startBtn')
    const inpCheckBox = document.querySelectorAll('.inp-checkBox')
    const resetBtn = document.querySelector('#resetBtn')
    const minSize = $("#minSize");
    const maxSize = $("#maxSize");
    const errorVal = document.querySelector(".errorVal");
    let intervalCont = null
    function validation(e) { // валидация инпутов
        const inp = e.target
        const errMsg = this.nextElementSibling;
        if (inp.validity.patternMismatch) {
            errMsg.textContent = "Значение должно быть целым числом"
        } else if (inp.validity.rangeOverflow || inp.validity.rangeUnderflow) {
            errMsg.textContent = inp.getAttribute("data-msg")
        } else if (inp.validity.valueMissing) {
            errMsg.textContent = "Поле не должно быть пустым"
        } else {
            errMsg.textContent = ""
        }
        if (+minSize.val() > +maxSize.val()){
            errorVal.textContent = "Минимальное значение должно быть меньше максимального"
        } else {
            errorVal.textContent = ""
        }
        allValidity()
    }
    function allValidity(){ // валидация формы
        submit.disabled = !([...inputs].every(input => input.validity.valid) && [...inpCheckBox].some(input => input.checked) && minSize.val() <= maxSize.val());
    }
    //слушатели
    inpCheckBox.forEach(input => input.addEventListener('change', allValidity)) 
    inputs.forEach(input => input.addEventListener('input', validation))
    $("#form").submit(function(e) {
        clearInterval(intervalCont)
        e.preventDefault()
        const interval = $("#interval").val();
        const selectedShapes = [];
        submit.disabled = true
        $("input[type='checkbox']:checked").each(function() {
            selectedShapes.push($(this).attr("id"));
        });
        start(interval, minSize.val(), maxSize.val(), selectedShapes);
        e.target.reset()
    });
    // получение данных для нижнего поля
    function start (interval, minSize, maxSize, shapes) {
        intervalCont = setInterval(function() {
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
            console.log(Math.floor(Math.random() * (maxSize - minSize) + minSize))
            const $shape = $("<div>").addClass("shape").css({
                left: Math.random() * ($(window).width() - size),
                top: Math.random() * ($(window).height() - size),
                width: size,
                height: size,
                backgroundColor: color,
            });
            if (shape === "circle") {
                $shape.css("border-radius", "50%");
            } else if (shape === "triangle") {
                $shape.css({
                    width:size,
                    height: size,
                    borderLeft: size / 2 + "px solid #f0f0f0",
                    borderRight: size / 2 + "px solid  #f0f0f0",
                    borderBottom: size + "px solid " + color, 
                });
            } else if (shape === "paral") {
                $shape.css({
                    width: size,
                    height: size,
                    transform: 'skewX(30deg)',
                });
            }
            $shape.click(function() {
                $(this).remove();
            });
            $("#container").append($shape);
        }, interval * 1000); 
    }
    resetBtn.addEventListener('click', () => {
        document.querySelector("#container").innerHTML = ''
        // clearInterval(intervalCont) 
    })
});
