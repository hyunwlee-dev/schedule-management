# schedule-management

## 프로젝트 실행 방법

1. docker 명령어

```shell
sudo docker run -dp 3000:3000 --name hyunwlee-schedule-management hyunwlee/schedule-management:latest
```

2. http://localhost:3000 확인

3. docker 삭제

```shell
sudo docker rm -f hyunwlee-schedule-management &&
sudo docker rmi hyunwlee/schedule-management
```

## 실시간 채팅 계정

```
id: cat@test.com
pwd: cat

id: dog@test.com
pwd: dog
```

## 라이브러리의 사용목적

1. `supabase`
   영구적인 데이터를 저장시킬 장소와, 실시간 채팅을 위해 필요한 간편한 로그인 인증/인가 처리를 위한 방법을 고민했고, supabase가 적합하다 생각하여 채택했습니다.

2. `react-query`
   클라이언트 단에서 비동기 데이터를 효과적으로 캐시처리하고 동기화하며, pending이나 loading 같은 상태관리로 번잡한 코드를 줄이고자 채택했습니다.

3. `react-hook-form 와 zod`
   regitser ref를 통해 리렌더링을 최소화시켜 성능에 좋을 뿐더러 zod를 통해 form field 유효성 검사와 에러 핸들링의 수월함을 위해 채택했습니다.

4. `react-calendar`
   다운로드 수가 많았으며, calendar 화면보다는 로직에 집중할 수 있어서 채택했습니다.

5. `zustand`
   provider가 필요없는 쉽고 직관적인 전역 상태관리 라이브러리이며, 프로젝트 내에서 채팅할 유저 아이디 상태값을 depth가 다른 컴포넌트에서 손쉽게 조작하고 읽어들일 수 있었습니다.

6. `dayjs`
   날짜계산 라이브러리 중에 가장 경량 라이브러리로 알고 있으며, 복잡한 플러그인 없이 built-in 라이브러리 만으로 해결할 수 있는 상황이여서 채택하였습니다.

7. `class-varinace-authority`
   디자인 시스템을 작업하면서 clsx로 조건부처리보다 수월하게 관리할 수 있는 경험 바탕으로 복잡한 커스텀 컴포넌트에 사용하기 위해 채택하였습니다.

8. `@trivago/prettier-plugin-sort-imports`
   import 순서 컨벤션에 많은 도움이 되었습니다.

9. `commitzen, cz-customizable`
   commit convention에 도움을 줄 수 있는 도구이며, husky client hook (prepare-commit-msg)에 트리거를 시켜 효과적으로 커밋 컨벤션에 도움이 되었습니다.

10. `react-dropzone`
    file 처리에 drag & drop 처리를 위한 라이브러리이며, 또한 파일 크기, 파일 확장자 등 파일 유효성 처리에 많은 도움을 받을 수 있었습니다.
