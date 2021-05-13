# investing-app-clone

## `yarn workspace` for monorepo

### 프로젝트 전체 의존성 설치

```bash
yarn install
```

### 특정 Repo에 의존성 설치 / 제거

```bash
# 설치
yarn workspace [레포이름] add [패키지이름]

# 제거
yarn workspace [레포이름] remove [패키지이름]
```

### 스크립트 실행

전체 workspace에서 동일한 커맨드 실행

```bash
yarn workspaces run [커맨드]
```
