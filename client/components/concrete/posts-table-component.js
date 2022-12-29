class PostsTableComponent {
  htmlElement;

  constructor() {
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
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
      </tbody>
    `
  }
}

export default PostsTableComponent;