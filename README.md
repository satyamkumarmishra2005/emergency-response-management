
---

# 🆘 Emergency Response Management System

## 📌 Overview

The **Emergency Response Management System (ERMS)** is a **microservices-based platform** designed to improve incident reporting and real-time responder allocation during emergencies such as accidents, fires, or medical crises.

The system allows:

* Citizens to report emergencies.
* Automatic allocation of responders (police, ambulance, fire) based on availability and location.
* Notifications to be sent to responders via **email**.
* Secure authentication & role-based access control using **Keycloak**.
* Geolocation tracking & mapping with **Google Maps API (in progress)**.


## ⚙️ Tech Stack

* **Backend**: Spring Boot (Microservices Architecture)
* **Messaging**: Apache Kafka
* **Authentication**: Keycloak (OIDC + RBAC)
* **Database**: PostgreSQL
* **Email Service**: Spring Mail + Gmail SMTP
* **Maps Integration**: Google Maps API (Geolocation & Routing)
* **Containerization (Optional)**: Docker

---

## 🚀 Features

✅ Citizen can report emergencies (Accident, Fire, Medical, etc.)
✅ Alerts are published via Kafka for decoupled communication
✅ Automatic responder assignment based on availability
✅ Real-time **status update** of responders (Available → Assigned → Dispatched)
✅ Email notifications for responders
✅ Secure authentication and authorization via Keycloak
✅ Google Maps integration for **location-aware dispatch** (coming soon)

---

## 🔧 Setup & Installation

### 1️⃣ Prerequisites

* Java 17+
* Maven
* Apache Kafka & Zookeeper
* PostgreSQL
* Keycloak server (local or Docker)

### 2️⃣ Clone Repository

```bash
git clone https://github.com/your-username/emergency-response-system.git
cd emergency-response-system
```

### 3️⃣ Start Kafka & Zookeeper

```bash
bin/zookeeper-server-start.sh config/zookeeper.properties
bin/kafka-server-start.sh config/server.properties
```

### 4️⃣ Configure Keycloak

* Create a Realm: `ems-realm`
* Create Client: `ems-client` (confidential, OIDC)
* Create Roles: `citizen`, `responder`, `admin`
* Add test users & assign roles

### 5️⃣ Run Services

```bash
cd alert-service
mvn spring-boot:run

cd responder-service
mvn spring-boot:run

cd notification-service
mvn spring-boot:run

cd user-service
mvn spring-boot:run
```

---

## 📬 Example Flow

1. Citizen reports an **Accident in India**.
2. **Alert Service** publishes the alert to Kafka.
3. **Responder Service** consumes the alert and assigns a responder.
4. Responder status changes from **Available → Dispatched**.
5. **Notification Service** sends an **email alert** to the assigned responder.
6. Future: Incident is plotted on **Google Maps** with nearest responder.

---

## 🔮 Future Enhancements

* 🌍 Google Maps integration for **real-time location tracking**.
* 📱 Mobile app for responders & citizens.
* 📊 Analytics dashboard for government/emergency services.
* 🚦 Integration with **traffic APIs** to optimize responder routing.
* ☁️ Deployment on AWS/GCP with Kubernetes.

---

## 👨‍💻 Contributors

* **\[Satyam Kumar Mishra]** – Backend & Microservices
* Contributions welcome! 🎉


