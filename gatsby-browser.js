import './styles.css';

// SW doesn't refresh the website
// https://github.com/gatsbyjs/gatsby/issues/9087
export const onServiceWorkerUpdateReady = () => window.location.reload();