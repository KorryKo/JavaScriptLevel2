let nameValidator = () => {
    let nameInput = document.getElementById('name-input');
    let nameError = document.getElementById('nameError');
    let nameInputValue = nameInput.value
    let nameRegExp = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    let nameResult = nameRegExp.test(nameInputValue);
    if (nameResult === false) {
        nameInput.style = "border:1px solid red;"
        nameError.classList.add('error-message-display'); 
    } else {
        nameInput.style = "border:1px solid green;"
        nameError.classList.remove('error-message-display');
    }
}

let emailValidator = () => {
    let mailInput = document.getElementById('mail-input');
    let mailError = document.getElementById('mailError');
    let mailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let mailResult = mailRegExp.test(mailInput.value);
    if (mailResult === false) {
        mailInput.style = "border:1px solid red;"
        mailError.classList.add('error-message-display');
    } else {
        mailInput.style = "border:1px solid green;"
        mailError.classList.remove('error-message-display');
    }
}

let phoneValidator = () => {
    let phoneInput = document.getElementById('phone-input');
    let phoneError = document.getElementById('phoneError');
    let phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    let phoneResult = phoneRegExp.test(phoneInput.value);
    if (phoneResult === false) {
        phoneInput.style = "border:1px solid red;"
        phoneError.classList.add('error-message-display');
    } else {
        phoneInput.style = "border:1px solid green;"
        phoneError.classList.remove('error-message-display')
    }
}

let validateForm = () => {
    nameValidator();
    emailValidator();
    phoneValidator();
}