![SPH Logo](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/f7a29032-cab5-4c51-be21-262ffa04d408)

## Introduction

Service-Pneumatique-Hydraulique is an e-commerce website designed to showcase the company's identity and values, display their product offerings and categories, facilitate online product orders with order status tracking for users, and provide comprehensive inventory management tools for the owner. The platform empowers the owner to monitor product inventory, track pending orders and payments, generate invoices and estimates, and manage products and categories. Additionally, the website offers multilingual support in English, French, and Arabic, and provides a customizable day and night mode for an enhanced user experience.

## Tools

The project's front-end was crafted using a tech stack that incorporates React 18 and Material Tailwind. This combination of technologies delivers a dynamic and visually enticing user interface

Conversely, the project's back-end was constructed with Spring Boot, and MongoDB was chosen as the database technology.

## Setting up the Front-end

1. Start first by installing Node JS [`Node Download Link`](https://nodejs.org/en/download/current)
   And then download or clone the git repo, after doing so simply install the dependencies.
```bash
npm install
```
Once you've installed the necessary dependencies, proceed by creating a .env file and including the following information:
```bash
REACT_APP_API_URL=http://localhost:8080
REACT_APP_URL=http://localhost:3000
REACT_APP_REDUX_LOCALSTORAGE_SECRETKEY=yourReduxEncryptionKey

```

Once you've added the .env file and configured it according to your requirements, simply initiate or build the project.

for Development:

```bash
npm start
```

for Production

```bash
npm run build
```

## Setting up the Back-end

To get started with the project, follow these steps:

1. **Download IntelliJ IDEA**: First, download and install IntelliJ IDEA by following [this link](https://www.jetbrains.com/idea/download/?section=windows).

2. **Open the Project in IntelliJ IDEA**:
   - Navigate to the 'Server' folder in your project directory.
   - Open the 'SPH' folder within the 'Server' folder as a project using IntelliJ IDEA.

3. **Configure the Project SDK**:
   - In IntelliJ IDEA, access the 'Project Settings.'
   - Set up the Project SDK by choosing OpenJDK 20. You can download OpenJDK 20 [here](https://jdk.java.net/java-se-ri/20).
   
4. **Enable Lombok Annotations**:
   - Ensure that Lombok annotations are enabled for your project. You may need to install the Lombok plugin if it's not already available in IntelliJ IDEA.

5. **Install Project Dependencies**:
   - Go to the 'Maven' tab located on the right-hand side in IntelliJ IDEA.
   - Click on 'Reload All Maven Projects' to install all the project dependencies.

6. **Application.properties**:
   - Now go to Resources/application.properties and copy the following configuration format and updated with your personal configuration
   ```bash

      spring.data.mongodb.host=localhost
      spring.data.mongodb.port=27017
      spring.data.mongodb.database=SPH
      spring.data.mongodb.auto-index-creation=true
      
      spring.jwt.accessShortTokenExpirationInHour=10000
      spring.jwt.accessLongTokenExpirationInHour=24
      spring.jwt.accessTokenSecretKey="YourAccessTokenEncryptionKey"
      
      
      spring.admin.defaultAdminUserName=SPH_SYSTEM
      spring.admin.defaultAdminFirstName=SPH
      spring.admin.defaultAdminLastName=SYSTEM
      spring.admin.defaultAdminEmail="sph@sph-tn.com"
      spring.admin.defaultAdminInternationalDialNumber=216
      spring.admin.defaultPhoneNumber=74211876
      spring.admin.defaultAdminPassword="Sph123456789"
      
      logging.level.org.springframework.data.mongodb.core.MongoTemplate=DEBUG

   ```
     
You're now ready to work on your project in IntelliJ IDEA with the necessary setup.

## Pictures

<details>
<summary>Authentification</summary>
   
   
![Screenshot 2023-11-06 210630](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/03a212c3-5f01-432b-ba8f-3ca9ce1e561d)
   
![Screenshot 2023-11-06 210649](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e17b4e35-ad7b-456f-a4df-2e685d9a796a)

</details>

<details>
<summary>Presentation</summary>
   
![Screenshot 2023-11-06 210423](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/0de1c0b1-6041-410e-8ae6-358ce8cdf069)
   
![Screenshot 2023-11-06 210536](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e3963a54-f800-437c-9d89-41493e1d0b17)
   
![Screenshot 2023-11-06 210553](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/125cdc66-1624-4a87-a8bd-6903d9750c48)

![Screenshot 2023-11-06 210611](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/a122b733-2f82-41e6-928a-32f76bc92a03)

</details>

<details>
<summary>Products</summary>
   
![Screenshot 2023-11-06 210715](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/ad8e3122-3a5f-4ecc-b32f-bca768a1b671)
   
![Screenshot 2023-11-06 211810](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/94874b8a-380e-44be-8b63-6665c4dc9925)
   

</details>

<details>
<summary>Control Center</summary>
   
![Screenshot 2023-11-06 210751](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/7735aa68-b4ed-4b23-84de-fd6177aa6487)
   
![Screenshot 2023-11-06 210813](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/22cb0d6f-9746-48b8-b0d7-78508e99b3a2)
   
![Screenshot 2023-11-06 210905](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/92983891-b50e-4004-a39f-32af33894285)
   
![Screenshot 2023-11-06 210931](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/df9853df-eacb-46da-b1c4-13f2aaf2aec9)
   
![Screenshot 2023-11-06 211004](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/a1664f1c-d42c-4022-b440-31e20d4b41ea)
   
![Screenshot 2023-11-06 211204](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/faa50977-a3fa-43a6-9fa7-5f7a18964b82)

![Screenshot 2023-11-06 211220](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/d0be11dd-087b-4477-b19e-7c78d984c5a8)
![Screenshot 2023-11-06 211239](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/abadacca-5440-4712-a3fa-aae2c11b63e9)

![Screenshot 2023-11-06 211351](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/e9fcdfbb-7f40-442e-80a3-22d5aad74f23)

![Screenshot 2023-11-06 211515](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/b356904b-0b2f-47c7-88fc-2af49f5a6673)


</details>



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
