#!/bin/bash

# ===========================================
# KOMPRESE VIDEÍ PRO KOMFORTCARS
# ===========================================
# Zkomprimuje videa na ~1-2 MB pro rychlé načítání
# Vyžaduje FFmpeg s libx264 (z RPM Fusion)
# ===========================================

set -e

cd "$(dirname "$0")/../public"

echo "🎬 KOMPRESE VIDEÍ PRO KOMFORTCARS"
echo "=================================="
echo ""

# Kontrola ffmpeg s libx264
if ! ffmpeg -encoders 2>/dev/null | grep -q "libx264"; then
    echo "❌ FFmpeg nemá libx264 enkodér!"
    echo ""
    echo "Nainstaluj plnou verzi FFmpeg:"
    echo "  sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-\$(rpm -E %fedora).noarch.rpm"
    echo "  sudo dnf swap ffmpeg-free ffmpeg --allowerasing"
    exit 1
fi

echo "✅ FFmpeg s libx264 nalezen"
echo ""

# Komprese video_finall.mp4 (hero video)
if [ -f "video_finall.mp4" ]; then
    echo "🔧 Kompresuji video_finall.mp4..."
    size_before=$(stat -c%s "video_finall.mp4")
    
    # Záloha
    cp "video_finall.mp4" "video_finall_original.mp4"
    
    # Komprese - cílová velikost ~1.5MB pro 5s video
    ffmpeg -y -i "video_finall_original.mp4" \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -vf "scale=1280:-2" \
        -c:a aac -b:a 64k \
        -movflags +faststart \
        "video_finall.mp4" 2>/dev/null
    
    size_after=$(stat -c%s "video_finall.mp4")
    echo "   Před: $((size_before/1024/1024))MB → Po: $((size_after/1024/1024))MB"
fi

# Komprese elektro.mp4
if [ -f "elektro.mp4" ]; then
    echo "🔧 Kompresuji elektro.mp4..."
    size_before=$(stat -c%s "elektro.mp4")
    
    cp "elektro.mp4" "elektro_original.mp4"
    
    ffmpeg -y -i "elektro_original.mp4" \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -vf "scale=1280:-2" \
        -c:a aac -b:a 64k \
        -movflags +faststart \
        "elektro.mp4" 2>/dev/null
    
    size_after=$(stat -c%s "elektro.mp4")
    echo "   Před: $((size_before/1024/1024))MB → Po: $((size_after/1024/1024))MB"
fi

echo ""
echo "✅ HOTOVO!"
echo ""
echo "Zálohy původních videí:"
ls -lh *_original.mp4 2>/dev/null || echo "  (žádné zálohy)"
echo ""
echo "Pro smazání záloh: rm -f public/*_original.mp4"

