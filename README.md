# Web Builder  

Here you can find the code for a website that you can edit directly from any web browser with a visual drag and drop editor.  

We use Gatsby for the generation of the static web site and Reactbricks as a visual CMS with drag and drop functionalities that makes building a new website with little technical configuration and allows non-technical users to easily create pages without the need of messing with the code underneat.  

## Features  
- Drag and drop editor for pages. 
- Host it whenever you want, we recommend services with a free tier like Github Pages, Netfily or Clodufare Pages.  
- Create blogs entries as Markdown files.  
- Clone it, launch it and start developing your site in five minutes
- Get new features with one click

## Prerequisites  
Before you begin, ensure you meet the following requirements:  

- Node.js 20.12.2  
- Yarn 1.22.19  

## Installation  
Steps to install the project:  

> We recommend using Github Codespaces as it automaticlly installs all the dependencies and you can start developing inmeadiatly.

If you want to install locally:   

```
git clone https://github.com/pablo-lujan/web-builder.git
cd web-builder
yarn install
```

## Configuration  
To configure the project and use Reactbricks you need to create a new account, create a new app and look for the section API Keys where you want to save AppId and ApiKey.  

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
