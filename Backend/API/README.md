Build docker: sudo docker build -t api .

Run docker: sudo docker run -it --rm -p 8080:80 --name api api

In project: dotnet add package Pomelo.EntityFrameworkCore.MySql