# WEEKEND CHALLENGE: 3

## To Do Application

### Technologies

- JavaScript, jQuery, npm, Express.js, Ajax, JSON, PostgreSQL

## Instructions

### Base Mode

- Create a front-end experience (e.g. a form) that allows a user to create a Task
- When the task is created, it should:

  - Be stored inside of a database
  - Refresh the the front-end to show all tasks to be completed

- Each task should have an option to "complete"; when complete:

  - Its visual representation should change on the front-end
  - It should be stored in the db as completed

- Each task should have an option to "delete"; when deleted:

  - The task should be removed from the front-end and the db

Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete

#### Styling

Make sure that you also show us your best styling chops.

#### Approach

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

#### Database Structure

Please include a database.sql text file in your repo that includes all of your CREATE TABLE queries. This is so we can re-create your database while testing your app.

### HARD MODE

Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.

### PRO MODE

In whatever fashion you would like, create an "are you sure: yes / no" option when deleting a task. Once again, you can interrupt this however you would like.
