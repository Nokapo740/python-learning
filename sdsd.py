def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Или проще:
# def sum_list(numbers):
#     return sum(numbers)

# Тестирование
print(sum_list([1, 2, 3, 4,]))  # 15