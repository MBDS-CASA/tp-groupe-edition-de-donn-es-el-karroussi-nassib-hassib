# Gestion des Données et Authentification - TP React & Node.js

## 📌 Projet: Système de Gestion des Étudiants, Cours et Notes
### Groupe: Ayman EL KARROUSSI - Omar NASSIB - Safaa HASSIB

---

## 📖 Description
Ce projet est une application web permettant la gestion des entités **étudiants, cours et notes** avec des **opérations CRUD**. Il inclut un **système d'authentification basé sur Firebase**, avec une gestion des rôles pour contrôler l'accès aux fonctionnalités.

🔗 **Lien du repository GitHub:** [TP Groupe](https://github.com/MBDS-CASA/tp-groupe-edition-de-donn-es-el-karroussi-nassib-hassib.git)

## 🛠 Technologies Utilisées
- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, Firebase Firestore
- **Authentification:** Firebase Authentication (Email/Password & Google)

---

## 🏗 Fonctionnalités Implémentées

### **📌 Module 0 - Gestion des Données**
✅ Ajouter / Modifier / Supprimer un **étudiant**
✅ Ajouter / Modifier / Supprimer un **cours**
✅ Ajouter / Modifier / Supprimer une **note**
✅ Synchronisation avec Firebase Firestore

### **📌 Module 1 - Authentification & Gestion des Rôles**
✅ **Authentification via Firebase (Email & Google)**
✅ **Rôles définis:**
   - **ADMIN**: Gestion complète des comptes et données
   - **SCOLARITE**: Gestion des étudiants, cours et notes
   - **STUDENT**: Accès restreint aux notes personnelles et statistiques
✅ **Redirections et restrictions d'accès en fonction du rôle**

### **📌 Module 2 - Statistiques et Dashboards**
✅ **Admin Dashboard**: Vue globale sur toutes les entités (étudiants, cours, notes)
✅ **Scolarité Dashboard**: Vue sur les étudiants, cours et notes
✅ **Student Dashboard**: Vue personnalisée des notes et performances

---

## ⚙️ Installation et Lancement du Projet
### 1️⃣ **Cloner le repository**
```sh
git clone https://github.com/MBDS-CASA/tp-groupe-edition-de-donn-es-el-karroussi-nassib-hassib.git
cd tp-groupe-edition-de-donn-es-el-karroussi-nassib-hassib
```

### 2️⃣ **Installation des dépendances**
```sh
npm install
```

### 3️⃣ **Lancer l'application**
```sh
npm run dev
```
L'application sera disponible sur: `http://localhost:5173/`

---

## 🔐 Gestion des Rôles et Accès
| Rôle       | Accès | Actions |
|------------|-----------------------------------|-------------------------|
| **Admin** | Tous les étudiants, cours, notes | Lecture, Écriture, Suppression |
| **Scolarité** | Étudiants, cours et notes | Ajout, Édition, Suppression |
| **Étudiant** | Seulement ses propres notes | Consultation uniquement |

---

## 📊 Dashboards Statistiques
🎯 **Admin:** Vision globale sur toutes les entités
🎯 **Scolarité:** Vue des étudiants, cours et notes
🎯 **Étudiant:** Visualisation de ses propres performances

