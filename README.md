# FILM!

## Установка

### PostgreSQL

Установите PostgreSQL или запустите его в Docker из корня проекта:

```
docker-compose up -d
```

Создайте таблицы и заполните их тестовыми данными (скрипты лежат в `backend/test`):

```
docker exec -i postgres_container psql -U postgres -d films < backend/test/prac.init.sql
docker exec -i postgres_container psql -U postgres -d films < backend/test/prac.films.sql
docker exec -i postgres_container psql -U postgres -d films < backend/test/prac.shedules.sql
```

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `postgres`
* `DATABASE_URL` - адрес PostgreSQL, например `postgres://localhost:5432/films`
* `DATABASE_USERNAME` и `DATABASE_PASSWORD` - логин и пароль пользователя БД.

PostgreSQL должен быть установлен и запущен.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.




