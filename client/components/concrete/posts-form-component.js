class PostsFormComponent {
  htmlElement;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form');
    this.htmlElement.innerHTML = `
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" class="form-control" id="name">
      </div>
      <div class="mb-3">
        <label for="posts" class="form-label">Your Message:</label>
        <textarea class="form-control" id="posts" name="posts" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Post message</button>`

    this.htmlElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const name = formData.get('name');
      const post = formData.get('posts');

      onSubmit({ name, post });
      event.target.reset();
    })

  }

}

export default PostsFormComponent;