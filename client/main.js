import ApiService from './api-service.js';
import PostsFormComponent from './components/concrete/posts-form-component.js';
import PostsTableComponent from './components/concrete/posts-table-component.js';

const rootHtmlElement = document.querySelector('#root');

if (rootHtmlElement === null) throw new Error('Error: #root element  was not found in HTML file.');

let postsFormComponent;
let postsTableComponent;



ApiService.getPosts()
.then((posts) => {
  postsTableComponent = new PostsTableComponent({ posts });
  postsFormComponent = new PostsFormComponent();
  
    rootHtmlElement.append(
      postsTableComponent.htmlElement,
      postsFormComponent.htmlElement
    );      
  })
  .catch((err) => {
    console.error(err);
  });