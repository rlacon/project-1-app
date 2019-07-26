# project-1

A app for those who wish to write their own stories, with a little guidance. This site provides the necessary tools from genre frameworks to its own thesaurus and dictionary search bars to help you on your way to becoming a NYTimes bestseller. You can can even track your own productivity with a words per day counter.

1. Who is your target audience?
* High-school to college-aged students, ages 16-30.

2. What is the problem that the product will address?
* Beginner writers who struggle with writer's block.   

3. What is the primary goal of the product?
* To provide story outlines as a starting point to educate beginner writers on literary elements and assist with idea generation.

4. Identify and prioritize essential user stories (limit this to 3 or fewer)?

* As a user, I want to get ideas for a story to write about with a theme of my choosing.
    1. Click "New Story" and select one of the genres.
    2. Move to the writing screen to see the results in your outline.
    3. Edit the text inside those boxes.
    
* As a user, I want to track the level of effort I put into my writing through the word count.
    1. Type words on the document to track the total word count.
    2. Display the word count in the table and store this data upon clicking Save.
    3. The total word count will correspond to the day of the week using moment.js logic.
    
* As a user, I want to save a draft of my story and keep writing later.
    1. Upon clicking a genre button, a new story is created and populates to the dashboard.
    2. Clicking the save button will store the data in the user's local storage, and the story can be accessed again by clicking it on the dashboard. 

* MORE INFO:

Write Haven is a group project I worked on with three other classmates in my coding boot camp. This writing application will help beginner writers overcome the hurdles of writer's block. The app does this by providing outline options to assist with idea generation and educate them on core literary elements. 

The user can save the progress of their story by clicking save, which will store the text snippets on Firebase so they can return to the story later. Clicking the save button also extracts the number of words the user has typed in that session and using Moment.js logic, stores the total word count in the Writing Stats table on the dashboard. It uses two APIs to benefit the writing experience— Quotable and Thesaurus. The quote API provides a new inspirational quote every time the reader clicks refresh, and the thesaurus provides synonyms for a word that gets entered in the text box.