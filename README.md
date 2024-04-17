# Web Builder

This project leverages Gatsby for static site generation and React Bricks for intuitive visual content management, providing an ideal solution for building customizable websites with minimal coding. It's designed to empower both developers and non-technical users with drag-and-drop functionalities, making website creation accessible to everyone.

## Features

- **Drag and Drop Editor**: Simplify page creation with a user-friendly interface.
- **Flexible Hosting Options**: Compatible with platforms offering free tiers like GitHub Pages, Netlify, and Cloudflare Pages.
- **Markdown Support**: Manage blog content efficiently using Markdown.
- **Quick Setup**: Get started with your site development in just five minutes.
- **Automatic Updates**: Incorporate the latest features with a single click.


## Prerequisites  
Before you begin, ensure you meet the following requirements:  

- Node.js 20.12.2  
- Yarn 1.22.19  

## Installation  
Steps to install the project:  

> We recommend using Github Codespaces as it automaticlly installs all the dependencies and you can start developing inmeadiatly.
> Just create a repository with this as a template and lauch a Codespace. The repo includes the docker configuration to start developing with only a click.

If you want to install locally:   

```
git clone https://github.com/pablo-lujan/web-builder.git
cd web-builder
yarn install
```

## Configuration  
To configure the project and use Reactbricks you need to create a new account at 

> https://reactbricks.com/sign-up

Create a new app and look for the section API Keys where you want to save AppId and ApiKey.  

The free version only allows for one enviroment, so the PRO and DEV keys are the same if you use the free trial.

If you are using Github Codespaces add four secrets to the Codespace as follows:  
- API_KEY_DEV: ApiKey  
- API_KEY_PRO: ApiKey  
- GATSBY_APP_ID_DEV: AppId  
- GATSBY_APP_ID_PRO: AppId  

If you are running locally create two files: 
.env.development and .env.production.  
Inside each you fill the Api keys  
```
API_KEY=ApiKey
GATSBY_APP_ID=AppId
```

## Usage
Start developing with one command
```
yarn develop
```

Once you finish developing save all your progress to your repo using:
```
./reload_site.sh
```
This script just pulls from your repo, create an automated commit message and pushes it to your repo.

## Instructions for building and deploying:

### For building locally:

```
yarn build
yarn serve
```

### For building using Cloudfare Pages:

The important configuration to be changed is use the following build command:
```
yarn build
```
And add the variables  
API_KEY=ApiKey  
GATSBY_APP_ID=AppId  
YARN_VERSION=1.22.19  

Add a Deploy Hook and configure on the Reactbricks app settings.

## How to Contribute
Reporting Bugs: tbd
Submitting Pull Requests: tbd
Code of Conduct:tbd
Versioning
tbd

## Authors
Pablo Lujan - pablolujan.com
License
tbd

## Acknowledgments

We are really grateful to Reactbricks as it allows to try it amazing editor and have many resources for its use.

## Roadmap
- Sync new features using Github Actions
- Solve the rebuild problem with Api Keys
- Add new CMS and backend support
- Add external storage
- Make a blog landing page
- Automate config 
