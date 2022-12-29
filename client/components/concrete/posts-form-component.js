class PostsFormComponent {
  htmlElement;

  constructor({ onSubmit }) {
    this.htmlElement = document.createElement('form');
    this.htmlElement.innerHTML = `
      <div class="mb-3">
        <label for="posts" class="form-label">Write Your Post Here:</label>
        <textarea class="form-control" id="posts" name="posts" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Post</button>`

    this.htmlElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const post = formData.get('posts');

      console.log(`i wrote new message: ${post}`);
      onSubmit({ post });
      event.target.reset();
    })

  }

}

export default PostsFormComponent;