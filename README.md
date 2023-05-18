# YaChat

## [UI-прототип](https://www.figma.com/file/XjLCnx3RgYuH5lHkmZGzqt/YaChat-Wireframing?node-id=676973%3A432&t=wfzKhXANJILdxos6-1)

## [Посмотреть сайт](https://deploy-preview-4--dapper-yeot-dc4450.netlify.app)


## Описание

### Проект находится в стадии разработки!!!

Проект является мессенджером, который разрабатывается с использованием Typescript, SCSS и API браузера
с использованием паттерна MVC (Model-View-Controller).
Проект создается без использования сторонних библиотек и фреймворков, чтобы продемонстрировать,
что для создания веб-приложений может быть достаточно нативного JavaScript.

В проект входят стандартные функции чата, такие как регистрация, авторизация, список чатов и обмен сообщениями.

Для работы с сетевыми запросами в приложении используется класс HTTPTransport,
который позволяет осуществлять HTTP-запросы методами GET, POST, PUT и DELETE.

Это функционирующее веб-приложение, которое позволит пользователям зарегистрироваться, авторизоваться,
выбрать чат и обмениваться сообщениями с другими участниками.
Он имеет простой, интуитивно понятный интерфейс, который будет удобен в использовании.

## Использование навигации

Для использования навигации по странице используется объект router, который импортируется
из ```@shared/lib```

#### Пример использования
Чтоб добавить по определенному пути, используйте декоратор @router.use

```typescript
import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { Error } from '@widgets/error';
// пример Path
enum Path {
  LOGIN = '/',
  HOME = '/home',
  REGISTER = '/sign-up',
  USER_SETTINGS = '/settings',
  USER_PROFILE = '/profile',
  CHAT = '/messenger/:chatId',
  CHANGE_PASSWORD = '/change-password',
  CLIENT_ERROR = '/404',
  SERVER_ERROR = '/500',
}

// оборачивает класс Component и принимает в качестве параметра любую строку
@router.use(Path.CLIENT_ERROR)
export class ClientErrorPage extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const error = new Error({ errorCode: 404, errorMessage: 'Не туда попали' });
    return error.render();
  }
}
```

Так же router поддерживает параметры пути, определяются как: ```/messanger/:chatId/users```
Чтоб использовать этот параметр, можно воспользоваться хуком ```useParams```

### Сигнатура useParams

```typescript
import { useParams } from '@shared/lib';

const { chatId } = useParams<{ chatId: string }>();
```

## Store
В проекте используется декоратор connect для пробрасывания данных из хранилища в props

#### Сигнатура использования
```typescript
import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { Component, router, connect } from '@shared/lib';
import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';

@router.use(Path.USER_PROFILE)
@connect((state) => ({
  user: state.user,
}))
@sessionApi.requiredAuth
export class ProfilePage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const components = {
      AboutProfile: new AboutProfile(),
      ProfileSidebar: new ProfileSidebar(),
    };
    return {
      ...components,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
```


## loginRequired
Декоратор, для проверки доступности страницы,
первым аргументом, принимает функцию, проверающая, что пользователь в сети (может быть асинхронной), вторым аргументом
принимается путь, по которому будет осуществлен редирект, если проверка вернет false
Из примера выше показано как оборачивать компонент, а вот сам пример использования

```typescript
import { Path } from '@shared/config';
import { loginRequired } from '@shared/lib/decorators';

import { getMe } from './get-me';

const inSystem = async () => {
  try {
    const { id } = await getMe();
    if (id) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

const notInSystem = async () => {
  const res = await inSystem();
  return !res;
};

export const requiredAuth = loginRequired(inSystem, Path.LOGIN);

export const notForAuth = loginRequired(notInSystem, Path.HOME);
```

## Использование API запросов

```typescript
import { apiInstance } from './base';

export { apiInstance } from '@shared/api'

const BASE_URL = 'http://localhost:8080'

//GET-запрос
apiInstance.get(`${BASE_URL}/api/users`)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//POST-запрос
apiInstance.post(`${BASE_URL}/api/users`, {
  headers: {
    'Content-Type': 'application/json'
  },
  data: {
    name: 'John',
    age: 25
  }
})
  .then(response => {
    console.log('Response:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });

//PUT и DELETE запросы по аналогии выше
```

## Пример MVC по странице LogIn
```
    ├── pages/                        # Слой: Страницы приложения
    |   ├── login/                    # Слайс: (пример: Логин страница)
    |   |   ├── model/                # Сегмент: Бизнес-логика
    |   |   |    |
    |   |   |    ├── index.ts        # Контроллер
    |   |   |    ├── login-model.ts  # Модель
    |   |   |    └── types.ts        # Тип данных, хранимая моделью
    |   |   |
    |   |   └── ui/                   # Сегмент: Логика UI
    |   |   |    |
    |   |   |    ├── index.ts        # Представление страницы
    |   |   |    └── block.ts        # Сам компонент страницы
    |   |   |
    |   |   └── index.ts             # Входная точка в слой
...
```
#### pages/login/model/index.ts
```typescript
import { BaseController } from '@shared/lib';

import { LoginModel } from './login-model';
import { type LoginData } from './types';

export class LoginController extends BaseController<LoginData> {
  public readonly model = new LoginModel();

  public submit() {
    this.model.printData();
  }

  public changeField(field: keyof LoginData, text: string) {
    this.model.data[field] = text;
  }
}
```

#### pages/login/model/login-model.ts
```typescript
import { BaseModel } from '@shared/lib';

import { type LoginData } from './types';

const getInitialData = () : LoginData => ({
  login: '',
  password: '',
});

export class LoginModel extends BaseModel<LoginData> {
  public readonly data: LoginData = getInitialData();

  public printData(): void {
    console.log(this.data);
  }
}
```
#### pages/login/model/types.ts
```typescript
export type LoginData = {
  login: string,
  password: string,
};
```
#### pages/login/ui/index.ts
```typescript
import { LoginController } from '@pages/login/model';
import { BaseView } from '@shared/lib';

import { LoginPage } from './block';

import { type LoginData } from '../model/types';

export class LoginPageView extends BaseView<LoginData> {
  public readonly controller = new LoginController();

  constructor(public root: Element) {
    super();
  }

  protected getComponent() {
    return new LoginPage({
      onSubmit: (evt: Event) => {
        evt.preventDefault();
        this.controller.submit();
      },
      onChange: (field, text) => {
        this.controller.changeField(field, text);
      },
    });
  }
}
```
#### pages/login/ui/block.ts
```typescript
import { AuthForm } from '@features/auth-form';
import { type PropType, validate } from '@shared/lib';
import { Component } from '@shared/lib/component';
import { AuthField } from '@shared/ui/auth-field';
import { Button } from '@shared/ui/button';

type Props = {
  onSubmit: (evt: Event) => void
  onChange: (field: 'login' | 'password', value: string) => void
} & PropType;

export class LoginPage extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      events: {
        submit: (evt) => {
          this.props.onSubmit(evt);
        },
      },
    };
  }

  public render(): DocumentFragment {
    const loginField = new AuthField({
      label: 'Логин',
      fieldType: 'text',
      id: 'login',
      name: 'login',
      validationFn: validate.login,
      errorMessage: 'Неверный логин',
      onChange: (text: string) => {
        this.props.onChange('login', text);
      },
    });
    const passwordField = new AuthField({
      label: 'Пароль',
      fieldType: 'password',
      id: 'password',
      name: 'password',
      validationFn: validate.password,
      errorMessage: 'Неверный пароль',
      onChange: (text: string) => {
        this.props.onChange('password', text);
      },
    });
    const self = this;
    const fields = [loginField, passwordField];
    const authFrom = new AuthForm({
      fields,
      Button: new Button({
        text: 'Авторизоваться',
        events: {
          click: (evt) => {
            self.props.onSubmit(evt);
            fields.forEach((el) => el.validate());
          },
        },
        attr: {
          type: 'submit',
        },
      }),
      titleText: 'Вход',
      linkText: 'Войти',
      minHeight: '320px',
    });
    return authFrom.render();
  }
}
```
#### pages/login/index.ts
```typescript
export { LoginPageView } from './ui';
```

### Использование
```typescript
import { LoginPageView } from '@pages/login'

const container = document.querySelector('#root')!

new LoginPageView(container).mount()
```


## Основные команды

#### Важно!!! Вначале необходимо установить зависимости проекта
- `yarn install` — установка зависимо,

#### Проект запускается на порту 3000 - убедитесь, что порт не занят
`127.0.0.1:3000`

#### Команды:
- `yarn start` - сборка и раздача проекта с помощью express сервера,
- `yarn ts-check` - проверка проекта на валидность типов,
- `yarn dev` — запуск версии для разработчика,
- `yarn build` — сборка стабильной версии.

## Структура проекта
[По архитектуре FSD](https://feature-sliced.design/blog/rebranding-stable)

Структура проекта выглядит следующим образом:

```
├── server                      # Сервер express для раздачи статики
|     ...                       #
|                               #
└── src/                        #
    ├── app/                    # Инициализирующая логика приложения                #
    |                           #
    ├── pages/                  # Слой: Страницы приложения
    |   ├── {some-page}/        #     Слайс: (пример: Main страница)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── widgets/                # Слой: Самостоятельные и полноценные блоки для страниц
    |   ├── {some-widget}/      #     Слайс: (пример: Header widget)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    ├── features/               # Слой: Обрабатываемые пользовательские сценарии
    |   ├── {some-feature}/     #     Слайс: (пример: Filter feature)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── entities/               # Слой: Бизнес-сущности, которыми оперирует предметная область
    |   ├── {some-entity}/      #     Слайс: (например: сущность Product)
    |   |   ├── lib/            #         Сегмент: Инфраструктурная-логика (helpers/utils)
    |   |   ├── model/          #         Сегмент: Бизнес-логика
    |   |   └── ui/             #         Сегмент: Логика UI
    |   ...                     #
    |                           #
    ├── shared/                 # Слой: Переиспользуемые модули, без привязки к бизнес-логике
    |   ├── api/                #         Сегмент: Логика запросов к API (api instances, requests, ...)
    |   ├── config/             #         Сегмент: Конфигурация приложения (env-vars, ...)
    |   ├── lib/                #         Сегмент: Инфраструктурная логика приложения (utils/helpers)
    |   └── ui/                 #         Сегмент: UIKit приложения
    ├── styles/                 # Слой: С глоабльными стилями, миксинами и переменными
    |   ...                     #
    |                           #
    ├── index.html/             #
    |                           #
    └── index.ts/               #
```

