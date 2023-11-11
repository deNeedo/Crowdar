cd crowdar-server
docker-compose up --build --no-recreate -d
docker exec -it vite_docker npm install vite && npm i && npm run dev