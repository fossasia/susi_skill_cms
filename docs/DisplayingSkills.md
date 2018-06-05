# Displaying SUSI Skills in SUSI Skill CMS

 With SUSI Skill CMS, one can easily browse SUSI Skills. The following SUSI Server endpoint is used to the display skills in a category.

  >- [https://api.susi.ai/cms/getSkillList.json](https://api.susi.ai/cms/getSkillList.json)

This endpoint accepts `POST` request with data supplied in the following parameters.

   >- model:general (default)
   >- group:All (default)
   >- language:en (default)

The [Skill Browser Component](https://github.com/fossasia/susi_skill_cms/tree/master/src/components/BrowseSkill) we send request to the a forementioned endpoint to display all the skills in a category and language.

To Browse skills,
- Go to [http://skills.susi.ai](http://skills.susi.ai)
- Choose a Category
- Choose a Language 
- Click on Search
- Click on any Skill to check it in more detail 

