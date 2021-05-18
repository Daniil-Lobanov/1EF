/*Таблица
На странице расположена таблица, состоящая из 4-5 столбцов, содержащих информацию о чем-угодно. 
Это может быть список студентов, это может быть список автомобилей или тайтлов аниме. 
Есть какой-то набор предопределенных данных. 


E. редактирование строки (в каждой строке есть кнопка "редактировать", превращающая ячейки в input'ы, 
можно отредактировать, нажать "сохранить" и в таблице снова будут ячейки, нельзя сохранить пустое поле)

F. массовое удаление строк (в каждой строке есть чек-бокс, можно выбрать несколько строк
и нажать кнопку удалить, они удалятся)
*/

function onDelete()
{
	const rows = document.querySelectorAll('tr');

	for (let row of rows)
	{
		const checkBox = row.children[0].firstChild;
		if (checkBox.checked)
		{
			row.remove();
		}
	}

}

function initTableControls()
{
	let table = document.getElementById('my-table');
	let rows = table.getElementsByTagName('tr');

	for (let row of rows)
	{
		const checkBoxCell = row.insertCell(0);
		let checkBox = document.createElement('input');
		checkBox.setAttribute('type','checkBox');
		checkBoxCell.append(checkBox);
	}

	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Удалить';
	deleteButton.addEventListener('click', onDelete);

	table.after(deleteButton);
}


window.onload = initTableControls;