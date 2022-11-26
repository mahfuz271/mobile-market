import React from 'react';
import useDocumentTitle from '../../Layout/useDocumentTitle';

const Blog = () => {
    useDocumentTitle("Blog");
    return (
        <div className='container mt-5'>
            <h1 className='text-center my-3 mb-5'>Blog</h1>
            <h2>
                What are the different ways to manage a state in a React application?
            </h2>
            <p>
                The Four Kinds of React State to Manage<br />
                Local state. Global state. Server state. URL state.
            </p>
            <h2>
                How does prototypical inheritance work?
            </h2>
            <p>
                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
            </p>
            <h2>
                What is a unit test? Why should we write unit tests?
            </h2>
            <p>
                The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
            </p>
            <h2>
                React vs. Angular vs. Vue?
            </h2>
            <p>
                Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
            </p>
        </div>
    );
};

export default Blog;