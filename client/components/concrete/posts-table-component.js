class PostsTableComponent {
  htmlElement;
  tbodyHtmlElement;

  constructor({ posts }) {
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
    this.tbodyHtmlElement = this.htmlElement.querySelector('tbody');
    this.renderPosts(posts);
  }

  createRowHtmlElement = ({ post, id }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${post}</td>
      <td>action</td>
    `;

    return tr;
  }

  renderPosts = (posts) => {
    this.tbodyHtmlElement.innerHTML = null;
    const rowsHtmlElements = posts.map(this.createRowHtmlElement);
    this.tbodyHtmlElement.append(...rowsHtmlElements);
  }

}

export default PostsTableComponent;