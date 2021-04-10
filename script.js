/*Таблица
На странице расположена таблица, состоящая из 4-5 столбцов, содержащих информацию о чем-угодно. 
Это может быть список студентов, это может быть список автомобилей или тайтлов аниме. 
Есть какой-то набор предопределенных данных. 


E. редактирование строки (в каждой строке есть кнопка "редактировать", превращающая ячейки в input'ы, 
можно отредактировать, нажать "сохранить" и в таблице снова будут ячейки, нельзя сохранить пустое поле)

F. массовое удаление строк (в каждой строке есть чек-бокс, можно выбрать несколько строк
и нажать кнопку удалить, они удалятся)
*/

function onEditEnd(event)
{
	const saveBtn = event.target;
	const controlsCell = saveBtn.parentNode;
	const row = controlsCell.parentNode;

	const inputs = row.querySelectorAll('.cell-input');

	const valid = validateInputs(inputs);

	if (!valid) {
		alert('Одно из полей пустое');
		return;
	}

	saveBtn.removeEventListener('click', onEditEnd);
	saveBtn.remove();

	const changeButton = controlsCell.firstChild;
	toggleBtnVisibility(changeButton);

	for (let i=0, il=inputs.length; i<il; i++)
	{
		const input = inputs[i];
		input.parentNode.innerHTML = input.value; 
	}

}

function validateInputs(inputs) {
	for (let input of inputs) {
		if (input.value.trim() === '') {
			return false;
		}
	}

	return true;
}

function addSaveButton(cell)
{
	const saveButton = document.createElement('button');
	saveButton.innerHTML = 'Сохранить';
	saveButton.addEventListener('click', onEditEnd);
	cell.append(saveButton);
}

function createInput(value)
{
	const input = document.createElement('input');
	input.classList.add('cell-input')
	input.value = value;
	return input;
}

function addEditInputs(row)
{
	for (let i=1, cells = row.children, il=cells.length; i<il; i++)
	{
		const cell = cells[i];
		const input = createInput(cell.innerHTML);	
		cell.innerHTML = '';
		cell.append(input);
	}
}

function onChange(event)
{
	const changeButton = event.target;
	toggleBtnVisibility(changeButton);
	addSaveButton(changeButton.parentNode);
	addEditInputs(changeButton.parentNode.parentNode);
	
}

function initTableControls()
{
	let table = document.getElementById('my-table');
	let rows = table.getElementsByTagName('tr');

	for (let i = 0; i<rows.length; i++)
	{
		const changeButtonCell = rows[i].insertCell(0);
		let changeButton = document.createElement('button');
		changeButton.innerHTML = 'Редактировать';

		changeButton.addEventListener('click', onChange);

		changeButtonCell.append(changeButton);
	}
}

function toggleBtnVisibility(element) {
	element.classList.toggle('hide-control');
}

window.onload = initTableControls;