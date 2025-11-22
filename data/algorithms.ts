export const algorithms = [
  {
    id: 1,
    title: 'Линейный поиск',
    category: 'Поиск',
    difficulty: 'Начальный',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Простейший алгоритм поиска элемента в массиве',
    explanation: `Линейный поиск проверяет каждый элемент массива последовательно, пока не найдет нужный элемент или не достигнет конца массива.

**Преимущества:**
- Работает с неотсортированными данными
- Простая реализация
- Не требует дополнительной памяти

**Недостатки:**
- Медленный для больших массивов
- Неэффективен для частых поисков`,
    code: `def linear_search(arr, target):
    """
    Поиск элемента в массиве
    
    Параметры:
    arr -- список элементов
    target -- искомый элемент
    
    Возвращает:
    Индекс элемента или -1 если не найден
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Пример использования
numbers = [64, 34, 25, 12, 22, 11, 90]
target = 22

index = linear_search(numbers, target)
if index != -1:
    print(f"Элемент {target} найден на позиции {index}")
else:
    print(f"Элемент {target} не найден")`,
    visualSteps: [
      'Начинаем с первого элемента',
      'Сравниваем с искомым значением',
      'Если совпадает - возвращаем индекс',
      'Если нет - переходим к следующему',
      'Повторяем до конца массива'
    ]
  },
  {
    id: 2,
    title: 'Бинарный поиск',
    category: 'Поиск',
    difficulty: 'Начальный',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Эффективный поиск в отсортированном массиве',
    explanation: `Бинарный поиск делит массив пополам на каждой итерации, сравнивая средний элемент с искомым значением.

**Преимущества:**
- Очень быстрый для больших массивов
- Логарифмическая сложность

**Недостатки:**
- Требует отсортированный массив
- Сложнее в реализации`,
    code: `def binary_search(arr, target):
    """
    Бинарный поиск в отсортированном массиве
    
    Параметры:
    arr -- отсортированный список
    target -- искомый элемент
    
    Возвращает:
    Индекс элемента или -1
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Пример использования
numbers = [11, 12, 22, 25, 34, 64, 90]  # Отсортирован!
target = 25

index = binary_search(numbers, target)
if index != -1:
    print(f"Элемент {target} найден на позиции {index}")
else:
    print(f"Элемент {target} не найден")`,
    visualSteps: [
      'Находим средний элемент',
      'Сравниваем со искомым',
      'Если равны - найдено!',
      'Если меньше - ищем в правой половине',
      'Если больше - ищем в левой половине'
    ]
  },
  {
    id: 3,
    title: 'Сортировка пузырьком',
    category: 'Сортировка',
    difficulty: 'Начальный',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Простой алгоритм сортировки методом обмена',
    explanation: `Сортировка пузырьком сравнивает соседние элементы и меняет их местами, если они в неправильном порядке.

**Преимущества:**
- Простая реализация
- Стабильная сортировка
- Работает на месте (in-place)

**Недостатки:**
- Очень медленная для больших массивов
- Много избыточных сравнений`,
    code: `def bubble_sort(arr):
    """
    Сортировка пузырьком
    
    Параметры:
    arr -- список для сортировки
    
    Возвращает:
    Отсортированный список
    """
    n = len(arr)
    
    for i in range(n):
        # Флаг для оптимизации
        swapped = False
        
        for j in range(0, n - i - 1):
            # Сравниваем соседние элементы
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # Если не было обменов - массив отсортирован
        if not swapped:
            break
    
    return arr

# Пример использования
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"До сортировки: {numbers}")

sorted_numbers = bubble_sort(numbers.copy())
print(f"После сортировки: {sorted_numbers}")`,
    visualSteps: [
      'Проходим по массиву',
      'Сравниваем соседние элементы',
      'Меняем местами если нужно',
      'Большие "всплывают" вправо',
      'Повторяем пока не отсортируем'
    ]
  },
  {
    id: 4,
    title: 'Быстрая сортировка',
    category: 'Сортировка',
    difficulty: 'Средний',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Один из самых быстрых алгоритмов сортировки',
    explanation: `Быстрая сортировка использует принцип "разделяй и властвуй", выбирая опорный элемент и разделяя массив на подмассивы.

**Преимущества:**
- Очень быстрая в среднем случае
- Эффективно использует кэш
- Популярна в реальных приложениях

**Недостатки:**
- Худший случай O(n²)
- Не стабильная
- Рекурсивная (использует стек)`,
    code: `def quick_sort(arr):
    """
    Быстрая сортировка
    
    Параметры:
    arr -- список для сортировки
    
    Возвращает:
    Отсортированный список
    """
    if len(arr) <= 1:
        return arr
    
    # Выбираем опорный элемент (pivot)
    pivot = arr[len(arr) // 2]
    
    # Разделяем на три части
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Рекурсивно сортируем и объединяем
    return quick_sort(left) + middle + quick_sort(right)

# Пример использования
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"До сортировки: {numbers}")

sorted_numbers = quick_sort(numbers)
print(f"После сортировки: {sorted_numbers}")`,
    visualSteps: [
      'Выбираем опорный элемент',
      'Делим на меньше, равные, больше',
      'Рекурсивно сортируем части',
      'Объединяем результаты',
      'Базовый случай - массив из 0-1 элемента'
    ]
  },
  {
    id: 5,
    title: 'Обход в глубину (DFS)',
    category: 'Графы',
    difficulty: 'Средний',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Алгоритм обхода графа в глубину',
    explanation: `DFS исследует граф, идя как можно глубже по каждой ветви перед возвратом.

**Применение:**
- Поиск пути в лабиринте
- Топологическая сортировка
- Поиск связных компонент
- Обнаружение циклов

**Реализация:**
Можно реализовать рекурсивно или с использованием стека.`,
    code: `def dfs_recursive(graph, vertex, visited=None):
    """
    Обход графа в глубину (рекурсивный)
    
    Параметры:
    graph -- словарь смежности
    vertex -- начальная вершина
    visited -- множество посещенных вершин
    """
    if visited is None:
        visited = set()
    
    visited.add(vertex)
    print(vertex, end=' ')
    
    for neighbor in graph[vertex]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

def dfs_iterative(graph, start):
    """
    Обход графа в глубину (итеративный)
    """
    visited = set()
    stack = [start]
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            visited.add(vertex)
            print(vertex, end=' ')
            
            # Добавляем соседей в стек
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited

# Пример графа
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print("Рекурсивный DFS:")
dfs_recursive(graph, 'A')
print("\\nИтеративный DFS:")
dfs_iterative(graph, 'A')`,
    visualSteps: [
      'Начинаем с стартовой вершины',
      'Отмечаем вершину посещенной',
      'Идем к первому непосещенному соседу',
      'Рекурсивно повторяем процесс',
      'Возвращаемся когда все соседи посещены'
    ]
  },
  {
    id: 6,
    title: 'Обход в ширину (BFS)',
    category: 'Графы',
    difficulty: 'Средний',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Алгоритм обхода графа в ширину',
    explanation: `BFS исследует граф уровень за уровнем, посещая все соседние вершины перед переходом на следующий уровень.

**Применение:**
- Поиск кратчайшего пути
- Поиск в социальных сетях
- Алгоритмы поиска в веб-роботах
- Решение головоломок

**Особенности:**
Использует очередь (FIFO) для хранения вершин.`,
    code: `from collections import deque

def bfs(graph, start):
    """
    Обход графа в ширину
    
    Параметры:
    graph -- словарь смежности
    start -- начальная вершина
    
    Возвращает:
    Множество посещенных вершин
    """
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=' ')
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited

def bfs_shortest_path(graph, start, goal):
    """
    Поиск кратчайшего пути с помощью BFS
    """
    if start == goal:
        return [start]
    
    visited = {start}
    queue = deque([(start, [start])])
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                if neighbor == goal:
                    return path + [neighbor]
                
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None

# Пример графа
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

print("BFS обход:")
bfs(graph, 'A')

print("\\n\\nКратчайший путь от A до F:")
path = bfs_shortest_path(graph, 'A', 'F')
print(' -> '.join(path))`,
    visualSteps: [
      'Добавляем стартовую вершину в очередь',
      'Извлекаем вершину из очереди',
      'Посещаем всех ее соседей',
      'Добавляем соседей в очередь',
      'Повторяем пока очередь не пуста'
    ]
  }
]

