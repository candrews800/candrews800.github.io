---
layout: post
---

# Code Complete
by Steve McConnell

[Amazon](https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670)

#### Park I: Laying the Foundation

##### Chapter 1: Welcome to Software Construction

Construction consists of the following distinct activities:

* Problem definition
* Requirements development
* Construction planning
* Software architecture, or high-level design
* Detailed design
* Coding and debugging
* Unit testing
* Integration testing
* Integration
* Systems testing
* Corrective maintenance

With only experience on informal projects, this list seems much to large. It is normally lumped together
when in small, informal projects as "programming." Construction consists of mostly coding and debugging but
also involves all the other listed activities above. For the purpose of this book, we'll be using programming
and construction interchangeably. The book emphasizes the coding and debugging portions of the list, but also touches
some on the other topics with more on some than others.

**Why Is Software Construction Important?**
* Construction is a large, typically 30-80%, part of software development
* Construction is the central activity of software development
* Focusing on construction, an individual programmer's productivity can improve enormously, sometimes a factor of 10-20
* Construction's product, the source code, is the only accurate description of the software
* Construction is the only activity guarenteed to be done



##### Chapter 2: Metaphors for a Richer Understanding of Software Development

Metaphors play a great role in helping to communicate a topic. By presenting a good metaphor, another person can
gain valuable insight into a topic without knowing how it works exactly. For example, when discussing the topic
of software development, several metaphors have been used to describe it: Writing Code, Growing a System, System Acretion,
Building Software. Each of these give a person some idea of the challenges presented during software development. For
instance, writing code infers that there is some sort relation to writing a letter where no formal planning is required
and you write what you want to say as you go. Building software on the other hand gives the impression that some sort of
blue-print will be followed, materials may have been considered, as well as the craftsmanship of the builder will
have an effect on the finished product.

As seen above, metaphors are powerful in their ability to let others understand hard to explain details. They provide
a way for people to gain valuable insight into the process or challenges a problem may have. In the end though, they
only are a guideline and cannot be trusted in truly understanding the problem. Because of this, some metaphors are better
than others.



##### Chapter 3: Measure Twice, Cut Once: Upstream Prerequisites

Key Points:

* The overarching goal of preparing for construction is risk reduction. Be sure your preparation activities are reducing
risks, not increasing them.
* If you want to develop high-quality software, attention to quality must be part of the software development process
from the beginning to the end. Attention to quality at the beginning has a greater influence on product quality than
attention at the end.
* Part of a programmer's job is to educate bosses and coworkers about the software-development process, including the
important of adequate preparation before programming begins.
* The kind of project you're working on significantly affects construction prerequisites - many projects should be
highly iterative, and some should be more sequential.
* If good requirements work hasn't been done, you might have missed important details of the problem. Requirements
changes cost 20 to 100 times as much in stages following construction as they do earlier, so be sure the requirements
are right before you start programming.
* If a good architectural design hasn't been done, you might be solving the right problem the wrong way during
construction. The cost of architecture changes increases as more code is written for the wrong architecture, so be sure
the architecture is right, too.
* Understand what approach has been taken to the construction prerequisites on your project, and choose your
construction approach accordingly.


##### Chapter 4: Key Construction Decisions

Key Points:

* Every programming language has strengths and weaknesses. Be aware of the specific strengths and weaknesses of the
language you're using.
* Establish programming conventions before you begin programming. It's nearly impossible to change code to match them
later.
* More construction practices exist than you can use on any single project. Consciously choose the practices that are
best suited to your project.
* Ask yourself whether the programming practices you're using are a response to the programming language you're using or
controlled by it. Remember to program _into_ the language, rather than _in_ it.
* Your position on the technology wave determines what approaches will be effective - or even possible. Identify where
you are on the technology wave, and adjust your plans and expectations accordingly.



#### Part 2: Creating High-Quality Code

##### Chapter 5: Design in Construction

##### Chapter 6: Working Classes

##### Chapter 7: High-Quality Routines

##### Chapter 8: Defensive Programming

##### Chapter 9: The Pseudocode Programming Process