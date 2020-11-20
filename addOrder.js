module.exports = class Table {
    constructor(titles) {
        this.head = '';
        this.body = '';
        if (this.head === '') {
            this.head = `<tr>${titles.map(title => `<th>${title}</th>`).join('')}</tr>`;
        }
    }

    addOrder(data) {
        this.body += `<tr>
<td>${data.petType === 'cat' && 'Кот' || data.petType === 'dog' && 'Собака' || data.petType === 'tiger' && 'Тигр'}</td>
<td>${data.gender === 'girl' && 'Ж' || data.gender === 'boy' && 'М' || 'Любой'}</td>
<td>${/^#[0-9a-f]{6}$/i.test(data.eyeColor) && `<div class="block-color" style="background-color: ${data.eyeColor}"><div>`}</td>
<td>${/^[0-9]{1,3}$/.test(data.tailLength) && `${data.tailLength} см`}</td>
<td>${data.name}</td>
<td>${/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data.dateOfBirth) && data.dateOfBirth.split('-').reverse().join('-')}</td>
<td>${/^.+@.+\..+$/igm.test(data.email) && `<a href="mailto:${data.email}">${data.email}</a>`}</td>
<td>${data.phone}</td>
</tr>`;
    }

    get() {
        return `<table class="orders"><thead>${this.head}</thead><tbody>${this.body}</tbody></table>`
    }
}