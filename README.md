# 🏆 Records API - Модуль 3. Основы backend

REST API для управления игровыми рекордами с MongoDB

## 📦 Быстрый старт

### Предварительные требования

- Node.js 16+
- MongoDB (локально или Docker)
- npm или yarn

### Установка

### 1. Запуск MongoDB

#### Вариант через WSL + Docker Desktop:

Пример для windows:

1. Установите Docker Desktop с включенной интеграцией WSL2
2. Создайте папку, где будут хранится данные mongo и создайте в ней docker-compose.yml со примерным содержимым:

```
version: "3.9"
services:
  module3.mongo:
    image: mongo
    restart: always
    container_name: module3.mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: module3
      MONGO_INITDB_ROOT_PASSWORD: module3
    ports:
      - 27017:27017

    volumes:
      - ./mongo-data:/data/db
    command: --wiredTigerCacheSizeGB 1.5

```

Примечание: опробовано на версиях 3.9 и 6. --wiredTigerCacheSizeGB 1.5 Занимаемый кэш максимально 1.5 GB. Названия сервиса/логин/пароль так же опционально.

3. В терминале WSL выполните:

```
docker-compose up -d
```


### 2. Настройка окружения

Создайте файл .development.env на основе .example.env:

```
cp .example.env .development.env
```

Заполните необходимые переменные окружения.

```
npm install
npm run start:dev
```

## 📡 API Endpoints

Базовый URL: http://localhost:3000/api/v1/record

### 🟢 GET /

Получить все рекорды

Ответ:

```
[
  {
    "username": "string",
    "time": "number | null",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### 🟠 POST /

Создает или обновляет запись (Вызывать при старте/рестарте игры)

```
{
  "_id?": "string" // опционально
}
```

Поведение:
Без \_id → создает новую запись
С \_id → ищет запись и обновляет updatedAt
Если запись не найдена → 400 Bad Request

Ответ:

```
{
  "username": "string",
  "time": "number | null",
  "_id": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### 🔵 PATCH /:id

Обновляет рекорд если он побит. (Вызывать, если игра выйграна)

Параметры URL:

- id - идентификатор записи

Поведение:

- Если id не найден → 400 Bad Request
- Если новое время лучше (меньше) → обновляет запись
- Если рекорд не побит → сохраняет старый результат

Ответ:

```
{
  "username": "string",
  "time": "number",
  "_id": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "isRecord": "boolean"
}
```

Где:

time - текущее время прохождения
isRecord - true если рекорд побит

### Технологии

- NestJS
- MongoDB
- Docker (для локальной разработки)
