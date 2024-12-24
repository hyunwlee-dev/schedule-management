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
