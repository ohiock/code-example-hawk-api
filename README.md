### Getting started
`npm install`
Install all dependencies

`npm start`
Run the app

`npm test`
Test the app

### Technical decisions
- Stuck with just React as Redux felt unnecessary for the size of this exercise
  - Leveraging Hooks API
- Pulled in Semantic UI to speed up development
- Testing was done with RTL / Jest
- Keeping it dead simple, using BEM in CSS

### Notes
I think the struggle with things like this is deciding when to call it. I could of course keep developing features on
this and fleshing it out more, but I felt it was in a good enough place.

I've never used SemanticUI before but really enjoyed it. I have a lot of experience with Material and found it
refreshing with how simple it is.

#### Could be improved
- Input validation in the editor
- Could have added react router to handle routing to specific hawks
- Styles are pretty generic, leveraging most of what Semantic provides by default
- Could have included loading states and confirmation dialogs to improve the experience
- Table pagination

