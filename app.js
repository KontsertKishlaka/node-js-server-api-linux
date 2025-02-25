import express from 'express';
import path from 'path';
import routes from './routes/index.js'; // Подключаем роуты

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve(); // Определяем __dirname для ES Modules

// Настройка View Engine (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Указываем папку с шаблонами

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Подключаем статические файлы

// Роуты
app.use('/', routes);

// Обработчик ошибок 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Обработчик ошибок 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});