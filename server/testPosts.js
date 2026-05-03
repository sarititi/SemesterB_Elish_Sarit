import {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost
} from './models/postsModel.js';

const runTests = async () => {
  try {
    console.log('--- all posts ---');
    console.log(await getAllPosts());

    console.log('--- post by id ---');
    console.log(await getPostById(1));

    console.log('--- posts by user ---');
    console.log(await getPostsByUserId(1));

    console.log('--- create post ---');
    const newPost = await createPost({
      user_id: 1,
      title: 'test post',
      body: 'hello'
    });
    console.log(newPost);

    console.log('--- update post ---');
    console.log(await updatePost(1, {
      title: 'updated',
      body: 'updated body'
    }));

    console.log('--- delete post ---');
    console.log(await deletePost(2));

  } catch (err) {
    console.error(err);
  }
};

runTests();