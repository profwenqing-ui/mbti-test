#!/bin/bash
set -Eeuo pipefail

echo "Building the Next.js project..."
echo "Current directory: $(pwd)"
echo "COZE_WORKSPACE_PATH: ${COZE_WORKSPACE_PATH:-}"

# 确保依赖已安装
pnpm install --no-frozen-lockfile 2>/dev/null || pnpm install

# 使用 pnpm exec 确保能找到本地安装的 next
pnpm exec next build

echo "Build completed successfully!"