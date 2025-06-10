#!/bin/bash

echo "Building React App for XAMPP deployment..."
npm run build:xampp

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo ""
echo "Build completed successfully!"
echo ""
echo "To deploy to XAMPP:"
echo "1. Make sure XAMPP is installed"
echo "2. Create folder: /Applications/XAMPP/htdocs/reactwebapi/ (macOS)"
echo "   or /opt/lampp/htdocs/reactwebapi/ (Linux)"
echo "3. Copy all contents from 'dist' folder to the reactwebapi folder"
echo "4. Start Apache server in XAMPP"
echo "5. Visit: http://localhost/reactwebapi/"
echo ""

# Optional: Auto copy if XAMPP path exists (macOS)
if [ -d "/Applications/XAMPP/htdocs" ]; then
    read -p "Do you want to auto-copy to XAMPP folder? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mkdir -p /Applications/XAMPP/htdocs/reactwebapi
        cp -r dist/* /Applications/XAMPP/htdocs/reactwebapi/
        echo "Files copied to XAMPP successfully!"
    fi
fi
