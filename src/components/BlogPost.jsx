import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, BookmarkPlus } from "lucide-react";
import "./BlogPost.css";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Blog posts data (this would typically come from an API or context)
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers in India 2024",
      excerpt: "Navigate the Indian home buying process with confidence using these expert tips and strategies.",
      content: `
        <p>Buying your first home in India can be an overwhelming experience, but with the right knowledge and preparation, it can be one of the most rewarding investments you'll ever make. Here are 10 essential tips to help you navigate the process successfully.</p>
        
        <h3>1. Assess Your Financial Readiness</h3>
        <p>Before you start house hunting, it's crucial to understand your financial position. Calculate your monthly income, existing debts, and expenses to determine how much you can afford for a home loan EMI. Financial experts recommend that your EMI should not exceed 40% of your monthly income.</p>
        
        <h3>2. Get Pre-approved for a Home Loan</h3>
        <p>Getting pre-approved for a home loan gives you a clear picture of your budget and makes you a serious buyer in the eyes of sellers. Shop around different banks and financial institutions to get the best interest rates and terms.</p>
        
        <h3>3. Research the Location Thoroughly</h3>
        <p>Location is one of the most important factors in real estate. Research the neighborhood's connectivity, proximity to schools, hospitals, shopping centers, and future development plans. Consider factors like traffic patterns, safety, and resale value.</p>
        
        <h3>4. Understand Legal Documentation</h3>
        <p>Ensure all legal documents are in order. This includes clear title deeds, approved building plans, NOCs from relevant authorities, and completion certificates. Always hire a qualified lawyer to verify all documents.</p>
        
        <h3>5. Check for Hidden Costs</h3>
        <p>Beyond the property price, budget for registration fees, stamp duty, legal fees, brokerage, moving costs, and potential renovation expenses. These can add up to 8-10% of the property value.</p>
        
        <h3>6. Inspect the Property Thoroughly</h3>
        <p>Conduct multiple visits to the property at different times of the day. Check for structural issues, water damage, electrical problems, and pest infestations. Consider hiring a professional inspector for a detailed assessment.</p>
        
        <h3>7. Negotiate Wisely</h3>
        <p>Research comparable property prices in the area before making an offer. Don't be afraid to negotiate, but be reasonable. Consider factors beyond price, such as possession timeline and included fixtures.</p>
        
        <h3>8. Plan for the Future</h3>
        <p>Think about your long-term needs. Will the property accommodate a growing family? Is there potential for appreciation? Consider factors that might affect resale value.</p>
        
        <h3>9. Get Professional Help</h3>
        <p>Work with reputable real estate agents, lawyers, and financial advisors. Their expertise can save you time, money, and help you avoid costly mistakes.</p>
        
        <h3>10. Stay Patient and Flexible</h3>
        <p>Finding the perfect home takes time. Don't rush into decisions due to pressure from sellers or agents. Be prepared to walk away if something doesn't feel right.</p>
        
        <h3>Conclusion</h3>
        <p>Buying your first home is a significant milestone, but it doesn't have to be stressful. By following these tips and doing your due diligence, you'll be well-prepared to make an informed decision that you'll be happy with for years to come.</p>
      `,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      category: "buying",
      author: "Skyler White",
      date: "2024-01-15",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Indian Real Estate Market Trends: What to Expect This Year",
      excerpt: "Comprehensive analysis of current market conditions and predictions for the Indian real estate sector.",
      content: `
        <p>The Indian real estate market is experiencing significant transformations as we progress through 2024. Understanding these trends is crucial for both buyers and investors looking to make informed decisions.</p>
        
        <h3>Current Market Overview</h3>
        <p>The Indian real estate sector has shown remarkable resilience and growth in recent years. With the government's focus on infrastructure development and housing for all, the market is witnessing unprecedented opportunities.</p>
        
        <h3>Key Trends Shaping the Market</h3>
        
        <h4>1. Rise of Affordable Housing</h4>
        <p>Government initiatives like PMAY (Pradhan Mantri Awas Yojana) continue to drive demand for affordable housing. This segment is expected to see maximum growth in 2024.</p>
        
        <h4>2. Technology Integration</h4>
        <p>PropTech is revolutionizing how properties are bought, sold, and managed. Virtual tours, AI-powered recommendations, and digital documentation are becoming standard.</p>
        
        <h4>3. Sustainable Development</h4>
        <p>Green buildings and sustainable construction practices are gaining momentum. Buyers are increasingly conscious of environmental impact and energy efficiency.</p>
        
        <h4>4. Tier 2 and Tier 3 Cities Growth</h4>
        <p>Smaller cities are witnessing rapid development and investment, offering better value propositions compared to metro cities.</p>
        
        <h3>Regional Market Analysis</h3>
        
        <h4>Mumbai Metropolitan Region</h4>
        <p>Despite high prices, Mumbai continues to attract premium investments. New infrastructure projects are opening up previously inaccessible areas.</p>
        
        <h4>Delhi NCR</h4>
        <p>The region is seeing steady growth with improved connectivity through metro expansion and expressway development.</p>
        
        <h4>Bangalore</h4>
        <p>The IT capital continues to drive residential demand, with co-living and co-working spaces gaining popularity.</p>
        
        <h4>Pune</h4>
        <p>Emerging as a preferred destination for young professionals, offering a good balance of career opportunities and quality of life.</p>
        
        <h3>Investment Opportunities</h3>
        <p>For investors, 2024 presents multiple opportunities across different segments. Commercial real estate, particularly warehousing and data centers, is showing strong growth potential.</p>
        
        <h3>Challenges to Watch</h3>
        <p>While the outlook is positive, challenges include inflation in construction costs, regulatory changes, and the need for better urban planning in growing cities.</p>
        
        <h3>Conclusion</h3>
        <p>The Indian real estate market in 2024 is characterized by growth, innovation, and opportunity. Whether you're a first-time buyer or seasoned investor, understanding these trends will help you make better decisions.</p>
      `,
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      category: "market",
      author: "Walter White",
      date: "2024-01-12",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 3,
      title: "Maximizing Your Property's Value Before Selling",
      excerpt: "Simple improvements and staging tips that can significantly increase your home's market value in India.",
      content: `
        <p>When it's time to sell your property, maximizing its value should be your top priority. With the right improvements and staging techniques, you can significantly increase your home's appeal to potential buyers and achieve a better selling price.</p>
        
        <h3>First Impressions Matter</h3>
        
        <h4>Enhance Curb Appeal</h4>
        <p>The exterior of your home is the first thing potential buyers see. Simple improvements like fresh paint, well-maintained gardens, and a clean entrance can make a significant difference.</p>
        
        <h4>Deep Clean Everything</h4>
        <p>A spotless home suggests good maintenance. Pay special attention to kitchens, bathrooms, and windows. Consider hiring professional cleaners for best results.</p>
        
        <h3>Strategic Improvements</h3>
        
        <h4>Kitchen Upgrades</h4>
        <p>The kitchen is often the heart of the home. Even minor upgrades like new cabinet handles, fresh paint, or modern appliances can add significant value.</p>
        
        <h4>Bathroom Renovations</h4>
        <p>Updated bathrooms are highly attractive to buyers. Focus on fixtures, lighting, and ensuring everything works perfectly.</p>
        
        <h4>Fresh Paint</h4>
        <p>A fresh coat of paint in neutral colors can transform your space and make it appear larger and more modern.</p>
        
        <h3>Staging Your Home</h3>
        
        <h4>Declutter and Depersonalize</h4>
        <p>Remove personal items and excess furniture to help buyers envision themselves in the space. A clutter-free home appears larger and more appealing.</p>
        
        <h4>Maximize Natural Light</h4>
        <p>Open curtains, clean windows, and ensure all light fixtures work. Bright spaces feel more welcoming and spacious.</p>
        
        <h4>Create Focal Points</h4>
        <p>Arrange furniture to highlight the best features of each room. Create conversation areas and ensure good traffic flow.</p>
        
        <h3>Cost-Effective Improvements</h3>
        
        <h4>Lighting Updates</h4>
        <p>Modern lighting fixtures can instantly update a space without major renovations.</p>
        
        <h4>Hardware Replacement</h4>
        <p>New door handles, cabinet knobs, and faucets are inexpensive but impactful updates.</p>
        
        <h4>Landscaping</h4>
        <p>Well-maintained outdoor spaces add value and create positive first impressions.</p>
        
        <h3>What Not to Do</h3>
        
        <h4>Avoid Over-Personalization</h4>
        <p>Bold colors or unique design choices might not appeal to all buyers.</p>
        
        <h4>Don't Over-Improve</h4>
        <p>Expensive renovations may not always provide good returns. Focus on improvements that add value relative to your neighborhood.</p>
        
        <h3>Professional Help</h3>
        <p>Consider hiring a professional stager or real estate agent for guidance. Their expertise can help you focus on improvements that offer the best return on investment.</p>
        
        <h3>Conclusion</h3>
        <p>Preparing your home for sale doesn't have to be expensive or time-consuming. Focus on cleanliness, minor updates, and strategic staging to maximize your property's appeal and value.</p>
      `,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      category: "selling",
      author: "Jessie Pinkman",
      date: "2024-01-10",
      readTime: "6 min read",
      featured: false,
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <div className="container">
          <h1>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    alert('Bookmark feature would be implemented here!');
  };

  return (
    <div className="blog-post-page">
      <div className="container">
        <div className="blog-post-header">
          <button className="back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div className="post-category-badge">
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <div className="meta-item">
              <User size={16} />
              <span>By {post.author}</span>
            </div>
            <div className="meta-item">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          <div className="post-actions">
            <button className="action-button" onClick={handleShare}>
              <Share2 size={18} />
              Share
            </button>
            <button className="action-button" onClick={handleBookmark}>
              <BookmarkPlus size={18} />
              Bookmark
            </button>
          </div>
        </div>

        <div className="blog-post-content">
          <div className="post-image">
            <img src={post.image} alt={post.title} />
          </div>
          
          <div className="post-excerpt">
            <p>{post.excerpt}</p>
          </div>
          
          <div 
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="blog-post-footer">
          <div className="post-tags">
            <span className="tag">Real Estate</span>
            <span className="tag">{post.category}</span>
            <span className="tag">India</span>
          </div>
          
          <div className="author-bio">
            <div className="author-info">
              <h4>About {post.author}</h4>
              <p>
                An experienced real estate professional with over 10 years in the Indian property market. 
                Specializing in helping clients make informed decisions about their property investments.
              </p>
            </div>
          </div>
        </div>

        <div className="related-posts">
          <h3>Related Articles</h3>
          <div className="related-posts-grid">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <div 
                  key={relatedPost.id} 
                  className="related-post-card"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <img src={relatedPost.image} alt={relatedPost.title} />
                  <div className="related-post-content">
                    <h4>{relatedPost.title}</h4>
                    <p>{relatedPost.excerpt}</p>
                    <div className="related-post-meta">
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
