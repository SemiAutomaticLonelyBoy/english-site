#!/bin/bash

# Счетчик
count=1

# Включаем нечувствительность к регистру (чтобы находило и .jpg и .JPG)
shopt -s nocaseglob

# Создаем временную папку, чтобы избежать конфликтов имен 
# (например, если файл "1.jpg" уже существует)
mkdir -p temp_rename_dir

echo "Начинаю переименование..."

# Список расширений, которые будем обрабатывать
for ext in jpg jpeg png gif webp mp4 mov avi mkv; do
    for file in *."$ext"; do
        # Проверяем, существует ли файл (на случай, если файлов с таким расширением нет)
        if [[ -f "$file" ]]; then
            # Получаем расширение файла
            extension="${file##*.}"
            # Перемещаем файл во временную папку с новым именем
            mv "$file" "temp_rename_dir/$count.${extension,,}"
            ((count++))
        fi
    done
done

# Перемещаем файлы обратно в текущую директорию
if [ -d temp_rename_dir ]; then
    mv temp_rename_dir/* . 2>/dev/null
    rmdir temp_rename_dir
fi

echo "Готово! Переименовано файлов: $((count-1))"