(function () {
    window.onload = function () {
        const checker = {
            name: false,
            tailLength: false,
            dateOfBirth: false,
            email: false,
            phone: false,
        };

        const submit = document.getElementById('submit');
        const reset = document.getElementById('reset');

        const name = document.getElementById('name');
        const tailLength = document.getElementById('tailLength');
        const dateOfBirth = document.getElementById('dateOfBirth');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        const checking = () => {
            const res = Object.keys(checker).every(key => checker[key] === true);
            // console.log(checker)
            if (res) {
                submit.removeAttribute('disabled');
            } else {
                submit.setAttribute('disabled', 'disabled');
            }
        }

        validatePhone()
        validateName()
        validateTailLength()
        validateEmail()
        validateDate()
        checking();

        reset.onclick = () => {
            setTimeout(() => {
                Object.keys(checker).forEach(key => checker[key] = false);
                validatePhone()
                validateName()
                validateTailLength()
                validateEmail()
                validateDate()
                checking();
            }, 0);
        };

        name.oninput = validateName;
        tailLength.oninput = validateTailLength;
        dateOfBirth.oninput = validateDate;
        email.oninput = validateEmail;
        phone.oninput = validatePhone;

        function validatePhone() {
            const value = phone.value;
            const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
            const isValid = value.match(re);
            if (isValid) {
                checker.phone = true;
                phone.setCustomValidity('')
            } else {
                checker.phone = false;
                phone.setCustomValidity('Некорректный номер телефона')
            }
            checking()
        }

        function validateName() {
            const value = name.value;
            const re = /(^[А-Яа-я]{1}[а-яёА-Я -]{2,50}$)/gm;
            const isValid = value.match(re);
            if (isValid) {
                checker.name = true;
                name.setCustomValidity('')
            } else {
                checker.name = false;
                name.setCustomValidity('Некорректное имя. Только русские буквы. Длина 3-50 символов.')
            }
            checking()
        }

        function validateTailLength() {
            const value = tailLength.value;
            if (value >= 7 && value <= 120) {
                checker.tailLength = true;
                tailLength.setCustomValidity('')
            } else {
                checker.tailLength = false;
                tailLength.setCustomValidity('От 7 до 120.')
            }
            checking()
        }

        function validateDate() {
            const value = dateOfBirth.value;
            if (value && (new Date()).getTime() >= (new Date(value)).getTime()) {
                checker.dateOfBirth = true;
                dateOfBirth.setCustomValidity('')
            } else {
                checker.dateOfBirth = false;
                dateOfBirth.setCustomValidity('Некорректная дата.')
            }
            checking()
        }

        function validateEmail() {
            const value = email.value;
            const re = /^.+@.+\..+$/igm;
            const isValid = value.match(re);
            if (isValid) {
                checker.email = true;
                email.setCustomValidity('')
            } else {
                checker.email = false;
                email.setCustomValidity('Некорректны Email')
            }
            checking()
        }
    }
})();