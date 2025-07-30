import "./LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-animation">
          <div className="logo-container">
            <div className="logo-icon">🏠</div>
            <h1>MakaanWala</h1>
          </div>
          <div className="logo-tagline">Your Dream Home Awaits</div>
        </div>

        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>

        <p className="loading-text">Loading your perfect home...</p>

        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
