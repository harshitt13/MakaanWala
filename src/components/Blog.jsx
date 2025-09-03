"use client";

import { useState } from "react";

import "./Blog.css";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");





  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers in India 2024",
      excerpt:
        "Navigate the Indian home buying process with confidence using these expert tips and strategies.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // House keys in hand
      category: "buying",
      author: "Priya Sharma",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Indian Real Estate Market Trends: What to Expect This Year",
      excerpt:
        "Comprehensive analysis of current market conditions and predictions for the Indian real estate sector.",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // City skyline
      category: "market",
      author: "Rajesh Kumar",
      date: "2024-01-12",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 3,
      title: "Maximizing Your Property's Value Before Selling",
      excerpt:
        "Simple improvements and staging tips that can significantly increase your home's market value in India.",
      image:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80", // Modern living room
      category: "selling",
      author: "Amit Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "Investment Properties: A Beginner's Guide for Indians",
      excerpt:
        "Everything you need to know about getting started in Indian real estate investment.",
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80", // Investment concept
      category: "investment",
      author: "Neha Singh",
      date: "2024-01-08",
      readTime: "10 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Home Loan Options in India",
      excerpt:
        "Compare different home loan types and find the best financing option for your situation.",
      image:
        "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=400&q=80", // Home loan paperwork
      category: "financing",
      author: "Vikram Gupta",
      date: "2024-01-05",
      readTime: "7 min read",
      featured: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "buying", label: "Buying" },
    { id: "selling", label: "Selling" },
    { id: "investment", label: "Investment" },
    { id: "market", label: "Market Trends" },
    { id: "financing", label: "Financing" },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <span>📝</span>
            Real Estate Insights
          </div>
          <h2>Latest News & Insights</h2>
          <p>Stay informed with the latest trends, tips, and market analysis</p>
        </div>

        <div className="blog-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {selectedCategory === "all" && (
          <div className="featured-posts">
            <h3>Featured Articles</h3>
            <div className="featured-grid">
              {featuredPosts.map((post) => (
                <article key={post.id} className="featured-post">
                  <div className="post-image">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                    />
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-category">
                        {
                          categories.find((cat) => cat.id === post.category)
                            ?.label
                        }
                      </span>
                      <span className="post-date">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        <span>By {post.author}</span>
                        <span className="read-time">{post.readTime}</span>
                      </div>
                      <button className="read-more-btn">Read More</button>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="blog-posts">
          {selectedCategory !== "all" && <h3>Latest Posts</h3>}
          <div className="posts-grid">
            {(selectedCategory === "all" ? regularPosts : filteredPosts).map(
              (post) => (
                <article key={post.id} className="blog-post">
                  <div className="post-image">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                    />
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="post-category">
                        {
                          categories.find((cat) => cat.id === post.category)
                            ?.label
                        }
                      </span>
                      <span className="post-date">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        <span>By {post.author}</span>
                        <span className="read-time">{post.readTime}</span>
                      </div>
                      <button className="read-more-btn">Read More</button>
                    </div>

                  </div>
                </article>
              )
            )}
          </div>
        </div>

        <div className="blog-cta">
          <h3>Want to Stay Updated?</h3>
          <p>
            Subscribe to our newsletter for the latest real estate insights and
            market updates.
          </p>
          <div className="newsletter-signup">
            <input id="newsletter-email" type="email" placeholder="Enter your email address" />
            <button
              className="btn btn-primary"
              onClick={() => {
                const email = document.getElementById('newsletter-email').value;
                if (email) {
                  alert('Thank you for subscribing to our newsletter!');
                } else {
                  alert('Please enter a valid email address.');
                }
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
