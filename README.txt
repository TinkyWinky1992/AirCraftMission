docker-compose up -d - startup image
docker-compose down - stop image 

docker ps - check if image running
docker exec -it aircraftdetected-postgres-1 psql -U yuval -d AirTrackerDatabase  - to run the database inside the image



\c postgres
DROP DATABASE "AirTrackerDatabase";

to deploy again please type: 
npx prisma migrate deploy (On your backend folder)