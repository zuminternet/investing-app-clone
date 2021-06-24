# investing-app-clone

## 프로젝트 실행

```bash
yarn install
yarn workspaces install

# build로 필요한 파일 생성
yarn workspaces run build

# 각 레포별로 실행; 개발모드
yarn workspaces [레포이름] run dev
# 배포모드 실행
yarn workspaces [레포이름] run start
```

### 참고. `yarn workspace` for monorepo

**의존성 설치**

- 프로젝트 전체 의존성 설치

  ```bash
  yarn install
  ```

- 특정 Repo에 의존성 설치 / 제거

  ```bash
  # 설치
  yarn workspace [레포이름] add [패키지이름]

  # 제거
  yarn workspace [레포이름] remove [패키지이름]
  ```

**스크립트 실행**

- 전체 workspace에서 동일한 커맨드 실행

  ```bash
  yarn workspaces run [커맨드]
  ```

- 특정 workspace에서 실행

  ```bash
  yarn workspace [레포이름] run [커맨드]

  # ex.
  yarn workspace wiii run build
  yarn workspace wiii run dev
  ```
