## Folder Structure

After creation and a successfull build, your project should have the following file structure:

```
   |-build
   |---static
   |-----css
   |-----js
   |-public
   |-src
   |---Utils
   |---images
   |---__tests__
   |-----components
   |-------Admin
   |-------Auth
   |---------ForgotPassword
   |---------Login
   |---------SignUp
   |-------AuthorSkills
   |-------CircleImage
   |-------CreateSkill
   |-------NotFound
   |-------Settings
   |-------SkillEditor
   |-------SkillHistory
   |-------SkillRollBack
   |-------SkillVersion
   |-------StaticAppBar
   |---components
   |-----Admin
   |-------ListUser
   |-----Auth
   |-------ForgotPassword
   |-------Login
   |-------SignUp
   |-----AuthorSkills
   |-----BrowseSkill
   |-----CircleImage
   |-----CreateSkill
   |-----NotFound
   |-----Settings
   |-----SkillEditor
   |-----SkillHistory
   |-----SkillPage
   |-----SkillRollBack
   |-----SkillVersion
   |-----StaticAppBar
```

* `public/index.html` is the page template.
* `src/index.js` is the JavaScript entry point.
* `src/__tests__/` new tests related to all the components can be created in this folder, this project follows a `jest` testing suite.
* `src/components/` any new component can be added in this folder, given that the file is reused or should be unique in some way. All static files are present in this component as well.
* `src/components/Admin/` has all the components which are only for the Admin use. 
* `src/components/Admin/ListUser` this returns the list of all the users on SUSI.AI with their user roles. 
* `src/components/Auth/` contains all the components for user authentication. 
* `src/components/Auth/ForgotPassword` contains all the components for user authentication, when the user forgets the password. 
* `src/components/Auth/Login` contains component for login. 
* `src/components/Auth/SignUp` contains component for signup. 
* `src/components/AuthorSkills` contains component for listing SUSI.AI skills by an author. 
* `src/components/BrowseSkill` contains component for browsing SUSI.AI Skills. 
* `src/components/CircleImage` contains component for rendering circular images. 
* `src/components/CreateSkill` contains component for creating a new SUSI.AI Skill. 
* `src/components/NotFound` loads when the route is not found. 
* `src/components/Settings` contains component for settings of the application. 
* `src/components/SkillEditor` contains component for modifying SUSI.AI Skills. 
* `src/components/SkillHistory` contains component to get SUSI.AI Skills History. 
* `src/components/SkillPage` contains component to load skill information when user clicks on a SUSI.AI skill on homepage. 
* `src/components/SkillRollBack` contains component to rollback a SUSI.AI Skill to a particular commit. 
* `src/components/SkillVersion` contains component to get imformation about SUSI.AI skill versions. 
* `src/components/StaticAppBar` contains the static app bar. 
* `src/images/` contains all the static images being used in the App.
* `src/utils/` contains all utilities are files which help us in communicating effeciently between the stores and the actions.
* `src/App.test.js/` is the entry point for all tests in the `__tests__` folder.
* `.eslintrc` is the config file for the ESLint testing.
* `deploy.sh` handles the continuous Travis Deployment of the project on `gh-pages`.
* `.travis.yml` is the config file for Travis CI.
