class PostsTableComponent {
  htmlElement;
  tbodyHtmlElement;

  onDeleonDeletePostteTodo;

  constructor({ posts, onDeletePost }) {
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
    this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
    this.renderPosts(posts);
  }

  createRowHtmlElement = ({ post, id }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${post}</td>
      <td class="d-flex justify-content-end gap-2">
      <button class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i></i></button>
      <button class="btn btn-danger btn-sm"><i class="bi bi-trash3"></i></button>
    </td>`;

    const delButton = tr.querySelector('.btn-danger');
    delButton.addEventListener('click', () => this.onDeletePost({ post, id }));

    const updateButton = tr.querySelector('.btn-warning');
    updateButton.addEventListener('click', () => {
      console.log({id});
    });

    return tr;
  }

  renderPosts = (posts) => {
    this.tbodyHtmlElement.innerHTML = null;
    const rowsHtmlElements = posts.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  }

}

export default PostsTableComponent;