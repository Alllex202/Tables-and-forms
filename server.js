const express = require('express');
const app = express();
const port = 3000;
const constructPageBody = require('./checkOrder');


const pageHead =
    `
<!DOCTYPE html>
<html lang="ru">
<head>
<title>Результат заказа питомца</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<main class="unselectable">
<h1>Результат заказа питомца</h1>
`;

const pageFoot =
    `
<a href="/">⃪ Вернуться к форме заказа</a>
</main>
</body>
</html>
`;

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});


app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.post('/pets/orders', (request, response) => {
    const reqBody = request.body;
    let pageBody = constructPageBody(reqBody);
    let arr = pageBody.split('\n');

    // Правка заголовков
    arr = arr.map(el => {
        if (el === '<th>Тип животного</th>') {
            el = '<th>Животное</th>';
        } else if (el === '<th>Имя хозяина</th>') {
            el = '<th>Заказчик</th>';
        } else if (el === '<th>email</th>') {
            el = '<th>E-mail</th>';
        }
        return el;
    });

    // Правка тела
    const tableBody = `<tr>${arr[arr.length - 1]
        .split(/<tr>|<\/tr>|<\/table>/)
        .filter(e => e)
        .map(el => el.split(/<td>|<\/td>/).filter(e => e))
        .map(el => el.map((el, ind) => {
                if (ind === 0) {
                    el = el === 'cat' && 'Кот'
                        || el === 'dog' && 'Собака'
                        || el === 'tiger' && 'Тигр';
                } else if (ind === 1) {
                    el = el === 'girl' && 'Ж'
                        || el === 'boy' && 'М'
                        || 'Любой';
                } else if (ind === 2) {
                    el = /^#[0-9a-f]{6}$/i.test(el) && `<div class="block-color" style="background-color: ${el}"><div>`;
                } else if (ind === 3) {
                    el = /^[0-9]{1,3}$/.test(el) && `${el} см`;
                    // } else if (ind === 4) {
                    //
                } else if (ind === 5) {
                    el = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(el) && el.split('-').reverse().join('-');
                } else if (ind === 6) {
                    el = /^.+@.+\..+$/igm.test(el) && `<a href="mailto:${el}">${el}</a>`;
                    // } else if (ind === 7) {
                    //
                }
                return `<td>${el}</td>`;
            }).join('')
        ).join('</tr><tr>')}</tr></table>`;
    arr.pop();

    // Объединение результата
    arr.push(tableBody)
    pageBody = arr.join('');

    // console.log(tableBody)

    response.send(`${pageHead}${pageBody}${pageFoot}`);
});
