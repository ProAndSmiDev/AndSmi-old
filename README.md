![Лого проекта][1] 
# Проект "AndSmi":
## Шаблон сайта:
![Шаблон сайта "AndSmi"][2]
## Шаблон страницы сайта "Заглушка":
![Шаблон страницы сайта "Заглушка"][3]
## Шаблон страницы сайта "404":
![Шаблон страницы сайта "404"][4]

---

## Краткая инструкция по работе

### 0. Правила и методология
- [BEM-naming](https://ru.bem.info/methodology/naming-convention/#%D1%81%D1%82%D0%B8%D0%BB%D1%8C-two-dashes)
- [ESLint](https://eslint.org)
- [Stylelint](https://stylelint.io)

### 1. Стилизация проекта
- Все стили пишутся при помощи препроцессора [SCSS](https://sass-scss.ru)
- Стили компонентов находятся в папке __app/components/__
- Стили для вспомогательных функций и переменных хранятся в папке __app/assets/scss/helpers__
- Собирающие файлы хранятся в папке __app/assets/scss/bundle__
- Основной файл, который стоит всегда подключать, хранится в папке __app/assets/scss__ (main.scss)

### 2. Фото проекта
- Все фото данного проекта лежат в папке __app/assets/img__ и разбросаны по соответствующим папкам

### 3. Шрифты
- Все шрифты хранятся в папке __app/assets/fonts__

### 4. SVG
- Все svg для генерации спрайта хранятся в папке __app/assets/svg__

### 5. JS-модули (пользовательский код)
- Все пользовательские модули имеют свои названия через нижнее подчеркивание и лежат в папке __app/assets/js__

### 6. Pug
- Весь код HTML пишется при помощи шаблонизатора [Pug (Мопс)](https://pugjs.org)
- Верстка для компонентов лежит в папке __app/components__ и разбита по соответствующим папкам компонент
- Верстка для страниц (а именно подключение компонентов к странице и настройка SEO-мета-тегов) расположены в папке __app/assets/views__
- Верстка для шаблона (основной шаблон, на котором базируется макет) находится в папке __app/assets/templates__ в файле __\_template.pug__
- Миксины и переменные для верстки хрантся в папке __app/templates/helpers__ в соответствующих файлах __\_mixins.pug__

### 7. Данные для Pug (заместо БД)
- Данные для всего проекта хранятся в файле __*data.json*__ в папке __data/__

### 8. Сборка Gulp
1. DevDependencies:
    - [Babel](https://babeljs.io/)
    - [Browser-sync](https://browsersync.io/)
    - [cross-env](https://www.npmjs.com/package/cross-env)
    - [eslint](https://eslint.org/)
    - [fs](https://www.npmjs.com/package/fs)
    - [autoprefixer](https://autoprefixer.github.io/ru/)
    - [concat](https://www.npmjs.com/package/gulp-concat)
    - [csso](https://css.github.io/csso/csso.html)
    - [data](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Objects/JSON)
    - [group-css-media-queries](https://www.npmjs.com/package/group-css-media-queries)
    - [pug](https://pugjs.org)
    - [rename](https://www.npmjs.com/package/gulp-rename)
    - [sass/node-sass](https://sass-scss.ru)
    - [sourcemaps](https://denis-creative.com/source-maps-gulp-4)
    - [svg-sprite](https://svgsprit.es)
    - [ttf2woff2](https://cloudconvert.com/ttf-to-woff2)
    - [uglify/uglify-es](https://www.uglifyjs.net)
    - [stylelint](https://stylelint.io)

### Frontend-разработчик:
[![Лого специалиста по веб-разработке][5]](https://andsmi.ru)

[1]: readme/project-logo.png
[2]: readme/andsmi.jpg
[3]: readme/block.jpg
[4]: readme/404.jpg
[5]: readme/andsmi-logo.png
