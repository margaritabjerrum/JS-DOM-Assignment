class PostsFormComponent {
  htmlElement;

  constructor() {
    this.htmlElement = document.createElement('form');
    this.htmlElement.innerHTML = `
      <div class="mb-3">
        <label for="posts" class="form-label">Write Your Post Here:</label>
        <textarea class="form-control" id="posts" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Post</button>`
  }
}

export default PostsFormComponent;