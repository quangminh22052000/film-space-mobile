# Unit Testing Guide

Hướng dẫn sử dụng unit test cho dự án Film Space Mobile.

## Cấu trúc thư mục

```
__tests__/
├── README.md                 # Hướng dẫn này
├── utils/
│   ├── test-utils.tsx        # Test utilities và helpers
│   └── formatDate.test.ts    # Test cho utility functions
├── components/
│   └── Button.test.tsx       # Test cho React components
├── services/
│   └── api.test.ts          # Test cho API services
├── stores/
│   └── movieStore.test.ts    # Test cho Zustand stores
├── hooks/                    # Test cho custom hooks
└── integration/              # Test tích hợp
```

## Chạy test

```bash
# Chạy tất cả test
npm test

# Chạy test với watch mode
npm run test:watch

# Chạy test với coverage
npm run test:coverage

# Chạy test trong CI mode
npm run test:ci
```

## Viết test

### 1. Test Components

```typescript
import React from 'react'
import { render, fireEvent } from '../utils/test-utils'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />)
    expect(getByText('Test')).toBeTruthy()
  })

  it('handles user interactions', () => {
    const mockOnPress = jest.fn()
    const { getByTestId } = render(
      <MyComponent onPress={mockOnPress} testID="my-button" />
    )
    
    fireEvent.press(getByTestId('my-button'))
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })
})
```

### 2. Test Hooks

```typescript
import { renderHook, act } from '@testing-library/react-native'
import { useMyHook } from '@/hooks/useMyHook'

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe(initialValue)
  })

  it('updates state correctly', async () => {
    const { result } = renderHook(() => useMyHook())
    
    await act(async () => {
      result.current.updateValue('new value')
    })
    
    expect(result.current.value).toBe('new value')
  })
})
```

### 3. Test Services

```typescript
import { ApiService } from '@/services/api'

// Mock fetch globally
global.fetch = jest.fn()

describe('ApiService', () => {
  let apiService: ApiService
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    apiService = new ApiService('https://api.example.com')
    mockFetch.mockClear()
  })

  it('makes successful GET request', async () => {
    const mockResponse = { data: 'test' }
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await apiService.get('/endpoint')
    expect(result).toEqual(mockResponse)
  })
})
```

### 4. Test Stores (Zustand)

```typescript
import { useMyStore } from '@/stores/myStore'

describe('MyStore', () => {
  beforeEach(() => {
    // Reset store state
    useMyStore.setState({
      // initial state
    })
  })

  it('updates state correctly', () => {
    useMyStore.getState().updateValue('new value')
    expect(useMyStore.getState().value).toBe('new value')
  })
})
```

## Test Utilities

### Custom Render Function

Sử dụng `render` từ `test-utils.tsx` để có sẵn các providers:

```typescript
import { render } from '../utils/test-utils'

// Tự động có QueryClientProvider
const { getByText } = render(<MyComponent />)
```

### Mock Data

```typescript
import { mockMovie, mockUser } from '../utils/test-utils'

// Sử dụng mock data có sẵn
const movie = mockMovie
const user = mockUser
```

### Async Helpers

```typescript
import { waitForAsync } from '../utils/test-utils'

// Chờ async operations
await waitForAsync(100)
```

## Best Practices

### 1. Test Naming

```typescript
describe('ComponentName', () => {
  it('should render correctly when props are provided', () => {
    // test implementation
  })

  it('should handle user interaction correctly', () => {
    // test implementation
  })

  it('should display error state when API fails', () => {
    // test implementation
  })
})
```

### 2. Arrange-Act-Assert Pattern

```typescript
it('should update count when button is pressed', () => {
  // Arrange
  const mockOnPress = jest.fn()
  const { getByTestId } = render(<Button onPress={mockOnPress} />)
  
  // Act
  fireEvent.press(getByTestId('button'))
  
  // Assert
  expect(mockOnPress).toHaveBeenCalledTimes(1)
})
```

### 3. Mocking

```typescript
// Mock external dependencies
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

// Mock functions
const mockApiCall = jest.fn()
jest.mock('@/services/api', () => ({
  apiCall: mockApiCall
}))
```

### 4. Test Coverage

- Components: 80%+
- Utilities: 90%+
- Services: 85%+
- Stores: 90%+

## Debugging Tests

### 1. Debug Mode

```bash
# Chạy test với debug info
npm test -- --verbose
```

### 2. Single Test

```bash
# Chạy một test file cụ thể
npm test -- Button.test.tsx

# Chạy một test case cụ thể
npm test -- -t "should render correctly"
```

### 3. Coverage Report

```bash
npm run test:coverage
# Mở coverage/lcov-report/index.html để xem report
```

## Common Issues

### 1. Async/Await

```typescript
// Sử dụng act() cho state updates
await act(async () => {
  result.current.updateValue('new value')
})
```

### 2. Mock Cleanup

```typescript
beforeEach(() => {
  jest.clearAllMocks()
  // Reset store state
})
```

### 3. TypeScript Errors

```typescript
// Thêm type assertions khi cần
const mockFetch = fetch as jest.MockedFunction<typeof fetch>
```

## Continuous Integration

Test sẽ chạy tự động trong CI pipeline:

- Pre-commit hooks
- Pull request checks
- Deployment validation

Đảm bảo tất cả test pass trước khi merge code.
