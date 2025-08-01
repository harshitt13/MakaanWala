"use client";

import { useState } from "react";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import "./Blog.css";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleShare = (platform, post) => {
    const url = `${window.location.origin}/blog/${post.id}`;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
  };

  const ShareButtons = ({ post }) => (
    <div className="share-buttons">
      <span className="share-label">
        <Share2 size={16} />
        Share:
      </span>
      <button
        className="share-btn share-facebook"
        onClick={() => handleShare("facebook", post)}
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
      </button>
      <button
        className="share-btn share-twitter"
        onClick={() => handleShare("twitter", post)}
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </button>
      <button
        className="share-btn share-linkedin"
        onClick={() => handleShare("linkedin", post)}
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </button>
      <button
        className="share-btn share-copy"
        onClick={() => handleShare("copy", post)}
        aria-label="Copy link"
      >
        <ExternalLink size={16} />
      </button>
    </div>
  );

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers in India 2024",
      excerpt:
        "Navigate the Indian home buying process with confidence using these expert tips and strategies.",
      image: "/placeholder.svg?height=250&width=400&text=Home+Buying+Tips",
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
      image: "/placeholder.svg?height=250&width=400&text=Market+Trends",
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
      image: "/placeholder.svg?height=250&width=400&text=Property+Value",
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
      image: "/placeholder.svg?height=250&width=400&text=Investment+Guide",
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
      image: "/placeholder.svg?height=250&width=400&text=Home+Loans",
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
    { id: "commercial", label: "Commercial" },
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
                    <ShareButtons post={post} />
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
                    <ShareButtons post={post} />
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
            <input type="email" placeholder="Enter your email address" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
