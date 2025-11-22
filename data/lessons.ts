export const pythonLessons = [
  {
    id: 1,
    title: 'Введение в Python',
    category: 'Основы',
    difficulty: 'Начальный',
    duration: '15 мин',
    description: 'Первые шаги в программировании на Python',
    topics: [
      {
        id: '1-1',
        title: 'Что такое Python?',
        content: `Python - это высокоуровневый язык программирования, созданный Гвидо ван Россумом в 1991 году. 
        
Python известен своей простотой и читаемостью кода. Он используется в веб-разработке, анализе данных, машинном обучении, автоматизации и многих других областях.`,
        example: `# Первая программа на Python
print("Привет, мир!")
print("Python - это просто!")

# Математические операции
result = 2 + 2
print(f"2 + 2 = {result}")`,
        explanation: 'Функция print() выводит текст на экран. Символ # используется для комментариев.'
      },
      {
        id: '1-2',
        title: 'Переменные и типы данных',
        content: `Переменные используются для хранения данных. В Python не нужно явно указывать тип переменной.`,
        example: `# Числа
age = 25
price = 99.99

# Строки
name = "Анна"
message = 'Привет!'

# Булевы значения
is_student = True
has_car = False

# Вывод переменных
print(f"Меня зовут {name}, мне {age} лет")`,
        explanation: 'Python автоматически определяет тип данных. Используйте f-строки для форматирования.'
      }
    ]
  },
  {
    id: 2,
    title: 'Условные операторы',
    category: 'Основы',
    difficulty: 'Начальный',
    duration: '20 мин',
    description: 'Научитесь принимать решения в коде',
    topics: [
      {
        id: '2-1',
        title: 'Оператор if',
        content: `Условные операторы позволяют выполнять код в зависимости от условий.`,
        example: `# Простое условие
age = 18

if age >= 18:
    print("Вы совершеннолетний")
else:
    print("Вы несовершеннолетний")

# Множественные условия
score = 85

if score >= 90:
    grade = "Отлично"
elif score >= 75:
    grade = "Хорошо"
elif score >= 60:
    grade = "Удовлетворительно"
else:
    grade = "Неудовлетворительно"

print(f"Оценка: {grade}")`,
        explanation: 'Используйте if для проверки условий, elif для дополнительных проверок, else для остальных случаев.'
      }
    ]
  },
  {
    id: 3,
    title: 'Циклы',
    category: 'Основы',
    difficulty: 'Начальный',
    duration: '25 мин',
    description: 'Повторяйте действия с циклами for и while',
    topics: [
      {
        id: '3-1',
        title: 'Цикл for',
        content: `Цикл for используется для итерации по последовательностям.`,
        example: `# Цикл по числам
for i in range(5):
    print(f"Итерация {i}")

# Цикл по списку
fruits = ["яблоко", "банан", "апельсин"]
for fruit in fruits:
    print(f"Мне нравится {fruit}")

# Цикл с enumerate
for index, fruit in enumerate(fruits, 1):
    print(f"{index}. {fruit}")`,
        explanation: 'range(5) создает последовательность от 0 до 4. enumerate() добавляет индексы.'
      },
      {
        id: '3-2',
        title: 'Цикл while',
        content: `Цикл while выполняется пока условие истинно.`,
        example: `# Простой цикл while
count = 0
while count < 5:
    print(f"Счет: {count}")
    count += 1

# Цикл с break
number = 1
while True:
    print(number)
    if number >= 5:
        break
    number += 1`,
        explanation: 'break прерывает цикл. Будьте осторожны с бесконечными циклами!'
      }
    ]
  },
  {
    id: 4,
    title: 'Списки',
    category: 'Структуры данных',
    difficulty: 'Средний',
    duration: '30 мин',
    description: 'Работа со списками и их методами',
    topics: [
      {
        id: '4-1',
        title: 'Создание и использование списков',
        content: `Списки - это упорядоченные изменяемые коллекции элементов.`,
        example: `# Создание списка
numbers = [1, 2, 3, 4, 5]
mixed = [1, "два", 3.0, True]

# Доступ к элементам
first = numbers[0]  # 1
last = numbers[-1]  # 5

# Срезы
subset = numbers[1:4]  # [2, 3, 4]

# Методы списков
numbers.append(6)  # Добавить элемент
numbers.insert(0, 0)  # Вставить в позицию
numbers.remove(3)  # Удалить элемент
popped = numbers.pop()  # Удалить последний

print(f"Список: {numbers}")
print(f"Длина: {len(numbers)}")`,
        explanation: 'Индексация начинается с 0. Отрицательные индексы считают с конца.'
      }
    ]
  },
  {
    id: 5,
    title: 'Словари',
    category: 'Структуры данных',
    difficulty: 'Средний',
    duration: '30 мин',
    description: 'Работа с парами ключ-значение',
    topics: [
      {
        id: '5-1',
        title: 'Основы словарей',
        content: `Словари хранят данные в формате ключ-значение.`,
        example: `# Создание словаря
person = {
    "name": "Иван",
    "age": 25,
    "city": "Москва"
}

# Доступ к значениям
name = person["name"]
age = person.get("age", 0)  # Безопасный доступ

# Изменение и добавление
person["age"] = 26
person["job"] = "Программист"

# Перебор словаря
for key, value in person.items():
    print(f"{key}: {value}")

# Методы словарей
keys = person.keys()
values = person.values()

print(f"Словарь: {person}")`,
        explanation: 'get() возвращает значение по умолчанию если ключ не найден.'
      }
    ]
  },
  {
    id: 6,
    title: 'Функции',
    category: 'Функции',
    difficulty: 'Средний',
    duration: '35 мин',
    description: 'Создание и использование функций',
    topics: [
      {
        id: '6-1',
        title: 'Определение функций',
        content: `Функции позволяют переиспользовать код.`,
        example: `# Простая функция
def greet():
    print("Привет!")

greet()

# Функция с параметрами
def greet_person(name):
    print(f"Привет, {name}!")

greet_person("Анна")

# Функция с возвратом значения
def add(a, b):
    return a + b

result = add(5, 3)
print(f"Результат: {result}")

# Функция с значениями по умолчанию
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25
print(power(5, 3))   # 125`,
        explanation: 'def определяет функцию. return возвращает значение из функции.'
      }
    ]
  }
]

