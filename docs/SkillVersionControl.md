# Skill Version Control in SUSI Skill CMS

With SUSI Skill CMS, users can browse through all the previous revisions of a skill and roll back to a selected version. Users can modify existing skills and push the changes. So a skill could have been edited many times by the same or different users and so have many revisions. The version control functionalities help users to:

  - Browse through all the revisions of a selected skill
  - View the content of a selected revision
  - Compare any two selected revisions highlighting the changes
  - Option to edit and rollback to a selected revision.

### Usage

1.  Select a skill
2.  Click on versions button
3.  A table populated with previous revisions is displayed
4.  Clicking on a single revision opens the content of that version
5.  Selecting 2 versions and clicking on compare selected versions loads the content of the 2 selected revisions and shows the differences between the two.
6.  Clicking on **Undo** loads the selected revision and the latest version of that skill, highlighting the differences and also an editor loaded with the code of the selected revision to make changes and save to roll back.

### Components

  - Listing Versions - [Skill Version Component](https://github.com/fossasia/susi_skill_cms/tree/master/src/components/BrowseSkill)
  - Compare Two Versions - [Skill History Component](https://github.com/fossasia/susi_skill_cms/tree/master/src/components/SkillHistory)
  - Roll Back To a Previous Version - [Skill Rollback Component](https://github.com/fossasia/susi_skill_cms/tree/master/src/components/SkillRollBack) which also makes use of [Modify Skill Component](https://github.com/fossasia/susi_skill_cms/tree/master/src/components/SkillEditor)

### API Calls Needed

  - Get the revision hitory of a skill
  ```  https://api.susi.ai/cms/getSkillHistory.json?model=MODEL&group=GROUP&language=LANGUAGE&skill=SKILL_NAME
  ```

  - Get the content for a given commit
  ```  https://api.susi.ai/cms/getSkillHistory.json?model=MODEL&group=GROUP&language=LANGUAGE&skill=SKILL_NAME&commitID=COMMIT_ID
  ```

  - Edit content and push changes (via **POST** request)
  ```  https://api.susi.ai/cms/modifySkill.json
  ```
