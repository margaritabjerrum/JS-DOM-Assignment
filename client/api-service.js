const SERVER_ADDRESS = 'http://localhost:5000';
const POSTS_COLLECTION_NAME = 'posts';

const formatError = (error) => {
  return error.message;
}



const ApiService = {
  async getPosts() {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${POSTS_COLLECTION_NAME}`);
      const posts = await response.json();

      return posts;
    } catch (error) {
      throw formatError(error);
    }
  },

  async deletePost({ post, id }) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${POSTS_COLLECTION_NAME}/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 404) {
        throw new Error(`Element "${post}" no longer exists.`)
      }
      const deletedItem = await response.json();

      return deletedItem;
    } catch (error) {
      throw formatError(error);
    }
  },

  async createPost(postData) {
    try {
      const response = await fetch(`${SERVER_ADDRESS}/${POSTS_COLLECTION_NAME}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 404) {
        throw new Error(`Failed to Create new Message`)
      }

    } catch (error) {
      throw formatError(error);
    }
  }
};

export default ApiService;