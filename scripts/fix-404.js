#!/usr/bin/env node

/**
 * GitHub Pages 404 문제 해결 스크립트
 * 빌드 후 dist 폴더에 404.html을 index.html의 복사본으로 생성
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');

if (!fs.existsSync(indexHtml)) {
  console.error('index.html을 찾을 수 없습니다. 먼저 빌드하세요.');
  process.exit(1);
}

// index.html 읽기
const indexContent = fs.readFileSync(indexHtml, 'utf-8');

// 404.html로 복사
fs.writeFileSync(notFoundHtml, indexContent, 'utf-8');

console.log('✅ 404.html이 생성되었습니다.');

