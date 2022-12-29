import ApiService from './api-service.js';
import PostsFormComponent from './components/concrete/posts-form-component.js';
import PostsTableComponent from './components/concrete/posts-table-component.js';
import HeaderComponent from './components/concrete/header-component.js';
import ContainerComponent from './components/wrappers/container-component.js';
import FlexComponent from './components/wrappers/flex-component.js'

const rootHtmlElement = document.querySelector('#root');

if (rootHtmlElement === null) throw new Error('Error: #root element  was not found in HTML file.');

let postsFormComponent;
let postsTableComponent;

const onDeletePost = async ({ post, id }) => {
  try {
    await ApiService.deletePost({ post, id });
  } catch (error) {
    alert(error);
  } finally {
    const todos = await ApiService.getPosts();
    postsTableComponent.renderPosts(todos);
  }
}

ApiService.getPosts()
.then((posts) => {
  postsTableComponent = new PostsTableComponent({ posts, onDeletePost });
  postsFormComponent = new PostsFormComponent();
  const headerComponent = new HeaderComponent({
    text: 'Simple Message Board',
    className: 'text-center my-4 fw-normal'
  });

  const flexComponent = new FlexComponent({
    children: [
      postsFormComponent.htmlElement,
      postsTableComponent.htmlElement,
    ]
  })

  const container = new ContainerComponent({
    children: [
      headerComponent.htmlElement,
      flexComponent.htmlElement,
    ]
  })
  
    rootHtmlElement.append(container.htmlElement);      
  })
  .catch((err) => {
    console.error(err);
  });