FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/alert-service-0.0.1-SNAPSHOT.jar /app/alert-service-0.0.1-SNAPSHOT.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar" , "app.jar"]