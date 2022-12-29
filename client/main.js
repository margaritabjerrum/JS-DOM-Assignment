import PostsFormComponent from './components/concrete/posts-form-component.js';
import PostsTableComponent from './components/concrete/posts-table-component.js';

const rootHtmlElement = document.querySelector('#root');

const postsFormComponent = new PostsFormComponent();

const postsTableComponent = new PostsTableComponent();

rootHtmlElement.append(
  postsFormComponent.htmlElement,
  postsTableComponent.htmlElement
  );