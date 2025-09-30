const token = localStorage.getItem('token');

// Redirect to login if no token
if (!token) {
  alert('You must log in first!');
  window.location.href = 'login.html';
}

// Fetch posts
async function getPosts() {
  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const posts = await res.json();
    console.log("Posts response:", posts); // Debug log

    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';

    // Ensure we always loop over an array
    if (Array.isArray(posts)) {
      posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>
            By ${post.author?.name || 'Unknown'} (${post.author?.role || ''})
            • ${new Date(post.date).toLocaleString()} 
            • ${post.type}
          </small>
        `;
        postsDiv.appendChild(div);
      });
    } else {
      postsDiv.innerHTML = `<p>No posts found.</p>`;
    }

  } catch (err) {
    console.error('Error fetching posts:', err);
  }
}

// Submit new post
document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const type = document.getElementById('type').value;

  try {
    const res = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, type })
    });

    if (res.ok) {
      document.getElementById('postForm').reset();
      getPosts(); // refresh posts after adding
    } else {
      const data = await res.json();
      alert(data.msg || 'Error creating post');
    }
  } catch (err) {
    console.error('Error creating post:', err);
  }
});

// Load posts initially
getPosts();
