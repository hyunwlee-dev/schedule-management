## 프로젝트 실행 방법

1. docker 명령어
```shell
sudo docker build -t schedule-management . &&
sudo docker image prune -f &&
sudo docker run -dp 3000:3000 --name schedule-management-hyunwlee schedule-management
```

2. http://localhost:3000 확인

3. docker 삭제
```shell
sudo docker rm -f schedule-management-hyunwlee &&
sudo docker rmi schedule-management
```