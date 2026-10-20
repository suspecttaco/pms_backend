#!/bin/bash
set -e
VER="1.0.0"
echo "Construyendo paquete de producción..."
npm run build
node scripts/obfuscate.js
mkdir -p binaries
tar -czf binaries/pms_be_${VER}.tgz dist package.json package-lock.json server_config.json .env 2>/dev/null || tar -czf binaries/pms_be_${VER}.tgz dist package.json package-lock.json server_config.json
echo "Paquete creado: binaries/pms_be_${VER}.tgz"
