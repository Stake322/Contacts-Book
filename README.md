# Книга контактов 
Этот проект создан для тестового задания, имеет функционал: 
- Регистрации пользователя: логин и пароль.
- Входа по логину и паролю.
- Страница контактов, где у пользователя есть возможность.
  - добавлять контакты, 
  - удалять контакты, 
  - изменять контакты.
- Функция поиска нужных контактов по каждому свойству.
- Выход из системы.

                                      
# Backend server: JSON-SERVER 
Использовал JSON-SERVER: https://github.com/typicode/json-server для привязки backend'а к приложению. 
## Как запустить Backend?
1) Укажите путь к файлу db.json
`cd src/api`
2) Запустите его командой
`json-server --watch db.json`

## Available Scripts

In the project directory, you can run:

## config
В папке `src` есть `config.json` в котором нужно указать путь страницы mainpage и contacts, потому что каждый запускает на своём порте 

### `yarn`
Устанавливает необходимые модули. ОБЯЗАТЕЛЬНО ДЛЯ ЗАПУСКА ПРИЛОЖЕНИЯ!

### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.




