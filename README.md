# susi_skill_cms

[![Build Status](https://travis-ci.org/fossasia/susi_skill_cms.svg?branch=master)](https://travis-ci.org/fossasia/susi_skill_cms)

A web application framework to edit susi skills

## Communication

Please join our mailing list to discuss questions regarding the project: https://groups.google.com/group/susiai/

Our chat channel is on gitter here: https://gitter.im/fossasia/susi_server

## Technology Stack

### Components
* HTML - Structure of the web page generated.
* CSS - Styling options and details ofthe web page.
* Javascript(JSON) - Used to store information for deploying the application such as dependencies.
* ReactJS - Structure for deployment of the web page.

## Requirements
* node --version >= 6
* npm --version >= 3

## How to deploy?

### Running on localhost:
* **Step 1:** Fork [susi_skill_cms](https://github.com/fossasia/susi_skill_cms) repository and clone it to your desktop
* **Step 2:** Then cd into that cloned folder
* **Step 3:** Install all the dependencies by running :```$ npm install```
* **Step 4:** Run on http://localhost:3000 by running :```$ npm run start```
* **Step 5:** Build locally by running : ```$ npm run build ```
* **Step 6:** To deploy at a url use : ```$ npm run deploy ```

### For deploying with [Surge](https://surge.sh/):

Surge will automatically generate deployment link whenever a pull request passes Travis CI. 

* **Step 1:** Install Surge:```$ npm install -g surge```
* **Step 2:** Then cd into that cloned folder of susi_skill_cms .
* **Step 3:** Run the App build:```$ npm run build```
* **Step 4:** Switch into the build directory:```cd build```
* **Step 5:** Run surge:```surge```
* **Step 6:** Follow the prompts and provide an email and a password.
* **Step 7:** Go to URL that appears after the above process and provide this link in PR for testing your Changes. 

### Learn the skill language

Read [SUSI Skill language](./docs/Skill_Tutorial.md) Learn how to add your own AI skills.
