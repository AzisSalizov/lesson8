const $form = document.querySelector('#form');
const $phoneInput = $form.querySelector('#phoneNumber');
const $amountInput = $form.querySelector('#amount');
const $feeInput = $form.querySelector('#fee');

$amountInput.addEventListener("input", function() {
    const amount = $amountInput.value;
    if (amount > 0 && amount <= 10_000) {
        $feeInput.value = Math.round(amount * 0.01)
    } else if (amount > 10_000 && amount <= 50_000) {
        $feeInput.value = Math.round(amount * 0.02)
    } else if (amount > 50_000 && amount <= 100_000) {
        $feeInput.value = Math.round(amount * 0.03)
    } else {
        $feeInput.value = 0
    }
})

$phoneInput.addEventListener("change", function() {
    const phone = $phoneInput.value;
    $phoneInput.value = formatPhone(phone);
})

$phoneInput.addEventListener("input", function() {
    const phone = $phoneInput.value;
    const operatorCode = detectOperator(phone);
    let backgroundImage;
    switch (operatorCode) {
        case "Mega":
            backgroundImage = "images/Mega.jpg";
            break;
        case "O!":
            backgroundImage = "images/Oshka.jpg";
            break;
        case "Beeline":
            backgroundImage = "images/beeline.jpg";
            break;
    }
    if (backgroundImage) {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = '200px';
    } else {
        document.body.style.backgroundImage = 'none';
    }
})

$form.addEventListener("submit", function(e) {
    e.preventDefault()
    const $formControls = $form.querySelectorAll('.form-control');
    for (const $formControl of $formControls) {
        $formControl.classList.remove('success' , "error");
    }
    const phone = $phoneInput.value;
    if (!phone) {
        setError($phoneInput , "Заполните номер телефона!")
    } else {
        setSuccess($phoneInput)
    }
    const amount = $amountInput.value;
    if (amount <= 0) {
        setError($amountInput, "Неверная сумма!")
    } else if (amount > 100_000) {
        setError($amountInput , "Максимальная сумма 100 000 сомов")
    }else  {
        setSuccess($amountInput)
    }

    const $fee = $feeInput.value;

    if ($fee > 0) {
        setSuccess($feeInput)
    } else {
        setError($feeInput , "Мы бесплтано не работаем!")
    }
})

function setError (inpElem , errorText) {
    const $formControl = inpElem.parentElement;
    $formControl.classList.add("error");
    $formControl.querySelector("small").textContent = errorText
}


function setSuccess (inpElem) {
    const $formControl = inpElem.parentElement;
    $formControl.classList.add("success");
}