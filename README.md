![SPH Logo](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/ad25defe-a219-4912-91e2-d40ef71de7b9)


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
   
![Screenshot 2023-11-16 211709](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/6df5a616-ddd5-413c-b488-0c54af4486c3)

![Screenshot 2023-11-16 211722](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/49dd0228-f663-4755-9e71-22b7e7fedded)



</details>

<details>
<summary>Presentation</summary>
   
![Screenshot 2023-11-16 211534](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/b92a36e1-3fce-47d7-97b3-c024e26473b6)

![Screenshot 2023-11-16 211600](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/b739a59c-c9fe-4c48-b885-b99fa62e6d7c)

![Screenshot 2023-11-16 211631](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/03733b1e-6d82-4bea-9cea-d9495ac4db63)

![Screenshot 2023-11-16 211652](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/d83fcb98-104c-43a4-a49f-a2d2b2ee6d90)


</details>

<details>
<summary>Products</summary>
   
![Screenshot 2023-11-16 211815](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/8f92fe50-b9a0-429b-94d1-9c6932f32f01)

![Screenshot 2023-11-16 211838](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/dd2ec5d2-b330-4da6-a474-3f06f77a1a97)

![Screenshot 2023-11-16 211901](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/d5d8d8e5-c227-4662-839f-babff726eac0)

![Screenshot 2023-11-16 211936](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/ece6f8f5-35f7-4a1b-bc9f-deaa15c54a23)

</details>

<details>
<summary>Control Center</summary>
   
![Screenshot 2023-11-16 212110](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/11b7a14a-c736-4459-a699-03093aeb549b)

![Screenshot 2023-11-16 212129](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/3b4021a3-15d7-4427-b187-383eee122ff4)

![Screenshot 2023-11-16 212155](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/24bd9d49-1e1f-4830-a6a7-4d84740d9912)

![Screenshot 2023-11-16 212230](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/36ac40d5-ee00-44f8-9087-c75fae7cab3e)

![Screenshot 2023-11-16 212253](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/a94f1388-d4e6-4f8b-8479-54eee0839379)

![Screenshot 2023-11-16 212315](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/29a957f5-bd5c-4397-bbb1-775a4d0e57fe)

![Screenshot 2023-11-16 212340](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/6c8c16a7-fdb8-42a2-a02a-fb5ed3307a43)

![Screenshot 2023-11-16 212354](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/929ac248-5c48-4ea6-b79a-0082788a4f00)

![Screenshot 2023-11-16 212452](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/6bd10102-b5db-40b8-a908-7902dce6ea49)

![Screenshot 2023-11-16 212518](https://github.com/DALI-1/Service-Pneumatique-Hydraulique/assets/99611104/0db1e4c7-509f-4cc5-ac89-f67b042e9cf1)


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
