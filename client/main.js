import PostsFormComponent from './components/concrete/posts-form-component.js';

const rootHtmlElement = document.querySelector('#root');

const postsFormComponent = new PostsFormComponent();

rootHtmlElement.append(postsFormComponent.htmlElement);