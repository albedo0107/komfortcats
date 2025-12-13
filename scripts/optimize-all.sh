#!/bin/bash

# ===========================================
# KOMPLETNÍ OPTIMALIZACE MÉDIÍ PRO KOMFORTCARS
# ===========================================
# Tento skript zkomprimuje všechny obrázky a videa
# pro rychlé načítání na webu.
#
# PŘED SPUŠTĚNÍM: Udělej si zálohu složky public/!
# ===========================================

set -e

PUBLIC_DIR="public"
BACKUP_DIR="public_backup_$(date +%Y%m%d_%H%M%S)"

# Barvy pro výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}"
echo "============================================"
echo "  OPTIMALIZACE MÉDIÍ PRO KOMFORTCARS"
echo "============================================"
echo -e "${NC}"

# Kontrola nástrojů
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick není nainstalovaný!${NC}"
    echo "   Instalace: sudo dnf install ImageMagick"
    exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}❌ FFmpeg není nainstalovaný!${NC}"
    echo "   Instalace: sudo dnf install ffmpeg"
    exit 1
fi

# Výpočet aktuální velikosti
echo -e "${YELLOW}📊 Aktuální velikost složky public/:${NC}"
du -sh "$PUBLIC_DIR"
echo ""

# Dotaz na zálohu
read -p "Chceš vytvořit zálohu před optimalizací? (a/n): " CREATE_BACKUP
if [[ "$CREATE_BACKUP" =~ ^[Aa]$ ]]; then
    echo -e "${YELLOW}📦 Vytvářím zálohu do $BACKUP_DIR...${NC}"
    cp -r "$PUBLIC_DIR" "$BACKUP_DIR"
    echo -e "${GREEN}✅ Záloha vytvořena${NC}"
fi

echo ""
echo -e "${YELLOW}🖼️  OPTIMALIZACE OBRÁZKŮ${NC}"
echo "============================================"

# Počítadlo
total_images=0
optimized_images=0
saved_bytes=0

# Najdi všechny JPEG a JPG soubory
while IFS= read -r -d '' file; do
    total_images=$((total_images + 1))
    
    # Získej velikost souboru
    size_before=$(stat -c%s "$file")
    size_kb=$((size_before / 1024))
    
    # Přeskoč malé soubory (pod 100KB)
    if [ $size_kb -lt 100 ]; then
        echo -e "  ⏭️  Přeskočeno (< 100KB): $(basename "$file")"
        continue
    fi
    
    echo -n "  🔧 $(basename "$file") (${size_kb}KB) → "
    
    # Optimalizuj obrázek
    # - Max šířka 1920px
    # - Kvalita 80%
    # - Odstranění EXIF dat
    # - Progresivní JPEG
    convert "$file" \
        -resize "1920x1920>" \
        -quality 80 \
        -strip \
        -interlace Plane \
        -sampling-factor 4:2:0 \
        "$file"
    
    # Získej novou velikost
    size_after=$(stat -c%s "$file")
    size_after_kb=$((size_after / 1024))
    saved=$((size_before - size_after))
    saved_kb=$((saved / 1024))
    
    if [ $saved -gt 0 ]; then
        saved_bytes=$((saved_bytes + saved))
        optimized_images=$((optimized_images + 1))
        echo -e "${GREEN}${size_after_kb}KB (ušetřeno ${saved_kb}KB)${NC}"
    else
        echo -e "${YELLOW}${size_after_kb}KB (beze změny)${NC}"
    fi
    
done < <(find "$PUBLIC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

# PNG soubory
while IFS= read -r -d '' file; do
    total_images=$((total_images + 1))
    
    size_before=$(stat -c%s "$file")
    size_kb=$((size_before / 1024))
    
    if [ $size_kb -lt 100 ]; then
        echo -e "  ⏭️  Přeskočeno (< 100KB): $(basename "$file")"
        continue
    fi
    
    echo -n "  🔧 $(basename "$file") (${size_kb}KB) → "
    
    convert "$file" \
        -resize "1920x1920>" \
        -strip \
        "$file"
    
    size_after=$(stat -c%s "$file")
    size_after_kb=$((size_after / 1024))
    saved=$((size_before - size_after))
    saved_kb=$((saved / 1024))
    
    if [ $saved -gt 0 ]; then
        saved_bytes=$((saved_bytes + saved))
        optimized_images=$((optimized_images + 1))
        echo -e "${GREEN}${size_after_kb}KB (ušetřeno ${saved_kb}KB)${NC}"
    else
        echo -e "${YELLOW}${size_after_kb}KB (beze změny)${NC}"
    fi
    
done < <(find "$PUBLIC_DIR" -type f -iname "*.png" -print0)

echo ""
echo -e "${YELLOW}🎬 OPTIMALIZACE VIDEÍ${NC}"
echo "============================================"

# Dotaz na optimalizaci videí
read -p "Chceš optimalizovat i videa? Může trvat déle. (a/n): " OPTIMIZE_VIDEOS

if [[ "$OPTIMIZE_VIDEOS" =~ ^[Aa]$ ]]; then
    while IFS= read -r -d '' file; do
        size_before=$(stat -c%s "$file")
        size_mb=$((size_before / 1024 / 1024))
        
        echo -n "  🎬 $(basename "$file") (${size_mb}MB) → "
        
        # Vytvoř dočasný soubor
        temp_file="${file}.temp.mp4"
        
        # Komprese videa
        # - H.264 kodek
        # - CRF 28 (dobrý poměr kvalita/velikost)
        # - Rychlý preset
        # - Max 1080p
        ffmpeg -y -i "$file" \
            -c:v libx264 \
            -crf 28 \
            -preset fast \
            -vf "scale='min(1920,iw)':min'(1080,ih)':force_original_aspect_ratio=decrease" \
            -c:a aac \
            -b:a 128k \
            -movflags +faststart \
            "$temp_file" 2>/dev/null
        
        # Nahraď původní soubor
        mv "$temp_file" "$file"
        
        size_after=$(stat -c%s "$file")
        size_after_mb=$((size_after / 1024 / 1024))
        saved=$((size_before - size_after))
        saved_mb=$((saved / 1024 / 1024))
        
        saved_bytes=$((saved_bytes + saved))
        echo -e "${GREEN}${size_after_mb}MB (ušetřeno ${saved_mb}MB)${NC}"
        
    done < <(find "$PUBLIC_DIR" -maxdepth 1 -type f -iname "*.mp4" -print0)
fi

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  OPTIMALIZACE DOKONČENA!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  📊 Celkem obrázků: $total_images"
echo -e "  ✅ Optimalizováno: $optimized_images"
echo -e "  💾 Ušetřeno: $((saved_bytes / 1024 / 1024)) MB"
echo ""
echo -e "${YELLOW}📊 Nová velikost složky public/:${NC}"
du -sh "$PUBLIC_DIR"
echo ""

if [[ "$CREATE_BACKUP" =~ ^[Aa]$ ]]; then
    echo -e "${YELLOW}💡 Pro obnovení zálohy:${NC}"
    echo "   rm -rf $PUBLIC_DIR && mv $BACKUP_DIR $PUBLIC_DIR"
    echo ""
    echo -e "${YELLOW}💡 Pro smazání zálohy:${NC}"
    echo "   rm -rf $BACKUP_DIR"
fi





