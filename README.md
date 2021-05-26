<h1 align="center"> Vital Backend </h1>

<p align="center">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/NahtanN/vital-backend">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/NahtanN/vital-backend">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/NahtanN/vital-backend">
    <a href="https://github.com/NahtanN/vital-backend/commits/master">
        <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/NahtanN/vital-backend">
    </a>
    <img src="https://img.shields.io/badge/contribuition-welcome-brightgreen.svg" alt="PRs Welcome">
    <img alt="GitHub" src="https://img.shields.io/github/license/NahtanN/vital-backend">
</p>

<br />

<h4 align="center">
    🚧 In construction 🚧 
</h4>

<br />

<h2> ✅ Table of contents </h2>

<!--ts-->
* [Vital Backend](#vital-backend)
* [Table of contents](#table-of-contents)
* [Technologies](#technologies)
* [How to Use](#how-to-use)
    * [Clone and Install](#clone-and-install)
    * [Define database and AWS settings](#define-database-and-AWS-settings)
    * [Clone and Install](#start-the-server)
* [Helpful](#helpful)
* [Author](#author)
* [License](#license)
<!--te-->

<br />

<h2> 🛠 Technologies</h2> 
<p>This project was developed with the following technologies:</p>

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://www.npmjs.com/package/express)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Amazon AWS](https://aws.amazon.com/)
- [Yup](https://www.npmjs.com/package/yup)

<br />

<h2><strong>❗How to Use</strong></h2>

<h3>Clone and Install</h3>

<p>From your command line:</p>

```bash
# Clone this repository
$ git clone https://github.com/NahtanN/vital-backend 

# Go to the repository
$ cd vital-backend

# Install all dependencies
$ yarn install
```

<h3>Define database and AWS settings</h3>

<p>Before starting the server you will need to define some environment variables. Rename the file <code>.env.example</code> to <code>.env</code> and replace then:</p>

```bash
# This variable will enable to save the images in the AWS
# EX: 3000
PORT = 

# AWS S3 settings
AWS_ACCESS_KEY_ID = 
AWS_SECRET_ACCESS_KEY = 
AWS_BUCKET_NAME = 
AWS_DEFAULT_REGION = 

# Defines the database connection
# Ex: 
# postgres://userName:password@host:port/defaultDatabase
# mongodb+srv://user:password@cluster.xjf5z.mongodb.net/database
DATABASE_URL = 
```

<p>If you want to save the images in the localhost instead of AWS, remove the <code>PORT</code> variable and add the following environment variable:</p>

```bash
# Used in development
# Defines the image URL when in local storage
# Ex: http://localhost:3000
APP_URL = 
```

<p>For more details of how to configure the AWS, read the documentation <a href="https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html">link</a></p>

<h3>Start the server</h3>

```bash
$ yarn dev
```

<br/>

<h2> ⚙️ Helpful</h2>
<p>If you are using <a href="https://insomnia.rest/download">Insomnia</a> to manage the routes, you can import the data from <code>Insomnia.json</code> at <code>public</code> folder for faster access.</p>

<br/>

<h2>Author</h2>

<a href="https://github.com/NahtanN">
    <img style="border-radius: 30%" src="https://avatars.githubusercontent.com/u/59841763?v=4" width="100px"/>
    <br />
    <sub style="margin-left: 10px"><b>Nathan Gomes</b></sub>
</a>

<h2>License</h2>

<p>This project could be used by anyone! MIT License.</p>
