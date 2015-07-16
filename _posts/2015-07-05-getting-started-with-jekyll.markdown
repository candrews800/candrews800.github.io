---
layout: post
title:  "Building a User Registration & Auth System with NodeJS, Express, and PostgreSQL."
date:   2015-07-13 19:49:57
categories: node, express, postgresql
excerpt: Let's learn how to build a user registration and auth system using Node, Express and PostgreSQL.
---

* Part 1: Database Structuring, Simple Routes, User Registration
* Part 2: Logging In, Password Recovery, Working With Users


#### Overview and Requirements
In this series we will be looking at how to build an entire user registration and authentication system using Node, 
Express and PostgreSQL.

Users will register using an email and password. After registering, they'll be required to confirm their account 
before they will be able to login. In addition to registering, users will be able to reset their password by requesting 
a password reset, that will send an email to them with a link to change their password.

#### Installation
For this project, you will need to have NodeJS, Express, and PostgreSQL installed. You can find more information about
each of these below. If you need help with installing, please leave a comment.

* [NodeJS](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [PostgreSQL](http://www.postgresql.org/download/)

#### Hello World.
Once you've got the above installed, let's get started with our project. First we'll create a simple server to print out
Hello World on our default route '/'.



Description

Getting Started
    
    DB - Migrate Install
    
    DB Setup
        Create Users Table
            id
            email
            password
            confirmed
            confirmation_code
            
    Basic Page Structure
    
    Signing Users Up
    
    Validation
    
    Creating User
    
    Sending Confirmation Email
    
    Confirming Users
    
    Logging In
    
    