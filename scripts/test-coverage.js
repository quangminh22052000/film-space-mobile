#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🧪 Running tests with coverage...')

try {
  // Chạy test với coverage
  execSync('npm run test:coverage', { 
    stdio: 'inherit',
    cwd: process.cwd()
  })

  // Kiểm tra coverage report
  const coveragePath = path.join(process.cwd(), 'coverage', 'lcov-report', 'index.html')
  
  if (fs.existsSync(coveragePath)) {
    console.log('\n✅ Coverage report generated successfully!')
    console.log(`📊 Open ${coveragePath} to view detailed coverage`)
    
    // Đọc coverage summary
    const summaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json')
    if (fs.existsSync(summaryPath)) {
      const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
      console.log('\n📈 Coverage Summary:')
      console.log(`   Statements: ${summary.total.statements.pct}%`)
      console.log(`   Branches: ${summary.total.branches.pct}%`)
      console.log(`   Functions: ${summary.total.functions.pct}%`)
      console.log(`   Lines: ${summary.total.lines.pct}%`)
    }
  } else {
    console.log('❌ Coverage report not found')
  }

} catch (error) {
  console.error('❌ Test execution failed:', error.message)
  process.exit(1)
}
