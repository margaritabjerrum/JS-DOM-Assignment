import ApiService from './api-service.js';
import PostsFormComponent from './components/concrete/posts-form-component.js';
import PostsTableComponent from './components/concrete/posts-table-component.js';
import HeaderComponent from './components/concrete/header-component.js';
import ContainerComponent from './components/wrappers/container-component.js';
import GridComponent from './components/wrappers/grid-component.js'

const rootHtmlElement = document.querySelector('#root');

if (rootHtmlElement === null) throw new Error('Error: #root element  was not found in HTML file.');

let postsFormComponent;
let postsTableComponent;

const onDeletePost = async ({ name, post, id }) => {
  try {
    await ApiService.deletePost({ name, post, id });
  } catch (error) {
    alert(error);
  } finally {
    const posts = await ApiService.getPosts();
    postsTableComponent.renderPosts(posts);
  }
}

const onCreatePost = async ({ name, post }) => {
  try {
    await ApiService.createPost({ name, post });
  } catch (error) {
    alert(error);
  } finally {
    const posts = await ApiService.getPosts();
    postsTableComponent.renderPosts(posts);
  }
}

const onUpdatePost = async ({ id, props }) => {
  try {
    await ApiService.updatePost({ id, props });
  } catch (error) {
    alert(error);
  } finally {
    const posts = await ApiService.getPosts();
    postsTableComponent.renderPosts(posts);
  }
}

ApiService.getPosts()
  .then((posts) => {
    postsTableComponent = new PostsTableComponent({ posts, onDeletePost, onUpdatePost });
    postsFormComponent = new PostsFormComponent({ onSubmit: onCreatePost });
    const headerComponent = new HeaderComponent({
      text: 'Simple Message Board',
      className: 'text-center my-4 fw-normal'
    });

    const gridComponent = new GridComponent({
      children: [
        postsFormComponent.htmlElement,
        postsTableComponent.htmlElement,
      ]
    });

    const container = new ContainerComponent({
      children: [
        headerComponent.htmlElement,
        gridComponent.htmlElement,
      ]
    });

    rootHtmlElement.append(container.htmlElement);
  })
  .catch((err) => {
    console.error(err);
  });