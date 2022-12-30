class PostsTableComponent {
  htmlElement;
  tbodyHtmlElement;

  onDeletePost;
  onUpdatePost;

  cancelationHandlers;

  constructor({ posts, onDeletePost, onUpdatePost }) {
    this.htmlElement = document.createElement('table');
    this.htmlElement.className = 'table table-borderless';
    this.htmlElement.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Message</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>`;
    this.onDeletePost = onDeletePost;
    this.cancelationHandlers = [];
    this.onUpdatePost = onUpdatePost;
    this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
    this.renderPosts(posts);
  }

  enableRowEditAction = ({ tr, editButton, cancelEditing, enableEditing, initialState}) => {
    const cancelationHandler = (event) => {
      event.stopPropagation();
      if (!tr.contains(event.target)) cancelEditing();
    }
    this.cancelationHandlers.push(cancelationHandler);
    document.addEventListener('click', cancelationHandler);

    editButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (initialState.isBeingEdited) cancelEditing();
      else enableEditing();
    });
  }

  enableRowDeleteAction = ({ initialState, id, delButton }) => {
    delButton.addEventListener('click', () => this.onDeletePost({ post: initialState.post, id }));
  }

  enableRowUpdateAction = ({ id, postColumn, udpateButton, initialState, cancelEditing }) => {
    udpateButton.addEventListener('click', () => {
      const props = {
        id,
        post: postColumn.textContent,
      };

      if (initialState.post !== props.post) {
        this.onUpdatePost({ id, props });
      } else {
        cancelEditing();
      }

    });
  }

  enableRowActions = ({ tr, post, id }) => {
    const editButton = tr.querySelector('.btn-warning');
    const postColumn = tr.querySelector('.js-post-col');
    const udpateButton = tr.querySelector('.btn-success');
    const delButton = tr.querySelector('.btn-danger');
    const initialState = { post, isBeingEdited: false };


    const cancelEditing = () => {
      tr.classList.remove('table-secondary');
      editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
      editButton.classList.replace('btn-secondary', 'btn-warning');
      postColumn.setAttribute('contenteditable', 'false');
      udpateButton.classList.add('d-none');
      postColumn.textContent = initialState.post;
      initialState.isBeingEdited = false;
    };

    const enableEditing = () => {
      tr.classList.add('table-secondary');
      editButton.innerHTML = '<i class="bi bi-x-square"></i>';
      editButton.classList.replace('btn-warning', 'btn-secondary');
      postColumn.setAttribute('contenteditable', 'true');
      udpateButton.classList.remove('d-none');
      initialState.isBeingEdited = true;
    };

    const actionProps = {
      id,
      tr,
      initialState,
      postColumn,
      udpateButton,
      editButton,
      delButton,
      cancelEditing,
      enableEditing,
    };

    this.enableRowDeleteAction(actionProps);
    this.enableRowEditAction(actionProps);
    this.enableRowUpdateAction(actionProps);
  }

  createRowHtmlElement = ({ post, id }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td class="js-post-col">${post}</td>
      <td class="d-flex justify-content-end gap-2">
      <button class="btn btn-success btn-sm d-none"><i class="bi bi-check2-square"></i></button>
      <button class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i></button>
      <button class="btn btn-danger btn-sm"><i class="bi bi-trash3"></i></button>
    </td>`;

    this.enableRowActions({ tr, post, id });

    return tr;
  }

  renderPosts = (posts) => {
    this.tbodyHtmlElement.innerHTML = null;
    this.cancelationHandlers.forEach(ch => document.removeEventListener('click', ch));
    this.cancelationHandlers = [];

    const rowsHtmlElements = posts.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  }

}

export default PostsTableComponent;