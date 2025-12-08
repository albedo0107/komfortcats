#!/bin/bash

# Skript pro optimalizaci obrázků pro web
# Vyžaduje: ImageMagick (convert) nebo sharp-cli
# Instalace: sudo dnf install ImageMagick (Fedora) nebo sudo apt install imagemagick (Ubuntu)

PUBLIC_DIR="public"
QUALITY=70
MAX_WIDTH=1920
MAX_HEIGHT=1080

echo "🖼️  Optimalizace obrázků pro KomfortCars..."
echo "============================================"

# Kontrola, zda je ImageMagick nainstalovaný
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick není nainstalovaný!"
    echo "Nainstalujte pomocí: sudo dnf install ImageMagick"
    exit 1
fi

# Počítadla
total=0
optimized=0
skipped=0

# Najdi všechny JPEG a JPG soubory
find "$PUBLIC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r file; do
    total=$((total + 1))
    
    # Získej velikost souboru
    size=$(stat -c%s "$file")
    size_kb=$((size / 1024))
    
    # Přeskoč malé soubory (pod 100KB)
    if [ $size_kb -lt 100 ]; then
        echo "⏭️  Přeskočeno (malý soubor): $file ($size_kb KB)"
        skipped=$((skipped + 1))
        continue
    fi
    
    echo "🔧 Optimalizuji: $file ($size_kb KB)"
    
    # Vytvoř zálohu
    backup="${file}.backup"
    cp "$file" "$backup"
    
    # Optimalizuj obrázek
    convert "$file" \
        -resize "${MAX_WIDTH}x${MAX_HEIGHT}>" \
        -quality $QUALITY \
        -strip \
        -interlace Plane \
        "$file"
    
    # Získej novou velikost
    new_size=$(stat -c%s "$file")
    new_size_kb=$((new_size / 1024))
    saved=$((size_kb - new_size_kb))
    
    echo "   ✅ Hotovo: $new_size_kb KB (ušetřeno $saved KB)"
    optimized=$((optimized + 1))
done

echo ""
echo "============================================"
echo "✅ Optimalizace dokončena!"
echo "   Celkem souborů: $total"
echo "   Optimalizováno: $optimized"
echo "   Přeskočeno: $skipped"
echo ""
echo "💡 Pro obnovení zálohy spusťte:"
echo "   find $PUBLIC_DIR -name '*.backup' -exec bash -c 'mv \"\$1\" \"\${1%.backup}\"' _ {} \\;"
echo ""
echo "💡 Pro smazání záloh spusťte:"
echo "   find $PUBLIC_DIR -name '*.backup' -delete"





